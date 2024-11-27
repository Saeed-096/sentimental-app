"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const router = useRouter(); // Initialize useRouter

  const handleGoogleLogin = () => {
    // Simulate Google login
    console.log("Google login clicked");

    // Navigate to the main page after login
    router.push("/Home");
  };

  return (
    <div
      suppressHydrationWarning
      className="relative flex min-h-screen w-full flex-col justify-center px-4 py-12 sm:px-6 lg:pl-32"
      style={{
        backgroundImage: 'url("/main.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Main content */}
      <Card className="relative w-full max-w-xl border-purple-400/10 bg-black/40 backdrop-blur-xl">
        <CardHeader className="space-y-1 pb-8">
          <CardTitle className="text-3xl font-bold text-center text-white">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Sign in to your account using Google
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-8">
          <Button
            variant="outline"
            className="w-full max-w-sm h-12 bg-white hover:bg-gray-100 text-gray-900"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
          <p className="mt-6 text-center text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-purple-400 hover:text-purple-300 hover:underline"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>

      {/* Floating action buttons */}
    </div>
  );
}
