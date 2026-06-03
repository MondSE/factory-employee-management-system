import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

type Factory = {
    id: number;
    factory_name: string;
};

type Employee = {
    id?: number;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
    factory_id?: number;
};

type Props = {
    show: boolean;
    employee: Employee | null;
    factories: Factory[];
    onClose: () => void;
    onSuccess?: () => void;
};

export default function EmployeeForm({
    show,
    employee,
    factories,
    onClose,
    onSuccess,
}: Props) {
    const isEdit = !!employee?.id;

    const emptyForm: Employee = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        factory_id: undefined,
    };

    const [form, setForm] = useState<Employee>(emptyForm);
    const [loading, setLoading] = useState(false);

    // Sync employee → form
    useEffect(() => {
        if (employee) {
            setForm({
                firstname: employee.firstname ?? '',
                lastname: employee.lastname ?? '',
                email: employee.email ?? '',
                phone: employee.phone ?? '',
                factory_id: employee.factory_id ?? undefined,
            });
        } else {
            setForm(emptyForm);
        }
    }, [employee?.id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]:
                name === 'factory_id'
                    ? value
                        ? Number(value)
                        : undefined
                    : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const options = {
            onFinish: () => {
                setLoading(false);
                onClose();
                onSuccess?.(); // ✅ FIXED
            },
        };

        if (isEdit && employee?.id) {
            router.put(`/employees/${employee.id}`, form, options);
        } else {
            router.post('/employees', form, options);
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
                <h2 className="mb-4 text-lg font-bold text-gray-700">
                    {isEdit ? 'Edit Employee' : 'Create Employee'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                        placeholder="First name"
                    />

                    <input
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                        placeholder="Last name"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                        placeholder="Email"
                    />

                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                        placeholder="Phone"
                    />

                    <select
                        name="factory_id"
                        value={form.factory_id ?? ''}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                    >
                        <option value="">Select factory</option>
                        {factories.map((factory) => (
                            <option key={factory.id} value={factory.id}>
                                {factory.factory_name}
                            </option>
                        ))}
                    </select>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded bg-gray-300 px-3 py-1"
                        >
                            Cancel
                        </button>

                        <button
                            disabled={loading}
                            type="submit"
                            className="rounded bg-blue-600 px-3 py-1 text-white"
                        >
                            {loading
                                ? 'Saving...'
                                : isEdit
                                  ? 'Update'
                                  : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
