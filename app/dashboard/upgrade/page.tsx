"use client";

import React from "react";
import { Rocket, CheckCircle, X } from "lucide-react";
import {
    Button,
    Card,
    CardBody,
} from "@heroui/react";
import { useRouter } from "next/navigation";

export default function UpgradePage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleUpgrade = () => {
        // Handle upgrade logic here
        alert('Upgrade functionality would be implemented here');
    };

    const handleMaybeLater = () => {
        router.back();
    };

    return (
        <div className="space-y-6">
            {/* Header - matching agencies page */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Rocket className="w-8 h-8 text-blue-400" />
                        Upgrade Plan
                    </h1>
                    <p className="text-gray-400">
                        Unlock unlimited access and premium features
                    </p>
                </div>
            </div>

            {/* Stats Summary - matching agencies page */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Daily Views Used</p>
                    <p className="text-2xl font-bold text-yellow-400">
                        {typeof window !== 'undefined' && localStorage.getItem('contactViewData')
                            ? JSON.parse(localStorage.getItem('contactViewData') || '{"count": 0}').count
                            : 0}
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Daily Limit</p>
                    <p className="text-2xl font-bold text-red-400">50</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Views Remaining</p>
                    <p className="text-2xl font-bold text-green-400">
                        {50 - (typeof window !== 'undefined' && localStorage.getItem('contactViewData')
                            ? JSON.parse(localStorage.getItem('contactViewData') || '{"count": 0}').count
                            : 0)}
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Current Plan</p>
                    <p className="text-2xl font-bold text-white">Free</p>
                </div>
            </div>

            {/* Main Content - centered card matching agencies page styling */}
            <div className="flex justify-center items-center py-8">
                <div className="w-full max-w-md">
                    <Card className="relative bg-white/5 border border-white/10 shadow-lg">
                        <CardBody className="p-6 sm:p-8">
                            {/* Close Button */}
                            <Button
                                isIconOnly
                                variant="light"
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                onPress={handleMaybeLater}
                            >
                                <X className="w-5 h-5" />
                            </Button>

                            {/* Icon */}
                            <div className="flex items-center justify-center w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full mb-6 mx-auto">
                                <Rocket className="w-10 h-10" />
                            </div>

                            {/* Title */}
                            <h1 className="text-white tracking-tight text-2xl sm:text-3xl font-bold leading-tight text-center pb-2">
                                Daily Limit Reached
                            </h1>

                            {/* Description */}
                            <p className="text-gray-400 text-base font-normal leading-normal pb-6 pt-1 text-center">
                                You've viewed 50 contacts today. Upgrade your plan to unlock unlimited access and boost your productivity.
                            </p>

                            {/* Features List */}
                            <div className="w-full flex flex-col gap-2 mb-8">
                                <div className="flex items-center gap-3 px-4 min-h-14">
                                    <div className="text-blue-400 flex items-center justify-center rounded-lg shrink-0 w-10 h-10">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <p className="text-white text-base font-normal leading-normal flex-1">
                                        Unlimited Contact Views
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 px-4 min-h-14">
                                    <div className="text-blue-400 flex items-center justify-center rounded-lg shrink-0 w-10 h-10">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <p className="text-white text-base font-normal leading-normal flex-1">
                                        Advanced Search Filters
                                    </p>
                                </div>
                                <div className="flex items-center gap-3 px-4 min-h-14">
                                    <div className="text-blue-400 flex items-center justify-center rounded-lg shrink-0 w-10 h-10">
                                        <CheckCircle className="w-6 h-6" />
                                    </div>
                                    <p className="text-white text-base font-normal leading-normal flex-1">
                                        Priority Support
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="w-full flex flex-col gap-3">
                                <Button
                                    color="primary"
                                    className="w-full h-12 text-base font-bold"
                                    onPress={handleUpgrade}
                                >
                                    Unlock Unlimited Access
                                </Button>
                                <Button
                                    variant="flat"
                                    className="w-full h-12 text-base font-medium text-gray-400 hover:text-white"
                                    onPress={handleMaybeLater}
                                >
                                    Maybe Later
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
