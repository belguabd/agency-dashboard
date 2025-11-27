"use client";

import { Building2, Users, Eye, Crown, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import React from "react";
import { getAgencies } from "@/app/actions/getAgencies";
import { getContacts } from "@/app/actions/getContacts";

export default function DashboardPage() {
    const { user } = useUser();
    const [totalAgencies, setTotalAgencies] = React.useState(0);
    const [totalContacts, setTotalContacts] = React.useState(0);
    const [contactsViewedToday, setContactsViewedToday] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);
    const [isPremium, setIsPremium] = React.useState(false);

    const DAILY_LIMIT = 50;

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            // Fetch agencies and contacts
            const [agencies, contacts] = await Promise.all([
                getAgencies(),
                getContacts()
            ]);

            setTotalAgencies(agencies.length);
            setTotalContacts(contacts.length);

            // Check premium status
            const premiumStatus = localStorage.getItem('premiumStatus');
            if (premiumStatus) {
                const { isPremium: premium } = JSON.parse(premiumStatus);
                setIsPremium(premium);
            }

            // Get daily view count from localStorage
            const today = new Date().toDateString();
            const storedData = localStorage.getItem('contactViewData');

            if (storedData) {
                const { date, count } = JSON.parse(storedData);
                if (date === today) {
                    setContactsViewedToday(count);
                } else {
                    setContactsViewedToday(0);
                }
            }

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const remainingViews = isPremium ? '∞' : Math.max(0, DAILY_LIMIT - contactsViewedToday);
    const progressPercentage = isPremium ? 100 : (contactsViewedToday / DAILY_LIMIT) * 100;


    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    Welcome back, {user?.firstName ?? "User"}!
                    {isPremium && <Crown className="w-7 h-7 text-yellow-400" />}
                </h1>
                <p className="text-gray-400">
                    {isPremium
                        ? 'You have unlimited access to all features'
                        : 'Manage your agencies and employee contacts efficiently'
                    }
                </p>
            </div>

            {/* Premium Banner */}
            {isPremium && (
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                            <Crown className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-semibold text-white">Premium Account Active</h3>
                            <p className="text-xs text-gray-400">Enjoying unlimited contact views and all premium features</p>
                        </div>
                        <Link href="/dashboard/upgrade">
                            <button className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                                Manage →
                            </button>
                        </Link>
                    </div>
                </div>
            )}

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
                        {isLoading ? "..." : totalAgencies}
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
                        {isLoading ? "..." : totalContacts.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-400">Employee Contacts</p>
                </div>

                {/* Daily Usage */}
                <div className={`bg-white/5 border rounded-xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200 ${isPremium ? 'border-green-500/30' : 'border-white/10'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isPremium ? 'bg-green-500/10' : 'bg-purple-500/10'}`}>
                            <Eye className={`w-6 h-6 ${isPremium ? 'text-green-400' : 'text-purple-400'}`} />
                        </div>
                        <span className="text-xs text-gray-500">Today</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                        {isPremium ? '∞ Unlimited' : `${contactsViewedToday} / ${DAILY_LIMIT}`}
                    </h3>
                    <p className="text-sm text-gray-400">
                        {isPremium ? 'No limits' : 'Contacts Viewed'}
                    </p>
                </div>
            </div>

            {/* Daily Limit Progress or Premium Status */}
            {!isPremium ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold text-white">Daily Quota</h3>
                                <p className="text-xs text-gray-500">
                                    {remainingViews} views remaining today
                                </p>
                            </div>
                        </div>
                        <Link href="/dashboard/upgrade">
                            <button className="px-4 py-2 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/20 transition-all duration-200 flex items-center gap-2">
                                <Crown className="w-4 h-4" />
                                Upgrade
                            </button>
                        </Link>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full transition-all duration-500 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="text-xs text-gray-500">0 views</span>
                        <span className="text-xs text-gray-500">50 views (limit)</span>
                    </div>
                </div>
            ) : (
                <div className="bg-white/5 border border-green-500/30 rounded-xl p-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                            <Crown className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-white">Premium Benefits Active</h3>
                            <p className="text-xs text-gray-400">
                                Unlimited views • Export data • Advanced filters • Priority support
                            </p>
                        </div>
                        <Link href="/dashboard/upgrade">
                            <button className="text-xs text-green-400 hover:text-green-300 transition-colors">
                                Manage Plan →
                            </button>
                        </Link>
                    </div>
                </div>
            )}

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