"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function SentimentAnalysis() {
  const [input, setInput] = useState("");
  const [handle, setHandle] = useState("");
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    if (input.trim() !== "") {
      // Simulate API call with setTimeout
      const timer = setTimeout(() => {
        setHandle(input.trim());
        // Mock data - in a real app, you'd fetch this from an API
        setTweets([
          {
            id: 1,
            text: "the Foreign Intelligence Surveillance Act against so many U.S. citizens presents a fundamental threat...",
            sentiment: "Positive",
          },
          {
            id: 2,
            text: "RT @marc_lotter: Come on man... Seriously? 🤦‍♂️",
            sentiment: "Negative",
          },
          {
            id: 3,
            text: "RT @MarshaBlackburn: Susan Rice knew exactly what she was doing. That's why she wrote herself",
            sentiment: "Negative",
          },
          {
            id: 4,
            text: "RT @MarshaBlackburn: Susan Rice knew exactly what she was doing. That's why she wrote herself",
            sentiment: "Negative",
          },
          {
            id: 5,
            text: "RT @MarshaBlackburn: Susan Rice knew exactly what she was doing. That's why she wrote herself",
            sentiment: "Negative",
          },
          {
            id: 6,
            text: "RT @MarshaBlackburn: Susan Rice knew exactly what she was doing. That's why she wrote herself",
            sentiment: "Negative",
          },
          {
            id: 7,
            text: "RT @MarshaBlackburn: Susan Rice knew exactly what she was doing. That's why she wrote herself",
            sentiment: "Negative",
          },
        ]);
      }, 500); // 500ms delay to simulate API call

      return () => clearTimeout(timer);
    }
  }, [input]);

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
    <div className=" min-h-svh bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
      <Navbar />
      <div className="top-20 flex items-center  justify-around p-4 md:p-8 relative overflow-hidden">
        <div className="w-full max-w-4xl z-10">
          <h1 className="text-6xl font-bold text-white mb-2">
            Sentiment Analysis
          </h1>
          {handle ? (
            <p className="text-xl text-white/80 mb-8">Handle - @{handle}</p>
          ) : (
            <p className="text-xl text-white/80 mb-8">
              Categorises tweet under Positive, Neutral or Negative
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
                Enter the twitter handle or hashtag to import tweets from
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // Implement your search logic here
                  console.log("Searching for:", input);
                }}
                className="w-full mx-auto"
              >
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <Input
                      type="text"
                      placeholder="Enter Twitter handle..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
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

          {handle && (
            <div className="bg-[#3C0A1D] rounded-lg overflow-auto max-h-64">
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-bold">TWEET</th>
                    <th className="text-left p-4 font-bold">SENTIMENT</th>
                    <th className="text-left p-4 font-bold">EMOTAG</th>
                  </tr>
                </thead>
                <tbody>
                  {tweets.map((tweet) => (
                    <tr key={tweet.id} className="border-t border-white/10">
                      <td className="p-4 text-white/90">{tweet.text}</td>
                      <td className="p-4 text-white/90">{tweet.sentiment}</td>
                      <td className="p-4">
                        <div className="w-10 h-10">
                          <SentimentEmoji sentiment={tweet.sentiment} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className=" w-[60%] max-w-[600px] opacity-100 hidden md:flex">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-[#1DA1F2]">
            <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
