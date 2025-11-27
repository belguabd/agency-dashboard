"use client";

import { Building2, Users, Eye, Crown, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function DashboardPage() {
    const { user } = useUser();

    // Mock data - replace with real data from your database
    const stats = {
        totalAgencies: 150,
        totalContacts: 5000,
        contactsViewedToday: 23,
        dailyLimit: 50,
        remainingViews: 27,
    };

    const progressPercentage = (stats.contactsViewedToday / stats.dailyLimit) * 100;

    
    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                    Welcome back, {user?.firstName ?? "User"}!
                </h1>
                <p className="text-gray-400">
                    Manage your agencies and employee contacts efficiently
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Agencies */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-blue-400" />
                        </div>
                        <Link href="/dashboard/agencies">
                            <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                View All →
                            </button>
                        </Link>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {stats.totalAgencies}
                    </h3>
                    <p className="text-sm text-gray-400">Total Agencies</p>
                </div>

                {/* Total Contacts */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Users className="w-6 h-6 text-green-400" />
                        </div>
                        <Link href="/dashboard/contacts">
                            <button className="text-xs text-green-400 hover:text-green-300 transition-colors">
                                View All →
                            </button>
                        </Link>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {stats.totalContacts.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-400">Employee Contacts</p>
                </div>

                {/* Daily Usage */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                            <Eye className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-xs text-gray-500">Today</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {stats.contactsViewedToday} / {stats.dailyLimit}
                    </h3>
                    <p className="text-sm text-gray-400">Contacts Viewed</p>
                </div>
            </div>

            {/* Daily Limit Progress */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-white">Daily Quota</h3>
                            <p className="text-xs text-gray-500">
                                {stats.remainingViews} views remaining today
                            </p>
                        </div>
                    </div>
                    <Link href="/upgrade">
                        <button className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/20 transition-all duration-200 flex items-center gap-2">
                            <Crown className="w-4 h-4" />
                            Upgrade
                        </button>
                    </Link>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div
                        className="bg-linear-to-r from-yellow-500 to-orange-500 h-full transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
                <div className="flex justify-between mt-2">
                    <span className="text-xs text-gray-500">0 views</span>
                    <span className="text-xs text-gray-500">50 views (limit)</span>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/dashboard/agencies">
                        <div className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                    <Building2 className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Browse Agencies</h3>
                                    <p className="text-xs text-gray-500">View all agencies in database</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/dashboard/contacts">
                        <div className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                                    <Users className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">View Contacts</h3>
                                    <p className="text-xs text-gray-500">Access employee information</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}   