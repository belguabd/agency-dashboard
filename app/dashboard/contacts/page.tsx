"use client";

import React from "react";
import { Users, Crown } from "lucide-react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Chip,
    Pagination,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Spinner,
    Skeleton,
    Card,
    CardBody,
} from "@heroui/react";
import { useUser } from '@clerk/nextjs';
import { getContacts } from "@/app/actions/getContacts";
import { Contact } from "@/types";

// Table columns configuration
const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email", sortable: true },
    { name: "PHONE", uid: "phone", sortable: false },
    { name: "POSITION", uid: "position", sortable: true },
    { name: "DEPARTMENT", uid: "department", sortable: true },
    { name: "ACTIONS", uid: "actions", sortable: false },
];

const departmentOptions = [
    { name: "Operations", uid: "operations" },
    { name: "Marketing", uid: "marketing" },
    { name: "Finance", uid: "finance" },
    { name: "HR", uid: "hr" },
    { name: "IT", uid: "it" },
    { name: "Sales", uid: "sales" },
];

function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const SearchIcon = (props: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...props}
        >
            <path
                d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
            <path
                d="M22 22L20 20"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            />
        </svg>
    );
};

const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 24 24"
            width="1em"
            {...otherProps}
        >
            <path
                d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

const EyeIcon = (props: any) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 20 20"
        width="1em"
        {...props}
    >
        <path
            d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
        <path
            d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        />
    </svg>
);

const LockIcon = (props: any) => (
    <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
    >
        <path
            d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
        />
    </svg>
);

const departmentColorMap: Record<string, "primary" | "secondary" | "success" | "warning" | "danger" | "default"> = {
    operations: "primary",
    marketing: "secondary",
    finance: "success",
    hr: "warning",
    it: "danger",
    sales: "default",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "email", "phone", "position", "department", "actions"];
const DAILY_LIMIT = 50;

export default function ContactsPage() {
    const { user } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isContactOpen, onOpen: onContactOpen, onOpenChange: onContactOpenChange } = useDisclosure();
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [departmentFilter, setDepartmentFilter] = React.useState<any>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<any>({
        column: "name",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const [isMounted, setIsMounted] = React.useState(false);
    const [dailyViewCount, setDailyViewCount] = React.useState(0);
    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);
    const [contacts, setContacts] = React.useState<Contact[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [viewedContacts, setViewedContacts] = React.useState<Set<string>>(new Set());
    const [isPremium, setIsPremium] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
        // Get daily view count from localStorage
        const today = new Date().toDateString();
        const storedData = localStorage.getItem('contactViewData');

        // Check premium status
        const premiumStatus = localStorage.getItem('premiumStatus');
        if (premiumStatus) {
            const { isPremium: premium } = JSON.parse(premiumStatus);
            setIsPremium(premium);
        }

        if (storedData) {
            const { date, count, viewedIds } = JSON.parse(storedData);
            if (date === today) {
                setDailyViewCount(count);
                setViewedContacts(new Set(viewedIds || []));
            } else {
                // New day, reset count
                setDailyViewCount(0);
                setViewedContacts(new Set());
                localStorage.setItem('contactViewData', JSON.stringify({ date: today, count: 0, viewedIds: [] }));
            }
        } else {
            localStorage.setItem('contactViewData', JSON.stringify({ date: today, count: 0, viewedIds: [] }));
        }

        // Fetch contacts data
        const fetchContacts = async () => {
            setIsLoading(true);
            const data = await getContacts();
            setContacts(data);
            setIsLoading(false);
        };

        fetchContacts();
    }, []);

    const handleContactView = React.useCallback((contact: Contact) => {
        // Always set the selected contact first
        setSelectedContact(contact);

        // If premium, skip all limits
        if (isPremium) {
            onContactOpen();
            return;
        }

        // Check if already viewed this contact
        if (viewedContacts.has(contact.id)) {
            onContactOpen();
            return;
        }

        // Check if limit reached BEFORE viewing
        if (dailyViewCount >= DAILY_LIMIT) {
            onOpen();
            return;
        }

        const newViewedContacts = new Set(viewedContacts).add(contact.id);

        // Update state immediately - this will remove skeleton from table
        setDailyViewCount(prev => prev + 1);
        setViewedContacts(newViewedContacts);

        const today = new Date().toDateString();
        localStorage.setItem('contactViewData', JSON.stringify({
            date: today,
            count: dailyViewCount + 1,
            viewedIds: Array.from(newViewedContacts)
        }));

        // Open contact details modal
        onContactOpen();
    }, [viewedContacts, dailyViewCount, onContactOpen, onOpen, isPremium]);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredContacts = [...contacts];

        if (hasSearchFilter) {
            filteredContacts = filteredContacts.filter((contact) =>
                `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(filterValue.toLowerCase()) ||
                contact.email.toLowerCase().includes(filterValue.toLowerCase()) ||
                contact.title.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (departmentFilter !== "all" && Array.from(departmentFilter).length !== departmentOptions.length) {
            filteredContacts = filteredContacts.filter((contact) =>
                Array.from(departmentFilter).includes(contact.department.toLowerCase()),
            );
        }

        return filteredContacts;
    }, [contacts, filterValue, departmentFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: any, b: any) => {
            let first, second;

            if (sortDescriptor.column === 'name') {
                first = `${a.first_name} ${a.last_name}`;
                second = `${b.first_name} ${b.last_name}`;
            } else if (sortDescriptor.column === 'position') {
                first = a.title;
                second = b.title;
            } else {
                first = a[sortDescriptor.column];
                second = b[sortDescriptor.column];
            }

            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((contact: Contact, columnKey: React.Key) => {
        const cellValue = contact[columnKey as keyof Contact];
        // Premium users can always view contacts
        const isViewed = isPremium || viewedContacts.has(contact.id);
        const canView = isPremium || isViewed || dailyViewCount < DAILY_LIMIT;

        switch (columnKey) {
            case "id":
                return <span className="text-default-400">#{contact.id.substring(0, 8)}</span>;
            case "name":
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            {isViewed ? (
                                <p className="text-bold text-small">
                                    {contact.first_name} {contact.last_name}
                                </p>
                            ) : (
                                <Skeleton className="h-4 w-32 rounded-lg" />
                            )}
                        </div>
                    </div>
                );
            case "email":
                return isViewed ? (
                    contact.email
                ) : (
                    <Skeleton className="h-4 w-48 rounded-lg" />
                );
            case "phone":
                return isViewed ? (
                    contact.phone
                ) : (
                    <Skeleton className="h-4 w-32 rounded-lg" />
                );
            case "position":
                return isViewed ? (
                    contact.title
                ) : (
                    <Skeleton className="h-4 w-28 rounded-lg" />
                );
            case "department":
                return isViewed ? (
                    <Chip
                        className="capitalize"
                        color={departmentColorMap[contact.department?.toLowerCase()] || "default"}
                        size="sm"
                        variant="flat"
                    >
                        {capitalize(contact.department || "N/A")}
                    </Chip>
                ) : (
                    <Skeleton className="h-6 w-20 rounded-lg" />
                );
            case "actions":
                return (
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color={canView ? "default" : "warning"}
                        onPress={() => handleContactView(contact)}
                    >
                        {canView ? <EyeIcon /> : <LockIcon />}
                    </Button>
                );
            default:
                return cellValue;
        }
    }, [viewedContacts, dailyViewCount, handleContactView, isPremium]);

    // ...existing pagination and search handlers from agencies page...
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name, email, agency..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Department
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={departmentFilter}
                                selectionMode="multiple"
                                onSelectionChange={setDepartmentFilter}
                            >
                                {departmentOptions.map((department) => (
                                    <DropdownItem key={department.uid} className="capitalize">
                                        {capitalize(department.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Total {contacts.length} contacts | Daily views: {isPremium ? '∞ Unlimited' : `${dailyViewCount}/${DAILY_LIMIT}`}
                    </span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-solid outline-transparent text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        departmentFilter,
        visibleColumns,
        onRowsPerPageChange,
        onSearchChange,
        hasSearchFilter,
        dailyViewCount,
        isPremium,
    ]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, filteredItems.length, page, pages, hasSearchFilter]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                        <Users className="w-8 h-8 text-success" />
                        Contacts
                    </h1>
                    <p className="text-default-500">
                        Browse and manage contact information for all agencies
                    </p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card shadow="sm">
                    <CardBody>
                        <p className="text-xs text-default-400 mb-1">Total Contacts</p>
                        <p className="text-2xl font-bold">{contacts.length}</p>
                    </CardBody>
                </Card>
                <Card shadow="sm">
                    <CardBody>
                        <p className="text-xs text-default-400 mb-1">Daily Views</p>
                        <p className="text-2xl font-bold text-primary">
                            {isPremium ? '∞' : dailyViewCount}
                        </p>
                    </CardBody>
                </Card>
                <Card shadow="sm">
                    <CardBody>
                        <p className="text-xs text-default-400 mb-1">Views Remaining</p>
                        <p className="text-2xl font-bold text-success">
                            {isPremium ? '∞' : Math.max(0, DAILY_LIMIT - dailyViewCount)}
                        </p>
                    </CardBody>
                </Card>
                <Card shadow="sm">
                    <CardBody>
                        <p className="text-xs text-default-400 mb-1">Current Plan</p>
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold">
                                {isPremium ? 'Premium' : 'Free'}
                            </p>
                            {isPremium && <Crown className="w-5 h-5 text-warning" />}
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Table */}
            {isMounted && (
                <Table
                    isHeaderSticky
                    aria-label="Contacts table with custom cells, pagination and sorting"
                    bottomContent={bottomContent}
                    bottomContentPlacement="outside"
                    classNames={{
                        wrapper: "max-h-[382px]",
                    }}
                    selectedKeys={selectedKeys}
                    selectionMode="multiple"
                    sortDescriptor={sortDescriptor}
                    topContent={topContent}
                    topContentPlacement="outside"
                    onSelectionChange={setSelectedKeys}
                    onSortChange={setSortDescriptor}
                >
                    <TableHeader columns={headerColumns}>
                        {(column) => (
                            <TableColumn
                                key={column.uid}
                                align="start"
                                allowsSorting={column.sortable}
                            >
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody emptyContent={"No contacts found"} items={sortedItems}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}

            {/* Upgrade Modal */}
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="lg"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-2 border-b border-white/10 pb-4 pt-6 px-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                                        <Crown className="w-6 h-6 text-warning" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Upgrade Required</h2>
                                        <p className="text-sm text-gray-400 font-normal">Unlock unlimited access</p>
                                    </div>
                                </div>
                            </ModalHeader>
                            <ModalBody className="gap-6 py-6 px-6">
                                {/* Alert Box */}
                                <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-xl">
                                    <svg className="w-5 h-5 text-warning shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="font-semibold text-sm text-white">Daily Limit Reached</p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            You've viewed <span className="font-semibold text-white">{DAILY_LIMIT}</span> contacts today.
                                            Upgrade to Premium for unlimited access.
                                        </p>
                                    </div>
                                </div>

                                {/* Premium Features */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Premium Features</h4>
                                        <Chip size="sm" color="warning" variant="flat">Popular</Chip>
                                    </div>

                                    <div className="grid gap-3">
                                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Unlimited Contact Views</p>
                                                <p className="text-xs text-gray-400">View as many contacts as you need</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Export to CSV/Excel</p>
                                                <p className="text-xs text-gray-400">Download contact lists anytime</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Advanced Filtering</p>
                                                <p className="text-xs text-gray-400">Search with powerful filters</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                                            <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">Priority Support</p>
                                                <p className="text-xs text-gray-400">Get help when you need it</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="border-t border-white/10 px-6 pb-6 gap-2">
                                <Button
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Maybe Later
                                </Button>
                                <Button
                                    color="warning"
                                    variant="shadow"
                                    onPress={() => {
                                        window.location.href = '/dashboard/upgrade';
                                        onClose();
                                    }}
                                    startContent={<Crown className="w-4 h-4" />}
                                >
                                    Upgrade to Premium
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            {/* Contact Details Modal */}
            <Modal
                isOpen={isContactOpen}
                onOpenChange={onContactOpenChange}
                size="2xl"
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 pb-4 pt-6 px-6 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                        <Users className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Contact Details</h2>
                                        <p className="text-sm text-gray-400 font-normal">Employee information</p>
                                    </div>
                                </div>
                            </ModalHeader>
                            <ModalBody className="px-6 pb-6 pt-6">
                                {selectedContact && (
                                    <div className="space-y-4">
                                        {/* Contact Name & Title */}
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 text-lg font-bold">
                                                    {selectedContact.first_name.charAt(0)}{selectedContact.last_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-white">
                                                        {selectedContact.first_name} {selectedContact.last_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-400">{selectedContact.title}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Contact Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                                <p className="text-xs text-gray-400 mb-1.5">Email</p>
                                                <p className="text-sm font-medium text-white break-all">{selectedContact.email}</p>
                                            </div>

                                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                                <p className="text-xs text-gray-400 mb-1.5">Phone</p>
                                                <p className="text-sm font-medium text-white">{selectedContact.phone}</p>
                                            </div>

                                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                                <p className="text-xs text-gray-400 mb-1.5">Department</p>
                                                <Chip
                                                    className="capitalize"
                                                    color={departmentColorMap[selectedContact.department?.toLowerCase()] || "default"}
                                                    size="sm"
                                                    variant="flat"
                                                >
                                                    {capitalize(selectedContact.department || "N/A")}
                                                </Chip>
                                            </div>

                                            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                                <p className="text-xs text-gray-400 mb-1.5">Agency ID</p>
                                                <p className="text-sm font-medium text-white font-mono">{selectedContact.agency_id}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter className="px-6 pb-6 border-t border-white/10 gap-2">
                                <Button
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
