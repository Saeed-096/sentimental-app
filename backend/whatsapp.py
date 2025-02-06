from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import re
from textblob import TextBlob
import uvicorn

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

def clean_message(text):
    TIMESTAMP_PATTERN = r"^\[\d{2}/\d{2}/\d{4}, \d{1,2}:\d{2}:\d{2}\s?[APM]{2}\]\s.*?:\s"

    return re.sub(TIMESTAMP_PATTERN, "", text)

def analyze_sentiment(message):
    analysis = TextBlob(message)
    if analysis.sentiment.polarity > 0:
        return "Positive"
    elif analysis.sentiment.polarity < 0:
        return "Negative"
    return "Neutral"

@app.post("/analyze-chat/")
async def analyze_chat(file: UploadFile = File(...)):
    chat_data = await file.read()
    chat_text = chat_data.decode("utf-8")

    messages = chat_text.split("\n")
    cleaned_messages = [clean_message(msg) for msg in messages if msg]
    sentiments = [analyze_sentiment(msg) for msg in cleaned_messages]

    df = pd.DataFrame({"Message": cleaned_messages, "Sentiment": sentiments})
    return df.to_dict(orient="records")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=4000)