"use client";

import { Building2, Users, Eye, Crown, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import React from "react";
import { getAgencies } from "@/app/actions/getAgencies";
import { getContacts } from "@/app/actions/getContacts";
import { Card, CardBody, CardHeader, Button, Progress, Chip, Divider } from "@heroui/react";
import { redirect } from "next/navigation";

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
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    Welcome back, {user?.firstName ?? "User"}!
                    {isPremium && <Crown className="w-7 h-7 text-warning" />}
                </h1>
                <p className="text-default-500 mt-2">
                    {isPremium
                        ? 'You have unlimited access to all features'
                        : 'Manage your agencies and employee contacts efficiently'
                    }
                </p>
            </div>

            {/* Premium Banner */}
            {isPremium && (
                <Card className="bg-warning-50 dark:bg-warning-50/10 border-warning">
                    <CardBody>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-warning-100 dark:bg-warning-100/20 rounded-lg flex items-center justify-center">
                                <Crown className="w-5 h-5 text-warning" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-semibold">Premium Account Active</h3>
                                <p className="text-xs text-default-500">Enjoying unlimited contact views and all premium features</p>
                            </div>
                            <Link href="/dashboard/upgrade">
                                <Button
                                    size="sm"
                                    variant="light"
                                    color="warning"
                                    endContent={<span>→</span>}
                                >
                                    Manage
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Total Agencies */}
                <Card shadow="sm">
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-100/20 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-primary" />
                            </div>
                            <Link href="/dashboard/agencies">
                                <Button
                                    size="sm"
                                    variant="light"
                                    color="primary"
                                    endContent={<span>→</span>}
                                >
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">
                            {isLoading ? "..." : totalAgencies}
                        </h3>
                        <p className="text-sm text-default-500">Total Agencies</p>
                    </CardBody>
                </Card>

                {/* Total Contacts */}
                <Card shadow="sm">
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-success-100 dark:bg-success-100/20 rounded-lg flex items-center justify-center">
                                <Users className="w-6 h-6 text-success" />
                            </div>
                            <Link href="/dashboard/contacts">
                                <Button
                                    size="sm"
                                    variant="light"
                                    color="success"
                                    endContent={<span>→</span>}
                                >
                                    View All
                                </Button>
                            </Link>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">
                            {isLoading ? "..." : totalContacts.toLocaleString()}
                        </h3>
                        <p className="text-sm text-default-500">Employee Contacts</p>
                    </CardBody>
                </Card>

                {/* Daily Usage */}
                <Card
                    className={isPremium ? 'border-success' : ''}
                    shadow="sm"
                >
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${isPremium ? 'bg-success-100 dark:bg-success-100/20' : 'bg-secondary-100 dark:bg-secondary-100/20'}`}>
                                <Eye className={`w-6 h-6 ${isPremium ? 'text-success' : 'text-secondary'}`} />
                            </div>
                            <Chip size="sm" variant="flat">Today</Chip>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">
                            {isPremium ? '∞ Unlimited' : `${contactsViewedToday} / ${DAILY_LIMIT}`}
                        </h3>
                        <p className="text-sm text-default-500">
                            {isPremium ? 'No limits' : 'Contacts Viewed'}
                        </p>
                    </CardBody>
                </Card>
            </div>

            {/* Daily Limit Progress or Premium Status */}
            {!isPremium ? (
                <Card shadow="sm">
                    <CardBody>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-warning-100 dark:bg-warning-100/20 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-warning" />
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold">Daily Quota</h3>
                                    <p className="text-xs text-default-500">
                                        {remainingViews} views remaining today
                                    </p>
                                </div>
                            </div>
                            <Link href="/dashboard/upgrade">
                                <Button
                                    color="warning"
                                    variant="flat"
                                    startContent={<Crown className="w-4 h-4" />}
                                >
                                    Upgrade
                                </Button>
                            </Link>
                        </div>

                        {/* Progress Bar */}
                        <Progress
                            value={progressPercentage}
                            color="warning"
                            className="mb-2"
                            classNames={{
                                indicator: "bg-gradient-to-r from-warning to-warning-600"
                            }}
                        />
                        <div className="flex justify-between">
                            <span className="text-xs text-default-400">0 views</span>
                            <span className="text-xs text-default-400">50 views (limit)</span>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <Card className="border-success" shadow="sm">
                    <CardBody>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-success-100 dark:bg-success-100/20 rounded-lg flex items-center justify-center">
                                <Crown className="w-5 h-5 text-success" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold">Premium Benefits Active</h3>
                                <p className="text-xs text-default-500">
                                    Unlimited views • Export data • Advanced filters • Priority support
                                </p>
                            </div>
                            <Link href="/dashboard/upgrade">
                                <Button
                                    size="sm"
                                    variant="light"
                                    color="success"
                                    endContent={<span>→</span>}
                                >
                                    Manage Plan
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Quick Actions */}
            <div>
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/dashboard/agencies">
                        <Card
                            isPressable
                            isHoverable
                            shadow="sm"
                        >
                            <CardBody>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-100/20 rounded-lg flex items-center justify-center">
                                        <Building2 className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">Browse Agencies</h3>
                                        <p className="text-xs text-default-500">View all agencies in database</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Link>

                    <Link href="/dashboard/contacts">
                        <Card
                            isPressable
                            isHoverable
                            shadow="sm"
                        >
                            <CardBody>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-success-100 dark:bg-success-100/20 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-success" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold">View Contacts</h3>
                                        <p className="text-xs text-default-500">Access employee information</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    );
}