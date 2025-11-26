"use client";

import React from "react";
import { Building2 } from "lucide-react";
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
} from "@heroui/react";

// Table columns configuration
const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "AGENCY NAME", uid: "name", sortable: true },
    { name: "LOCATION", uid: "location", sortable: true },
    { name: "INDUSTRY", uid: "industry", sortable: true },
    { name: "EMPLOYEES", uid: "employees", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
];

const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Inactive", uid: "inactive" },
];

const agencies = [
    { id: 1, name: "TechCorp Solutions", location: "New York, NY", employees: 250, status: "active", industry: "Technology" },
    { id: 2, name: "Global Consulting Inc", location: "London, UK", employees: 180, status: "active", industry: "Consulting" },
    { id: 3, name: "Design Studios Ltd", location: "San Francisco, CA", employees: 95, status: "active", industry: "Design" },
    { id: 4, name: "Marketing Pros", location: "Chicago, IL", employees: 120, status: "active", industry: "Marketing" },
    { id: 5, name: "Finance Experts", location: "Boston, MA", employees: 300, status: "inactive", industry: "Finance" },
    { id: 6, name: "Healthcare Solutions", location: "Austin, TX", employees: 450, status: "active", industry: "Healthcare" },
    { id: 7, name: "Legal Partners", location: "Washington, DC", employees: 85, status: "active", industry: "Legal" },
    { id: 8, name: "Retail Giants", location: "Los Angeles, CA", employees: 520, status: "active", industry: "Retail" },
    { id: 9, name: "Education First", location: "Seattle, WA", employees: 210, status: "inactive", industry: "Education" },
    { id: 10, name: "Manufacturing Co", location: "Detroit, MI", employees: 380, status: "active", industry: "Manufacturing" },
    { id: 11, name: "Tech Innovators", location: "San Jose, CA", employees: 175, status: "active", industry: "Technology" },
    { id: 12, name: "Strategy Partners", location: "Boston, MA", employees: 140, status: "active", industry: "Consulting" },
    { id: 13, name: "Creative Agency", location: "Portland, OR", employees: 65, status: "inactive", industry: "Design" },
    { id: 14, name: "Digital Marketing Co", location: "Miami, FL", employees: 95, status: "active", industry: "Marketing" },
    { id: 15, name: "Investment Group", location: "New York, NY", employees: 420, status: "active", industry: "Finance" },
];

function capitalize(s: string) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const PlusIcon = ({ size = 24, width, height, ...props }: any) => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height={size || height}
            role="presentation"
            viewBox="0 0 24 24"
            width={size || width}
            {...props}
        >
            <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            >
                <path d="M6 12h12" />
                <path d="M12 18V6" />
            </g>
        </svg>
    );
};

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

const statusColorMap: Record<string, "success" | "default"> = {
    active: "success",
    inactive: "default",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "location", "industry", "employees", "status"];

export default function AgenciesPage() {
    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set([]));
    const [visibleColumns, setVisibleColumns] = React.useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = React.useState<any>("all");
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [sortDescriptor, setSortDescriptor] = React.useState<any>({
        column: "name",
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredAgencies = [...agencies];

        if (hasSearchFilter) {
            filteredAgencies = filteredAgencies.filter((agency) =>
                agency.name.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredAgencies = filteredAgencies.filter((agency) =>
                Array.from(statusFilter).includes(agency.status),
            );
        }

        return filteredAgencies;
    }, [filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((agency: any, columnKey: React.Key) => {
        const cellValue = agency[columnKey as keyof typeof agency];

        switch (columnKey) {
            case "id":
                return <span className="text-default-400">#{cellValue}</span>;
            case "name":
                return (
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                            <Building2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-bold text-small">{cellValue}</p>
                        </div>
                    </div>
                );
            case "industry":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[agency.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            default:
                return cellValue;
        }
    }, []);

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
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
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
                        <Button color="primary" endContent={<PlusIcon />}>
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {agencies.length} agencies</span>
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
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        onSearchChange,
        hasSearchFilter,
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
                        <Building2 className="w-8 h-8 text-blue-400" />
                        Agencies
                    </h1>
                    <p className="text-gray-400">
                        Browse and manage all agencies in the database
                    </p>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Total Agencies</p>
                    <p className="text-2xl font-bold text-white">{agencies.length}</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Active</p>
                    <p className="text-2xl font-bold text-green-400">
                        {agencies.filter(a => a.status === "active").length}
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Inactive</p>
                    <p className="text-2xl font-bold text-gray-400">
                        {agencies.filter(a => a.status === "inactive").length}
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <p className="text-xs text-gray-400 mb-1">Total Employees</p>
                    <p className="text-2xl font-bold text-white">
                        {agencies.reduce((sum, a) => sum + a.employees, 0).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Table */}
            {isMounted && (
                <Table
                    isHeaderSticky
                    aria-label="Agencies table with custom cells, pagination and sorting"
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
                    <TableBody emptyContent={"No agencies found"} items={sortedItems}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
}
