"use client";

import React from "react";
import { Crown, Zap, CheckCircle, Shield, Sparkles, TrendingUp, Users, Download, X } from "lucide-react";
import { Button, Card, CardBody, CardHeader, Divider, Chip, Progress } from "@heroui/react";
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
    const usagePercentage = (viewsUsed / DAILY_LIMIT) * 100;

    const premiumFeatures = [
        { icon: Zap, title: "Unlimited Contact Views", desc: "Access all contacts without restrictions" },
        { icon: Download, title: "Export Capabilities", desc: "Download data in CSV and Excel formats" },
        { icon: TrendingUp, title: "Advanced Analytics", desc: "Deep insights and custom reports" },
        { icon: Users, title: "Team Collaboration", desc: "Share and collaborate with your team" },
        { icon: Shield, title: "Priority Support", desc: "24/7 dedicated support team" },
        { icon: Sparkles, title: "Advanced Filters", desc: "Powerful search and filtering tools" },
    ];

    if (isPremium) {
        return (
            <div className="space-y-6">
                {/* Premium Active Header */}
                <Card>
                    <CardBody className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                                    <Crown className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">Premium Account</h1>
                                    <p className="text-sm text-default-500 mt-1">You have access to all premium features</p>
                                </div>
                            </div>
                            <Chip color="success" variant="flat" startContent={<CheckCircle className="w-4 h-4" />}>
                                Active
                            </Chip>
                        </div>
                    </CardBody>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardBody className="p-4">
                            <p className="text-sm text-default-500 mb-1">Contact Views</p>
                            <p className="text-2xl font-bold">Unlimited</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="p-4">
                            <p className="text-sm text-default-500 mb-1">Plan Status</p>
                            <p className="text-2xl font-bold">Premium</p>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardBody className="p-4">
                            <p className="text-sm text-default-500 mb-1">Features Unlocked</p>
                            <p className="text-2xl font-bold">All</p>
                        </CardBody>
                    </Card>
                </div>

                {/* Premium Features */}
                <Card>
                    <CardHeader className="pb-0 pt-6 px-6">
                        <h3 className="text-lg font-semibold">Premium Features</h3>
                    </CardHeader>
                    <CardBody className="gap-3 p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {premiumFeatures.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 p-3 rounded-lg border border-divider">
                                    <div className="w-10 h-10 bg-default-100 rounded-lg flex items-center justify-center shrink-0">
                                        <feature.icon className="w-5 h-5 text-default-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-sm">{feature.title}</p>
                                        <p className="text-xs text-default-500 mt-0.5">{feature.desc}</p>
                                    </div>
                                    <CheckCircle className="w-5 h-5 text-success shrink-0" />
                                </div>
                            ))}
                        </div>

                        <Divider className="my-2" />

                        <div className="flex gap-3 justify-center flex-wrap">
                            <Button color="primary" onPress={() => router.push('/dashboard/contacts')}>
                                View Contacts
                            </Button>
                            <Button variant="bordered" onPress={() => router.push('/dashboard')}>
                                Go to Dashboard
                            </Button>
                            <Button color="danger" variant="light" onPress={handleCancelPremium}>
                                Cancel Premium
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Upgrade to Premium</h1>
                <p className="text-default-500">
                    {viewsUsed >= DAILY_LIMIT
                        ? `You've reached your daily limit of ${DAILY_LIMIT} views. Activate premium for unlimited access.`
                        : 'Get unlimited contact views and premium features'
                    }
                </p>
            </div>

            {/* Usage Card */}
            <Card className={viewsUsed >= DAILY_LIMIT ? "border-2 border-danger" : ""}>
                <CardBody className="p-6">
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold">Daily Usage</p>
                                <p className="text-sm text-default-500">{viewsUsed} of {DAILY_LIMIT} views used</p>
                            </div>
                            <Chip color={viewsUsed >= DAILY_LIMIT ? "danger" : viewsRemaining <= 10 ? "warning" : "success"} variant="flat">
                                {viewsRemaining} remaining
                            </Chip>
                        </div>
                        <Progress
                            value={usagePercentage}
                            color={viewsUsed >= DAILY_LIMIT ? "danger" : usagePercentage > 80 ? "warning" : "success"}
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Free Plan */}
                <Card>
                    <CardHeader className="pb-0 pt-6 px-6">
                        <div>
                            <p className="text-sm text-default-500">Current Plan</p>
                            <h3 className="text-xl font-bold">Free</h3>
                        </div>
                    </CardHeader>
                    <CardBody className="gap-3 p-6">
                        <div className="space-y-2">
                            {[
                                { text: "50 contact views per day", included: true },
                                { text: "Basic filtering", included: true },
                                { text: "Standard support", included: true },
                                { text: "Unlimited views", included: false },
                                { text: "Export data", included: false },
                                { text: "Advanced analytics", included: false },
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    {feature.included ? (
                                        <CheckCircle className="w-4 h-4 text-success shrink-0" />
                                    ) : (
                                        <X className="w-4 h-4 text-default-300 shrink-0" />
                                    )}
                                    <span className={feature.included ? "" : "text-default-400"}>
                                        {feature.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                {/* Premium Plan */}
                <Card className="border-2 border-primary">
                    <CardHeader className="pb-0 pt-6 px-6">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Crown className="w-4 h-4 text-primary" />
                                <p className="text-sm font-medium text-primary">Recommended</p>
                            </div>
                            <h3 className="text-xl font-bold">Premium</h3>
                        </div>
                    </CardHeader>
                    <CardBody className="gap-3 p-6">
                        <div className="space-y-2">
                            {[
                                "Unlimited contact views",
                                "Export to CSV/Excel",
                                "Advanced filters & search",
                                "Priority support (24/7)",
                                "Team collaboration",
                                "Custom reports & analytics",
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-success shrink-0" />
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <Divider className="my-2" />

                        <Button
                            color="primary"
                            className="w-full"
                            onPress={handleUpgrade}
                            startContent={<Crown className="w-4 h-4" />}
                        >
                            Activate Premium
                        </Button>
                    </CardBody>
                </Card>
            </div>

            {/* Back Button */}
            <div className="flex justify-center">
                <Button variant="light" onPress={() => router.back()}>
                    Maybe Later
                </Button>
            </div>
        </div>
    );
}
