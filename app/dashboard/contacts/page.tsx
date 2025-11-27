"use client";

import React from "react";
import { Users } from "lucide-react";
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
} from "@heroui/react";
import { useUser } from '@clerk/nextjs';

// Table columns configuration
const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email", sortable: true },
    { name: "PHONE", uid: "phone", sortable: false },
    { name: "POSITION", uid: "position", sortable: true },
    { name: "AGENCY", uid: "agency", sortable: true },
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

const contacts = [
    { id: 1, firstName: 'John', lastName: 'Smith', email: 'j.smith@nyc.gov', phone: '(212) 555-0101', position: 'Manager', agency: 'New York', department: 'operations' },
    { id: 2, firstName: 'Sarah', lastName: 'Johnson', email: 's.johnson@la.gov', phone: '(213) 555-0102', position: 'Director', agency: 'Los Angeles', department: 'marketing' },
    { id: 3, firstName: 'Michael', lastName: 'Brown', email: 'm.brown@chicago.gov', phone: '(312) 555-0103', position: 'Analyst', agency: 'Chicago', department: 'finance' },
    { id: 4, firstName: 'Emily', lastName: 'Davis', email: 'e.davis@houston.gov', phone: '(713) 555-0104', position: 'Coordinator', agency: 'Houston', department: 'hr' },
    { id: 5, firstName: 'David', lastName: 'Wilson', email: 'd.wilson@phoenix.gov', phone: '(602) 555-0105', position: 'Specialist', agency: 'Phoenix', department: 'it' },
    { id: 6, firstName: 'Jessica', lastName: 'Miller', email: 'j.miller@philly.gov', phone: '(215) 555-0106', position: 'Lead', agency: 'Philadelphia', department: 'operations' },
    { id: 7, firstName: 'Chris', lastName: 'Anderson', email: 'c.anderson@sa.gov', phone: '(210) 555-0107', position: 'Manager', agency: 'San Antonio', department: 'sales' },
    { id: 8, firstName: 'Amanda', lastName: 'Taylor', email: 'a.taylor@sd.gov', phone: '(619) 555-0108', position: 'Director', agency: 'San Diego', department: 'marketing' },
    { id: 9, firstName: 'Ryan', lastName: 'Thomas', email: 'r.thomas@dallas.gov', phone: '(214) 555-0109', position: 'Analyst', agency: 'Dallas', department: 'finance' },
    { id: 10, firstName: 'Lisa', lastName: 'Jackson', email: 'l.jackson@sj.gov', phone: '(408) 555-0110', position: 'Coordinator', agency: 'San Jose', department: 'hr' },
    { id: 11, firstName: 'Kevin', lastName: 'White', email: 'k.white@austin.gov', phone: '(512) 555-0111', position: 'Specialist', agency: 'Austin', department: 'it' },
    { id: 12, firstName: 'Nicole', lastName: 'Harris', email: 'n.harris@jax.gov', phone: '(904) 555-0112', position: 'Lead', agency: 'Jacksonville', department: 'operations' },
    { id: 13, firstName: 'Brandon', lastName: 'Martin', email: 'b.martin@sf.gov', phone: '(415) 555-0113', position: 'Manager', agency: 'San Francisco', department: 'sales' },
    { id: 14, firstName: 'Rachel', lastName: 'Thompson', email: 'r.thompson@columbus.gov', phone: '(614) 555-0114', position: 'Director', agency: 'Columbus', department: 'marketing' },
    { id: 15, firstName: 'Jason', lastName: 'Garcia', email: 'j.garcia@indy.gov', phone: '(317) 555-0115', position: 'Analyst', agency: 'Indianapolis', department: 'finance' },
    { id: 16, firstName: 'Stephanie', lastName: 'Martinez', email: 's.martinez@charlotte.gov', phone: '(704) 555-0116', position: 'Coordinator', agency: 'Charlotte', department: 'hr' },
    { id: 17, firstName: 'Mark', lastName: 'Robinson', email: 'm.robinson@seattle.gov', phone: '(206) 555-0117', position: 'Specialist', agency: 'Seattle', department: 'it' },
    { id: 18, firstName: 'Ashley', lastName: 'Clark', email: 'a.clark@denver.gov', phone: '(303) 555-0118', position: 'Lead', agency: 'Denver', department: 'operations' },
    { id: 19, firstName: 'Daniel', lastName: 'Rodriguez', email: 'd.rodriguez@dc.gov', phone: '(202) 555-0119', position: 'Manager', agency: 'Washington', department: 'sales' },
    { id: 20, firstName: 'Michelle', lastName: 'Lewis', email: 'm.lewis@boston.gov', phone: '(617) 555-0120', position: 'Director', agency: 'Boston', department: 'marketing' },
    { id: 21, firstName: 'Andrew', lastName: 'Lee', email: 'a.lee@nashville.gov', phone: '(615) 555-0121', position: 'Analyst', agency: 'Nashville', department: 'finance' },
    { id: 22, firstName: 'Samantha', lastName: 'Walker', email: 's.walker@baltimore.gov', phone: '(410) 555-0122', position: 'Coordinator', agency: 'Baltimore', department: 'hr' },
    { id: 23, firstName: 'Tyler', lastName: 'Hall', email: 't.hall@louisville.gov', phone: '(502) 555-0123', position: 'Specialist', agency: 'Louisville', department: 'it' },
    { id: 24, firstName: 'Megan', lastName: 'Allen', email: 'm.allen@portland.gov', phone: '(503) 555-0124', position: 'Lead', agency: 'Portland', department: 'operations' },
    { id: 25, firstName: 'Jonathan', lastName: 'Young', email: 'j.young@okc.gov', phone: '(405) 555-0125', position: 'Manager', agency: 'Oklahoma City', department: 'sales' },
    { id: 26, firstName: 'Laura', lastName: 'King', email: 'l.king@milwaukee.gov', phone: '(414) 555-0126', position: 'Director', agency: 'Milwaukee', department: 'marketing' }
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

const departmentColorMap: Record<string, "primary" | "secondary" | "success" | "warning" | "danger" | "default"> = {
    operations: "primary",
    marketing: "secondary",
    finance: "success",
    hr: "warning",
    it: "danger",
    sales: "default",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "email", "phone", "position", "agency", "department", "actions"];
const DAILY_LIMIT = 50;

export default function ContactsPage() {
    const { user } = useUser();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
    const [selectedContact, setSelectedContact] = React.useState<any>(null);

    React.useEffect(() => {
        setIsMounted(true);
        // Get daily view count from localStorage
        const today = new Date().toDateString();
        const storedData = localStorage.getItem('contactViewData');

        if (storedData) {
            const { date, count } = JSON.parse(storedData);
            if (date === today) {
                setDailyViewCount(count);
            } else {
                // New day, reset count
                setDailyViewCount(0);
                localStorage.setItem('contactViewData', JSON.stringify({ date: today, count: 0 }));
            }
        } else {
            localStorage.setItem('contactViewData', JSON.stringify({ date: today, count: 0 }));
        }
    }, []);

    const handleContactView = (contact: any) => {
        if (dailyViewCount >= DAILY_LIMIT) {
            onOpen();
            return;
        }

        const newCount = dailyViewCount + 1;
        setDailyViewCount(newCount);

        const today = new Date().toDateString();
        localStorage.setItem('contactViewData', JSON.stringify({ date: today, count: newCount }));

        setSelectedContact(contact);

        if (newCount >= DAILY_LIMIT) {
            setTimeout(() => onOpen(), 100);
        }
    };

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredContacts = [...contacts];

        if (hasSearchFilter) {
            filteredContacts = filteredContacts.filter((contact) =>
                `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(filterValue.toLowerCase()) ||
                contact.email.toLowerCase().includes(filterValue.toLowerCase()) ||
                contact.agency.toLowerCase().includes(filterValue.toLowerCase()) ||
                contact.position.toLowerCase().includes(filterValue.toLowerCase())
            );
        }
        if (departmentFilter !== "all" && Array.from(departmentFilter).length !== departmentOptions.length) {
            filteredContacts = filteredContacts.filter((contact) =>
                Array.from(departmentFilter).includes(contact.department),
            );
        }

        return filteredContacts;
    }, [filterValue, departmentFilter]);

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
                first = `${a.firstName} ${a.lastName}`;
                second = `${b.firstName} ${b.lastName}`;
            } else {
                first = a[sortDescriptor.column];
                second = b[sortDescriptor.column];
            }

            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((contact: any, columnKey: React.Key) => {
        const cellValue = contact[columnKey as keyof typeof contact];

        switch (columnKey) {
            case "id":
                return <span className="text-default-400">#{cellValue}</span>;
            case "name":
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-bold text-small">{contact.firstName} {contact.lastName}</p>
                        </div>
                    </div>
                );
            case "department":
                return (
                    <Chip
                        className="capitalize"
                        color={departmentColorMap[contact.department]}
                        size="sm"
                        variant="flat"
                    >
                        {capitalize(cellValue)}
                    </Chip>
                );
            case "actions":
                return (
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleContactView(contact)}
                    >
                        <EyeIcon />
                    </Button>
                );
            default:
                return cellValue;
        }
    }, []);

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
                        Total {contacts.length} contacts | Daily views: {dailyViewCount}/{DAILY_LIMIT}
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-400" />
                        Contacts
                    </h1>
                    <p className="text-gray-400">
                        Browse and manage contact information for all agencies
                    </p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Total Contacts</p>
                    <p className="text-2xl font-bold text-white">{contacts.length}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Daily Views</p>
                    <p className="text-2xl font-bold text-blue-400">{dailyViewCount}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Views Remaining</p>
                    <p className="text-2xl font-bold text-green-400">{Math.max(0, DAILY_LIMIT - dailyViewCount)}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Unique Agencies</p>
                    <p className="text-2xl font-bold text-white">
                        {new Set(contacts.map(c => c.agency)).size}
                    </p>
                </div>
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
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Daily Contact View Limit Reached
                            </ModalHeader>
                            <ModalBody>
                                <p>
                                    You've reached your daily limit of {DAILY_LIMIT} contact views.
                                    Upgrade your plan to view unlimited contacts and access premium features.
                                </p>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-blue-900 mb-2">Premium Benefits:</h4>
                                    <ul className="text-blue-800 text-sm space-y-1">
                                        <li>• Unlimited daily contact views</li>
                                        <li>• Export contact data</li>
                                        <li>• Advanced filtering options</li>
                                        <li>• Priority support</li>
                                    </ul>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Maybe Later
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        alert('Upgrade functionality would be implemented here');
                                        onClose();
                                    }}
                                >
                                    Upgrade Now
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
