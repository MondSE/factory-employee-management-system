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
    filters?: {
        search?: string;
    };
};

export default function EmployeesIndex() {
    const { employees, factories, filters } = usePage<PageProps>().props;

    const [search, setSearch] = useState(filters?.search ?? '');
    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
        null,
    );

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // 🔥 SEARCH (Inertia reload instead of fetch)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            router.get(
                '/employees',
                { search: value },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 400);
    };

    // 🔥 DELETE (auto refresh via Inertia)
    const handleDelete = async (id: number) => {
        if (!confirm('Delete this employee?')) return;

        router.delete(`/employees/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                // Inertia automatically refreshes employees prop
            },
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

    const closeModal = () => {
        setShowModal(false);
        setSelectedEmployee(null);
    };

    return (
        <>
            <Head title="Employees" />

            <div className="flex flex-col gap-4 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Employees</h1>

                    <div className="flex gap-2">
                        <Button onClick={handleCreate}>
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

                {/* EMPTY STATE */}
                {employees.data.length === 0 && (
                    <div className="p-4 text-gray-500">No employees found.</div>
                )}

                {/* TABLE */}
                {employees.data.length > 0 && (
                    <EmployeeTable
                        data={employees.data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

                {/* PAGINATION */}
                <div className="flex justify-center gap-2">
                    {employees.links.map((link: any, i: number) => (
                        <Button
                            key={i}
                            disabled={!link.url}
                            onClick={() => {
                                if (link.url) {
                                    router.visit(link.url, {
                                        preserveState: true,
                                        preserveScroll: true,
                                    });
                                }
                            }}
                            className={`rounded border px-3 py-1 text-sm ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white hover:bg-gray-200'
                            } ${!link.url ? 'opacity-50' : ''}`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* MODAL */}
            <EmployeeForm
                key={selectedEmployee?.id ?? 'create'}
                show={showModal}
                employee={selectedEmployee}
                factories={factories}
                onClose={closeModal}
                onSuccess={() => {
                    closeModal();
                    router.reload(); // 🔥 THIS refreshes table instantly
                }}
            />
        </>
    );
}
