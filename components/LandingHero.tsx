"use client";


import {
    SignedIn,
    SignedOut,
    SignInButton,
} from "@clerk/nextjs";
import { ArrowRight, Shield } from "lucide-react";

import Link from "next/link";

import FloatingLines from "@/components/FloatingLines";

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 w-full h-full">
                <FloatingLines
                    enabledWaves={["top", "middle", "bottom"]}
                    lineCount={[10, 15, 20]}
                    lineDistance={[8, 6, 4]}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    interactive={true}
                    parallax={true}
                />

                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black to-transparent pointer-events-none" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-gray-400 text-xs font-medium mb-6">
                        <Shield className="w-3.5 h-3.5" />
                        Secure • Professional • Efficient
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                        Manage Your Agency Contacts with Ease
                    </h1>

                    <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                        Access and organize employee contact information across multiple agencies.
                        Built for professionals who need reliable contact management.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        {/* Get Started Button */}
                        <SignedOut>
                            <SignInButton mode="modal">
                                <button className="group px-6 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors duration-200">
                                    Get Started
                                    <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <Link href="/dashboard">
                                <button className="group px-6 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors duration-200">
                                    Get Started
                                    <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </Link>
                        </SignedIn>

                        <button
                            onClick={() => {
                                const section = document.getElementById("features");
                                section?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors duration-200"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
