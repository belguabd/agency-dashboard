"use client";

import {
  Building2,
  Users,
  Shield,
  Clock,
  Crown,
  ArrowRight,
  TrendingUp,
  Lock
} from 'lucide-react';

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton
} from "@clerk/nextjs";

import Link from 'next/link';

import HeroSection from '@/components/LandingHero';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black">

      <Navbar />

      <HeroSection />

      {/* What This Dashboard Does */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              What This Dashboard Does
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage agency contacts efficiently
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  Secure Login
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Protected authentication system
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  Browse Agencies
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Organized table format
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  View Contacts
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  50 contacts per day
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">
                  Upgrade Option
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Unlimited access
                </p>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-20 px-6 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Key Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Designed for efficiency and ease of use</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Protected Access</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Your data is protected with industry-standard security measures. Only authenticated users can access the dashboard.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Organized Data</h3>
              <p className="text-sm text-gray-400 leading-relaxed">All agencies and contacts are organized in clean tables, making it easy to find exactly what you need.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Detailed Contacts</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Access comprehensive employee information with all the details you need in one place.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Daily Quota System</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Track your usage with a smart daily limit system. See exactly how many contacts you've viewed.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-pink-500/10 rounded-lg flex items-center justify-center mb-4">
                <Crown className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Premium Options</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Unlock unlimited access and premium features when you need more than the standard quota.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
              <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Simple Interface</h3>
              <p className="text-sm text-gray-400 leading-relaxed">Intuitive design makes it easy to navigate and find information without any learning curve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Sign In */}
      <section className="py-20 px-6 bg-black border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Why You Should Sign In</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Get access to powerful contact management features</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-white">1</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Instant Access</h3>
              <p className="text-xs text-gray-500">Get immediate access to all agency and contact data</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-white">2</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Stay Organized</h3>
              <p className="text-xs text-gray-500">Keep all your agency contacts in one central location</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-white">3</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Track Usage</h3>
              <p className="text-xs text-gray-500">Monitor your daily contact views and manage your quota</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-white">4</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Scale Easily</h3>
              <p className="text-xs text-gray-500">Upgrade anytime for unlimited access and more features</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-400 mb-8">
            Sign in now and start managing your agency contacts efficiently
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Sign In Button */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="group px-6 py-3 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                  Sign In to Dashboard
                  <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </SignInButton>
            </SignedOut>

            {/* Sign Up Button */}
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="px-6 py-3 text-sm font-medium text-gray-400 hover:text-white bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-lg transition-all duration-200">
                  Create Account
                </button>
              </SignUpButton>
            </SignedOut>

            {/* If already signed in, optional redirect */}
            <SignedIn>
              <Link href="/dashboard">
                <button className="group px-6 py-3 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/25">
                  Go to Dashboard
                  <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>
      <Footer />

    </div>
  );
}