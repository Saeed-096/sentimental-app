"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function SentimentAnalysis() {
  const [VedioUrl, setVedioUrl] = useState("");
  const [handle, setHandle] = useState("");
  const [Comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const fetchSentimentData = async () => {
    setError(""); // Reset error
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/analyze",
        { videoUrl: VedioUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setComments(response.data); // Update with actual data
      setHandle(VedioUrl.trim());
    } catch (err) {
      setError("Failed to fetch sentiment data. Check console.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (VedioUrl.trim() !== "") {
      fetchSentimentData(); // Call the fetch function
    }
  }, [VedioUrl]);

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
    <div className="min-h-svh bg-gradient-to-r from-purple-500 via-pink-500 to-red-200 py-4">
      <Navbar />
      <div className="top-20 flex items-center justify-around p-4 md:p-8 relative overflow-hidden">
        <div className="w-full max-w-4xl z-10">
          <h1 className="text-6xl font-bold text-white mb-2">
            Sentiment Analysis
          </h1>
          {handle ? (
            <p className="text-xl text-white/80 mb-8">Handle - {handle}</p>
          ) : (
            <p className="text-xl text-white/80 mb-8">
              Categorizes tweets under Positive, Neutral, or Negative
            </p>
          )}

          <>
            <div className="flex space-x-8 mb-8">
              <div className="w-16 h-16">
                <SentimentEmoji sentiment="Positive" />
              </div>
              <div className="w-16 h-16">
                <SentimentEmoji sentiment="Neutral" />
              </div>
              <div className="w-16 h-16">
                <SentimentEmoji sentiment="Negative" />
              </div>
            </div>

            <div className="relative mb-8">
              <p className="text-white/80 mb-4">
                Enter the YouTube Url Link to import reviews from
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchSentimentData(); // Trigger the data fetch on submit
                }}
                className="w-full mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="Enter YouTube URL..."
                      value={VedioUrl}
                      onChange={(e) => setVedioUrl(e.target.value)}
                      className="w-full pr-10 rounded-full bg-white/10 border-white/20 text-white placeholder-white/50"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      className="absolute right-0 top-0 h-full aspect-square rounded-r-full bg-white/10 hover:bg-white/20"
                    >
                      <Search className="h-4 w-4 text-white" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </>

          {error && <p className="text-red-500">{error}</p>}

          {handle && (
            <div className="bg-[#3C0A1D] rounded-lg overflow-auto max-h-64">
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-bold">Comment</th>
                    <th className="text-left p-4 font-bold">SENTIMENT</th>
                    <th className="text-left p-4 font-bold">EMOTAG</th>
                  </tr>
                </thead>
                <tbody>
                  {Comments.map((comment) => (
                    <tr key={comment.id} className="border-t border-white/10">
                      <td className="p-4 text-white/90">{comment.comment}</td>
                      <td className="p-4 text-white/90">{comment.sentiment}</td>
                      <td className="p-4">
                        <div className="w-10 h-10">
                          <SentimentEmoji sentiment={comment.sentiment} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="w-[60%] max-w-[600px] opacity-100 hidden md:flex">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#FF0000]">
            <path d="M23.498 6.186a2.873 2.873 0 0 0-2.022-2.042C19.646 3.5 12 3.5 12 3.5s-7.646 0-9.476.644A2.873 2.873 0 0 0 .502 6.186C0 8.072 0 12 0 12s0 3.928.502 5.814a2.873 2.873 0 0 0 2.022 2.042C4.354 20.5 12 20.5 12 20.5s7.646 0 9.476-.644a2.873 2.873 0 0 0 2.022-2.042C24 15.928 24 12 24 12s0-3.928-.502-5.814zM9.75 15.02v-6.04L15.5 12l-5.75 3.02z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
