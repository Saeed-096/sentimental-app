from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)

# Enable CORS
CORS(app)

# Initialize the SentimentIntensityAnalyzer
analyzer = SentimentIntensityAnalyzer()

@app.route('/homeanalyze', methods=['POST'])
def analyze_sentiment():
    text = request.json.get('text')
    if not text:
        return jsonify({"error": "Text is required"}), 400

    # Perform sentiment analysis
    sentiment_score = analyzer.polarity_scores(text)

    # Classify sentiment as POSITIVE, NEGATIVE, or NEUTRAL
    if sentiment_score['compound'] >= 0.05:
        sentiment = 'POSITIVE'
    elif sentiment_score['compound'] <= -0.05:
        sentiment = 'NEGATIVE'
    else:
        sentiment = 'NEUTRAL'

    confidence = abs(sentiment_score['compound'])

    return jsonify({
        "sentiment": sentiment,
        "confidence": confidence
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7000)
