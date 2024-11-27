"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function SentimentAnalyzer() {
  const [text, setText] = useState(""); // State for input text
  const [sentiment, setSentiment] = useState(null); // State for sentiment analysis results

  const analyzeSentiment = () => {
    // Simulate sentiment analysis
    if (text.trim().length > 0) {
      setSentiment({
        tag: "Positive",
        confidence: 99.1,
      });
    } else {
      setSentiment(null);
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
                  <span>CONFIDENCE</span>
                </div>
                <div className="flex items-center justify-between font-medium text-green-600">
                  <span>{sentiment.tag}</span>
                  <span>{sentiment.confidence.toFixed(1)}%</span>
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
