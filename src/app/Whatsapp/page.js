"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";

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
              <p className="text-white/80 mb-4">Import the Whatsapp Chat</p>
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="@twitter_handle or #content"
                className="w-full bg-white/10 border-white/20 text-white placeholder-white/50 rounded-full pl-4 pr-12 h-12"
              />
              <div className="absolute right-1 top-[calc(50%+16px)] -translate-y-1/2 bg-transparent p-2 text-white">
                <Search className="w-6 h-6" />
              </div>
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

        <div className=" w-[60%] max-w-[600px] opacity-20 md:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full "
            viewBox="0 0 256 258"
          >
            <defs>
              <linearGradient
                id="logosWhatsappIcon0"
                x1="50%"
                x2="50%"
                y1="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#1faf38" />
                <stop offset="100%" stopColor="#60d669" />
              </linearGradient>
              <linearGradient
                id="logosWhatsappIcon1"
                x1="50%"
                x2="50%"
                y1="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#f9f9f9" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
            </defs>
            <path
              fill="url(#logosWhatsappIcon0)"
              d="M5.463 127.456c-.006 21.677 5.658 42.843 16.428 61.499L4.433 252.697l65.232-17.104a123 123 0 0 0 58.8 14.97h.054c67.815 0 123.018-55.183 123.047-123.01c.013-32.867-12.775-63.773-36.009-87.025c-23.23-23.25-54.125-36.061-87.043-36.076c-67.823 0-123.022 55.18-123.05 123.004"
            />
            <path
              fill="url(#logosWhatsappIcon1)"
              d="M1.07 127.416c-.007 22.457 5.86 44.38 17.014 63.704L0 257.147l67.571-17.717c18.618 10.151 39.58 15.503 60.91 15.511h.055c70.248 0 127.434-57.168 127.464-127.423c.012-34.048-13.236-66.065-37.3-90.15C194.633 13.286 162.633.014 128.536 0C58.276 0 1.099 57.16 1.071 127.416m40.24 60.376l-2.523-4.005c-10.606-16.864-16.204-36.352-16.196-56.363C22.614 69.029 70.138 21.52 128.576 21.52c28.3.012 54.896 11.044 74.9 31.06c20.003 20.018 31.01 46.628 31.003 74.93c-.026 58.395-47.551 105.91-105.943 105.91h-.042c-19.013-.01-37.66-5.116-53.922-14.765l-3.87-2.295l-40.098 10.513z"
            />
            <path
              fill="#fff"
              d="M96.678 74.148c-2.386-5.303-4.897-5.41-7.166-5.503c-1.858-.08-3.982-.074-6.104-.074c-2.124 0-5.575.799-8.492 3.984c-2.92 3.188-11.148 10.892-11.148 26.561s11.413 30.813 13.004 32.94c1.593 2.123 22.033 35.307 54.405 48.073c26.904 10.609 32.379 8.499 38.218 7.967c5.84-.53 18.844-7.702 21.497-15.139c2.655-7.436 2.655-13.81 1.859-15.142c-.796-1.327-2.92-2.124-6.105-3.716s-18.844-9.298-21.763-10.361c-2.92-1.062-5.043-1.592-7.167 1.597c-2.124 3.184-8.223 10.356-10.082 12.48c-1.857 2.129-3.716 2.394-6.9.801c-3.187-1.598-13.444-4.957-25.613-15.806c-9.468-8.442-15.86-18.867-17.718-22.056c-1.858-3.184-.199-4.91 1.398-6.497c1.431-1.427 3.186-3.719 4.78-5.578c1.588-1.86 2.118-3.187 3.18-5.311c1.063-2.126.531-3.986-.264-5.579c-.798-1.593-6.987-17.343-9.819-23.64"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
