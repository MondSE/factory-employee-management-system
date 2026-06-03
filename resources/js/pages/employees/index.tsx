import { Head, usePage } from '@inertiajs/react';
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

    // 🔥 LOCAL STATE (dynamic list)
    const [employeesData, setEmployeesData] = useState(employees);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState('');
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

    // 🔥 FETCH FUNCTION (NO PAGE RELOAD)
    const fetchEmployees = async (params: {
        search?: string;
        page?: number;
    }) => {
        try {
            setLoading(true);
            setError(null);

            const query = new URLSearchParams();

            if (params.search) query.append('search', params.search);
            if (params.page) query.append('page', String(params.page));

            const res = await fetch(`/api/employees?${query.toString()}`, {
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to load employees');
            }

            const json = await res.json();

            // assuming backend returns same structure
            setEmployeesData(json.employees);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    // 🔥 SEARCH (DEBOUNCED)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            fetchEmployees({ search: value, page: 1 });
        }, 400);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this employee?')) return;

        try {
            setError(null);

            const res = await fetch(`/api/employees/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN':
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute('content') || '',
                },
            });

            if (!res.ok) throw new Error();

            // 🔥 refresh list after delete
            fetchEmployees({ search });
        } catch {
            setError('Failed to delete employee');
        }
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

    const data = employeesData?.data ?? [];
    const links = employeesData?.links ?? [];

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

                {/* LOADING */}
                {loading && (
                    <div className="p-3 text-blue-600">
                        Loading employees...
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div className="rounded border border-red-300 bg-red-50 p-3 text-red-600">
                        ⚠️ {error}
                    </div>
                )}

                {/* EMPTY STATE */}
                {!loading && data.length === 0 && (
                    <div className="p-4 text-gray-500">No employees found.</div>
                )}

                {/* TABLE */}
                {!loading && data.length > 0 && (
                    <EmployeeTable
                        data={data}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}

                {/* PAGINATION */}
                <div className="flex justify-center gap-2">
                    {links.map((link: any, i: number) => (
                        <Button
                            key={i}
                            disabled={!link.url}
                            onClick={() => {
                                if (link.url) {
                                    const url = new URL(link.url);
                                    const page = url.searchParams.get('page');

                                    fetchEmployees({
                                        search,
                                        page: Number(page),
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
                factories={factories ?? []}
                onClose={closeModal}
            />
        </>
    );
}
