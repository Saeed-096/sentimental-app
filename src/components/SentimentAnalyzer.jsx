"use client";

import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function SentimentAnalyzer() {
  const [text, setText] = useState(""); // State for input text
  const [sentiment, setSentiment] = useState(null); // State for sentiment analysis results
  const [confidence, setconfidence] = useState(null);
  const analyzeSentiment = async () => {
    const response = await axios.post("http://localhost:7000/homeanalyze", {
      text,
    });

    setSentiment(response.data.sentiment);
  };
  const SentimentEmoji = ({ sentiment }) => {
    switch (sentiment) {
      case "Positive":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <circle cx="12" cy="12" r="12" fill="#9FD356" />
            <path
              d="M7 14s.5 3 5 3 5-3 5-3"
              fill="none"
              stroke="#557A1D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="8" cy="9" r="1.5" fill="#557A1D" />
            <circle cx="16" cy="9" r="1.5" fill="#557A1D" />
          </svg>
        );
      case "Negative":
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <circle cx="12" cy="12" r="12" fill="#FF4141" />
            <path
              d="M7 16s.5-3 5-3 5 3 5 3"
              fill="none"
              stroke="#B50000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="8" cy="9" r="1.5" fill="#B50000" />
            <circle cx="16" cy="9" r="1.5" fill="#B50000" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" className="w-full h-full">
            <circle cx="12" cy="12" r="12" fill="#FFB627" />
            <line
              x1="7"
              y1="14"
              x2="17"
              y2="14"
              stroke="#B17800"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="8" cy="9" r="1.5" fill="#B17800" />
            <circle cx="16" cy="9" r="1.5" fill="#B17800" />
          </svg>
        );
    }
  };

  return (
    <div className=" py-16  ">
      <h2 className="mb-8 text-center text-2xl font-semibold text-purple-600 md:text-3xl">
        Play around with our sentiment analyzer, below:
      </h2>
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Test with your own text</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[200px] resize-none"
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)} // Update text state
              onBlur={analyzeSentiment} // Trigger analysis on blur
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {sentiment ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm font-medium uppercase text-gray-500">
                  <span>TAG</span>
                  <span>Sentiment</span>
                </div>

                <div className="flex items-center justify-between font-medium text-green-600">
                  <span>{sentiment}</span>
                  <div className="w-10 h-10">
                    <SentimentEmoji sentiment={sentiment} />
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">
                Enter some text to see the results
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
