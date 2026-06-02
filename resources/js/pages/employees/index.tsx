import { Head, usePage, router } from '@inertiajs/react';
import { useRef, useState, useEffect } from 'react';
import EmployeeTable from '@/components/EmployeeTable';
import EmployeeForm from '@/components/EmployeeForm';
import { Button } from '@/components/ui/button';
import { BadgePlus } from 'lucide-react';

type Factory = {
    id: number;
    factory_name: string;
};

type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
    factory?: {
        factory_name: string;
    };
};

type PageProps = {
    employees: {
        data: Employee[];
        links: any[];
        total: number;
        current_page: number;
        last_page: number;
    };
    factories: Factory[];
};

export default function EmployeesIndex() {
    const { employees, factories } = usePage<PageProps>().props;

    const data = employees?.data ?? [];
    const links = employees?.links ?? [];

    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );

    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            setSearching(true);

            router.get(
                '/employees',
                { search: value, page: 1 },
                {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setSearching(false),
                    onError: () => {
                        setError('Failed to load employees');
                        setSearching(false);
                    },
                },
            );
        }, 400);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this employee?')) return;

        router.delete(`/employees/${id}`, {
            preserveScroll: true,
        });
    };

    const handleCreate = () => {
        setSelectedEmployee(null);
        setShowModal(true);
    };

    const handleEdit = (employee: Employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    return (
        <>
            <Head title="Employees" />

            <div className="flex flex-col gap-4 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Employees</h1>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleCreate}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
                        >
                            <BadgePlus />
                        </Button>

                        <input
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="rounded border px-3 py-2 text-sm"
                        />
                    </div>
                </div>

                {/* CARDS */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-gray-500">Total Factories</p>
                        <p className="text-2xl font-bold">{factories.length}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-gray-500">Total Employees</p>
                        <p className="text-2xl font-bold">{employees.total}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-gray-500">Current Page</p>
                        <p className="text-2xl font-bold">
                            {employees.current_page}
                        </p>
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <div className="rounded border border-red-300 bg-red-50 p-3 text-red-600">
                        {error}
                    </div>
                )}

                {/* TABLE */}
                <EmployeeTable
                    data={data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

                {/* PAGINATION */}
                <div className="flex justify-center gap-2">
                    {links.map((link: any, i: number) => (
                        <Button
                            key={i}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`rounded border px-3 py-1 text-sm ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white hover:bg-gray-500'
                            } ${!link.url ? 'opacity-50' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>

            {/* MODAL */}
            <EmployeeForm
                show={showModal}
                employee={selectedEmployee}
                factories={factories ?? []}
                onClose={() => {
                    setShowModal(false);
                    setSelectedEmployee(null);
                }}
            />
        </>
    );
}
