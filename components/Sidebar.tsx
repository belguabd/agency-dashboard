"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Users, LogOut, Crown, Sparkles, Check } from "lucide-react";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignOutButton,
    useUser,
} from "@clerk/nextjs";

export default function Sidebar() {
    const { user } = useUser();
    const pathname = usePathname();
    const [isPremium, setIsPremium] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const premiumStatus = localStorage.getItem('premiumStatus');
            if (premiumStatus) {
                const { isPremium: premium } = JSON.parse(premiumStatus);
                setIsPremium(premium);
            }
        }
    }, []);

    let initials = (user?.firstName?.[0] ?? "") + (user?.lastName?.[0] ?? "");
    if (!initials || initials === "") {
        initials = user?.firstName?.[0] ?? "A";
    }

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: Home, color: "purple" },
        { href: "/dashboard/agencies", label: "Agencies", icon: Building2, color: "blue" },
        { href: "/dashboard/contacts", label: "Employees", icon: Users, color: "green" },
    ];

    return (
        <aside className="w-64 min-h-screen hidden md:flex flex-col bg-black border-r border-white/5">
            <div className="flex-1 flex flex-col p-6">
                {/* Logo + App name */}
                <Link href="/" className="flex items-center gap-3 mb-10 group">
                    <div className="relative w-11 h-11 rounded-xl bg-linear-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:from-white/15 group-hover:to-white/10 transition-all duration-300 shadow-lg shadow-white/5">
                        {/* use Building2 icon as logo */}
                        <Building2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h1 className="text-white font-bold text-lg group-hover:text-gray-100 transition-colors">Agency</h1>
                            {isPremium && <Crown className="w-4 h-4 text-white" />}
                        </div>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            {isPremium ? 'Premium' : 'Dashboard'}
                        </p>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        const colorClasses = {
                            purple: {
                                iconBg: "bg-purple-500/10",
                                iconColor: "text-purple-400",
                                activeIconBg: "bg-purple-500/20",
                            },
                            blue: {
                                iconBg: "bg-blue-500/10",
                                iconColor: "text-blue-400",
                                activeIconBg: "bg-blue-500/20",
                            },
                            green: {
                                iconBg: "bg-green-500/10",
                                iconColor: "text-green-400",
                                activeIconBg: "bg-green-500/20",
                            },
                        };

                        const colors = colorClasses[item.color as keyof typeof colorClasses];

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="group flex items-center gap-1 p-2 rounded-md transition-colors duration-200"
                            >
                                {/* icon container remains transparent */}
                                <div className="w-9 h-9 bg-transparent rounded-lg flex items-center justify-center shrink-0">
                                    <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                                <span className={`text-sm ${isActive ? "text-white font-semibold" : "text-gray-400 group-hover:text-white"} transition-colors duration-200`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Upgrade/Premium Card */}
                <div className="mt-auto pt-6">
                    {isPremium ? (
                        <div className="group relative p-4 bg-linear-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl overflow-hidden">
                            <div className="relative flex items-start gap-3 mb-2">
                                <div className="w-9 h-9 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                                        Premium Active
                                        <Crown className="w-3.5 h-3.5 text-white" />
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Unlimited access enabled
                                    </p>
                                </div>
                            </div>
                            <Link href="/dashboard/upgrade" className="relative">
                                <button className="w-full px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg text-xs font-bold hover:bg-white/15 active:scale-98 transition-all duration-200">
                                    Manage Plan
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="group relative p-4 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 rounded-xl hover:border-white/20 hover:from-white/7 hover:to-white/3 transition-all duration-300 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative flex items-start gap-3 mb-3">
                                <div className="w-9 h-9 bg-yellow-500/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-yellow-500/20 transition-all duration-200 shadow-sm">
                                    <Crown className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                                        Upgrade to Pro
                                        <Sparkles className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </h3>
                                    <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                                        Unlock unlimited contacts
                                    </p>
                                </div>
                            </div>
                            <Link href="/dashboard/upgrade" className="relative">
                                <button className="w-full px-4 py-2.5 bg-white text-black rounded-lg text-xs font-bold hover:bg-gray-100 active:scale-98 transition-all duration-200 shadow-md hover:shadow-lg">
                                    Upgrade Now
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom: user info + logout */}
            <div className="p-6 border-t border-white/5">
                <SignedOut>
                    <SignInButton>
                        <button className="w-full px-4 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-sm">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <div className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all duration-200">
                        <div className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0 group-hover:border-white/30 group-hover:bg-white/15 transition-all duration-200">
                            {user?.imageUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={user.imageUrl}
                                    alt={user.fullName ?? "User avatar"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white text-sm font-semibold">{initials.toUpperCase()}</span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm text-white font-semibold truncate group-hover:text-gray-100 transition-colors">
                                {user?.fullName ?? user?.firstName ?? "User"}
                            </div>
                            <div className="text-xs text-gray-500 truncate group-hover:text-gray-400 transition-colors">
                                {isPremium ? 'Premium Member' : String(user?.publicMetadata?.role ?? "Member")}
                            </div>
                        </div>
                        <SignOutButton>
                            <button className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-all duration-200 group/btn">
                                <LogOut className="w-4 h-4 text-white transition-colors" />
                            </button>
                        </SignOutButton>
                    </div>
                </SignedIn>
            </div>
        </aside>
    );
}