"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function SentimentAnalysis() {
  const [file, setFile] = useState(null);
  const [reviews, setReviews] = useState([]);

  const handleFileUpload = async (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        setReviews(data.data);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Check the backend.");
    }
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
    <div className=" min-h-svh bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 ">
      <Navbar />
      <div className="top-20 flex items-center  justify-around p-4 md:p-8 relative overflow-hidden">
        <div className="w-full max-w-4xl z-10">
          <h1 className="text-6xl font-bold text-white mb-2">
            Sentiment Analysis
          </h1>

          <p className="text-xl text-white/80 mb-8">
            Categorises Review under Positive, Neutral or Negative
          </p>

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

            <div className="relative mb-4 sm:mb-6 md:mb-8 ">
              <p className="text-white/80 mb-2 sm:mb-3 md:mb-4 text-sm sm:text-base">
                Upload a CSV file containing reviews
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="w-full pr-10 rounded-full bg-white/10 border-white/20 text-white placeholder-white/50"
                  />
                  <Button
                    onClick={handleSubmit}
                    className="absolute right-0 top-0 h-full aspect-square rounded-r-full bg-white/10 hover:bg-white/20"
                  >
                    <span className="text-gray-50">Upload & Analyze</span>
                  </Button>
                </div>
              </div>
            </div>
          </>

          {reviews.length > 0 && (
            <div className="bg-[#3C0A1D] rounded-lg overflow-auto max-h-64">
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-bold">REVIEW</th>
                    <th className="text-left p-4 font-bold">SENTIMENT</th>
                    <th className="text-left p-4 font-bold">EMOTAG</th>
                  </tr>
                </thead>
                <tbody>
                  {reviews.map((review, index) => (
                    <tr key={index} className="border-t border-white/10">
                      <td className="p-4 text-white/90">{review.review}</td>
                      <td className="p-4 text-white/90">
                        {review.sentiment || "N/A"}
                      </td>
                      <td className="p-4">
                        <div className="w-10 h-10">
                          <SentimentEmoji sentiment={review.sentiment} />
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            imageRendering="optimizeQuality"
            fillRule="evenodd"
            clipRule="evenodd"
            viewBox="0 0 512 465.46"
          >
            <path
              fill="yellow"
              fillRule="nonzero"
              d="M141.03 228.54c0-21.41 5.28-39.72 15.83-54.92 10.55-15.21 24.98-26.69 43.29-34.45 16.75-7.13 37.39-12.25 61.9-15.36 8.38-.93 22.03-2.17 40.96-3.72v-7.91c0-19.86-2.17-33.21-6.51-40.03-6.52-9.31-16.76-13.97-30.73-13.97h-3.72c-10.24.93-19.08 4.19-26.53 9.78-7.45 5.58-12.26 13.34-14.43 23.27-1.24 6.21-4.34 9.77-9.31 10.71l-53.53-6.52c-5.27-1.24-7.91-4.03-7.91-8.38 0-.93.16-2.02.47-3.26 5.27-27.61 18.23-48.09 38.86-61.44C210.31 9 234.43 1.55 262.05 0h11.64c35.37 0 62.99 9.15 82.85 27.46 3.11 3.12 5.99 6.46 8.61 10.01 2.64 3.57 4.73 6.75 6.28 9.54 1.56 2.79 2.95 6.83 4.19 12.1 1.24 5.28 2.17 8.93 2.8 10.94.62 2.02 1.08 6.36 1.39 13.04.31 6.67.47 10.62.47 11.86v112.64c0 8.07 1.16 15.44 3.49 22.11 2.32 6.68 4.58 11.48 6.75 14.43 2.17 2.95 5.74 7.68 10.7 14.2 1.86 2.79 2.8 5.27 2.8 7.45 0 2.48-1.25 4.65-3.73 6.51-25.76 22.35-39.72 34.45-41.89 36.31-3.72 2.79-8.22 3.1-13.5.93-4.34-3.73-8.14-7.29-11.4-10.71-3.26-3.41-5.59-5.89-6.98-7.44-1.4-1.56-3.65-4.58-6.75-9.08-3.11-4.5-5.28-7.52-6.52-9.08-17.38 18.93-34.44 30.72-51.2 35.38-10.55 3.1-23.58 4.65-39.1 4.65-23.89 0-43.52-7.37-58.88-22.11-15.36-14.74-23.04-35.6-23.04-62.6zm275.55 140.57c.62-1.24 1.55-2.49 2.8-3.73 7.75-5.27 15.2-8.84 22.34-10.7 11.79-3.1 23.27-4.81 34.44-5.12 3.1-.31 6.05-.16 8.84.46 13.97 1.24 22.35 3.57 25.14 6.98 1.24 1.87 1.86 4.66 1.86 8.38v3.26c0 10.86-2.95 23.66-8.84 38.4-5.9 14.74-14.12 26.61-24.67 35.61-1.55 1.24-2.95 1.86-4.19 1.86-.62 0-1.24-.15-1.86-.46-1.86-.93-2.33-2.64-1.4-5.13 11.48-26.99 17.22-45.76 17.22-56.31 0-3.42-.62-5.9-1.86-7.45-3.1-3.72-11.79-5.59-26.06-5.59-5.28 0-11.49.31-18.62.93-7.76.94-14.9 1.86-21.42 2.8-1.86 0-3.1-.31-3.72-.94-.62-.62-.77-1.24-.46-1.86 0-.31.15-.77.46-1.39zM.93 361.2c1.55-2.49 4.03-2.64 7.45-.47 77.57 44.99 161.98 67.49 253.21 67.49 60.81 0 120.86-11.33 180.13-33.98 1.55-.62 3.8-1.55 6.75-2.79s5.04-2.17 6.28-2.79c4.65-1.86 8.3-.93 10.94 2.79 2.64 3.72 1.78 7.14-2.56 10.24-5.59 4.03-12.73 8.69-21.41 13.96-26.69 15.83-56.48 28.09-89.37 36.77-32.89 8.69-65.01 13.04-96.35 13.04-48.41 0-94.18-8.46-137.31-25.37-43.13-16.91-81.77-40.73-115.9-71.45-1.86-1.55-2.79-3.1-2.79-4.65 0-.93.31-1.87.93-2.79zm220.16-141.97c0 12.1 3.03 21.8 9.08 29.09 6.05 7.29 14.19 10.94 24.43 10.94.93 0 2.25-.16 3.96-.47 1.71-.31 2.87-.46 3.49-.46 13.03-3.41 23.12-11.79 30.25-25.13 3.42-5.9 5.98-12.34 7.68-19.32 1.71-6.98 2.64-12.65 2.8-16.99.15-4.35.23-11.48.23-21.41v-11.64c-18 0-31.65 1.24-40.96 3.72-27.31 7.76-40.96 24.98-40.96 51.67z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
