"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FrownIcon, SmileIcon, ThumbsUpIcon, HeartIcon } from "lucide-react";

export function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-red-600 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Sentiment Analyzer
        </h1>
        <p className="mb-8 text-lg text-white md:text-xl">
          Use sentiment analysis to quickly detect emotions in text data.
        </p>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <FrownIcon className="absolute left-1/4 top-1/4 h-12 w-12 animate-float text-white opacity-50" />
        <SmileIcon className="absolute right-1/4 top-1/3 h-12 w-12 animate-float-delayed text-white opacity-50" />
        <ThumbsUpIcon className="absolute bottom-1/4 left-1/3 h-12 w-12 animate-float text-white opacity-50" />
        <HeartIcon className="absolute bottom-1/3 right-1/3 h-12 w-12 animate-float-delayed text-white opacity-50" />
      </div>
    </div>
  );
}
