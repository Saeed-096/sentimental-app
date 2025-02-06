from flask import Flask, request, jsonify
from flask_cors import CORS
from googleapiclient.discovery import build
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Replace with your own YouTube API Key
YOUTUBE_API_KEY = "AIzaSyCVjW7QnWf2jYsXtredIwnpT4bQ-IKnsGQ"

def get_youtube_comments(video_url):
    """Extracts video ID from URL and fetches comments from YouTube API."""
    video_id = video_url.split("v=")[1]  # Extract video ID
    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

    comments = []
    request = youtube.commentThreads().list(
        part="snippet",
        videoId=video_id,
        textFormat="plainText",
        maxResults=1000  # Limit of comments
    )
    response = request.execute()

    for item in response.get("items", []):
        comment_text = item["snippet"]["topLevelComment"]["snippet"]["textDisplay"]
        comments.append(comment_text)

    return comments

def analyze_sentiment(text):
    """Analyzes sentiment using TextBlob."""
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity  # -1 to 1 scale
    if polarity > 0:
        return "Positive"
    elif polarity < 0:
        return "Negative"
    else:
        return "Neutral"

@app.route("/analyze", methods=["POST"])
def analyze_comments():
    """Receives YouTube link, fetches comments, and returns sentiment analysis."""
    data = request.json
    video_url = data.get("videoUrl")

    if not video_url:
        return jsonify({"error": "Missing video URL"}), 400

    try:
        comments = get_youtube_comments(video_url)
        results = [{"comment": c, "sentiment": analyze_sentiment(c)} for c in comments]
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
