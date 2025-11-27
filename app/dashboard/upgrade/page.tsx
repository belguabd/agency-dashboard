"use client";

import React from "react";
import { Crown, Zap, CheckCircle, Shield } from "lucide-react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { addToast } from "@heroui/toast";

export default function UpgradePage() {
    const router = useRouter();
    const [viewsUsed, setViewsUsed] = React.useState(0);
    const [isPremium, setIsPremium] = React.useState(false);
    const DAILY_LIMIT = 50;

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedData = localStorage.getItem('contactViewData');
            if (storedData) {
                const { count } = JSON.parse(storedData);
                setViewsUsed(count);
            }

            const premiumStatus = localStorage.getItem('premiumStatus');
            if (premiumStatus) {
                const { isPremium: premium } = JSON.parse(premiumStatus);
                setIsPremium(premium);
            }
        }
    }, []);

    const handleUpgrade = () => {
        localStorage.setItem('premiumStatus', JSON.stringify({
            isPremium: true,
            upgradeDate: new Date().toISOString(),
        }));

        addToast({
            title: "Successfully Upgraded! 🎉",
            description: "You now have unlimited contact views and premium features.",
            color: "success",
        });

        setIsPremium(true);
        setTimeout(() => router.push('/dashboard/contacts'), 2000);
    };

    const handleCancelPremium = () => {
        localStorage.removeItem('premiumStatus');
        addToast({
            title: "Premium Cancelled",
            description: "Your account has been downgraded to the free plan.",
            color: "warning",
        });
        setIsPremium(false);
    };

    const viewsRemaining = Math.max(0, DAILY_LIMIT - viewsUsed);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Crown className="w-8 h-8 text-yellow-400" />
                    {isPremium ? 'Premium Account' : 'Upgrade to Premium'}
                </h1>
                <p className="text-gray-400">
                    {isPremium ? 'Manage your premium subscription' : 'Unlock unlimited access to all features'}
                </p>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Daily Views</p>
                    <p className="text-2xl font-bold text-yellow-400">{isPremium ? '∞' : `${viewsUsed}/${DAILY_LIMIT}`}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Views Remaining</p>
                    <p className="text-2xl font-bold text-green-400">{isPremium ? 'Unlimited' : viewsRemaining}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Current Plan</p>
                    <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-white">{isPremium ? 'Premium' : 'Free'}</p>
                        {isPremium && <Crown className="w-5 h-5 text-yellow-400" />}
                    </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Status</p>
                    <p className="text-2xl font-bold text-green-400">{isPremium ? 'Active' : 'Free'}</p>
                </div>
            </div>

            {/* Main Content */}
            {isPremium ? (
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Premium Account Active</h3>
                            <p className="text-sm text-gray-400">You have unlimited access to all features</p>
                        </div>
                        <Crown className="w-8 h-8 text-yellow-400" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-white">Unlimited Contact Views</p>
                                <p className="text-xs text-gray-400">No daily limits</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-white">Export Data</p>
                                <p className="text-xs text-gray-400">CSV/Excel downloads</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-white">Advanced Filters</p>
                                <p className="text-xs text-gray-400">Powerful search tools</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-white">Priority Support</p>
                                <p className="text-xs text-gray-400">Faster response times</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <Button color="primary" onPress={() => router.push('/dashboard/contacts')}>
                            View Contacts
                        </Button>
                        <Button variant="flat" onPress={() => router.push('/dashboard')}>
                            Dashboard
                        </Button>
                        <Button color="danger" variant="light" onPress={handleCancelPremium}>
                            Cancel Subscription
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <div className="w-16 h-16 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Crown className="w-8 h-8 text-yellow-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {viewsUsed >= DAILY_LIMIT ? 'Daily Limit Reached' : 'Upgrade to Premium'}
                        </h3>
                        <p className="text-gray-400 mb-6">
                            {viewsUsed >= DAILY_LIMIT
                                ? `You've used all ${DAILY_LIMIT} daily views. Upgrade for unlimited access.`
                                : 'Get unlimited contact views and premium features'
                            }
                        </p>

                        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto mb-6">
                            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                                <p className="text-sm text-white">Unlimited Views</p>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                                <p className="text-sm text-white">Export Data</p>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                                <p className="text-sm text-white">Advanced Filters</p>
                            </div>
                            <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg">
                                <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                                <p className="text-sm text-white">Priority Support</p>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center">
                            <Button
                                color="primary"
                                size="lg"
                                onPress={handleUpgrade}
                                startContent={<Crown className="w-5 h-5" />}
                            >
                                Upgrade Now
                            </Button>
                            <Button variant="flat" size="lg" onPress={() => router.back()}>
                                Maybe Later
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
