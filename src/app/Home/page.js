"use client";

import * as React from "react";

import { Navbar } from "../../components/Navbar";
import { Hero } from "../../components/Hero";
import { SentimentAnalyzer } from "../../components/SentimentAnalyzer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <SentimentAnalyzer />
    </div>
  );
}
