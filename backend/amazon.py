from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
import io

nltk.download("vader_lexicon")
sia = SentimentIntensityAnalyzer()

app = FastAPI()

# ✅ Enable CORS to allow requests from frontend (localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # 👈 Allow frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

def analyze_sentiment(text):
    """Analyzes text and classifies as Positive, Negative, or Neutral."""
    if not isinstance(text, str) or text.strip() == "":
        return "Neutral"

    score = sia.polarity_scores(text)["compound"]
    return "Positive" if score >= 0.05 else "Negative" if score <= -0.05 else "Neutral"

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    if "review" not in df.columns:
        return {"error": "CSV must contain a 'review' column."}

    df["sentiment"] = df["review"].astype(str).apply(analyze_sentiment)
    results = df[["review", "sentiment"]].to_dict(orient="records")
    return {"message": "File processed successfully!", "data": results}
