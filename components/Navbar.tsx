"use client";
import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,

} from '@clerk/nextjs'
import { Building2 } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="w-full bg-black/50 border-b border-white/5 backdrop-blur-md fixed top-0 z-50">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-white/5">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-white font-bold text-sm">Agency</h1>
                            <p className="text-xs text-gray-500">Dashboard</p>
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-2">
                        <SignedOut>
                            <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                                <button className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white border border-white/10 rounded-md transition-colors">
                                    Sign In
                                </button>
                            </SignInButton>

                            <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
                                <button className="px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-md transition-colors">
                                    Sign Up
                                </button>
                            </SignUpButton>
                        </SignedOut>

                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: "w-8 h-8 border border-white/10 hover:border-white/20 transition-colors"
                                    }
                                }}
                            />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}