import { useState } from 'react';
import { router } from '@inertiajs/react';
import type { Employee } from '@/types/employee';

type Factory = {
    id?: number;
    factory_name: string;
    location: string;
    email: string;
};

type Props = {
    show: boolean;
    factory: Factory | null;
    onClose: () => void;
    onSuccess?: () => void;
};

const emptyForm: Factory = {
    factory_name: '',
    location: '',
    email: '',
};

export default function FactoryForm({
    show,
    factory,
    onClose,
    onSuccess,
}: Props) {
    const isEdit = !!factory?.id;

    // Key fix: initialize state only once
    const [form, setForm] = useState<Factory>(emptyForm);
    const [loading, setLoading] = useState(false);

    // IMPORTANT: no useEffect anymore (fixes ESLint warning completely)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setForm({
            factory_name: factory?.factory_name ?? '',
            location: factory?.location ?? '',
            email: factory?.email ?? '',
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const options = {
            onFinish: () => {
                setLoading(false);
                onClose();
                onSuccess?.();
            },
        };

        if (isEdit && factory?.id) {
            router.put(`/factories/${factory.id}`, form, options);
        } else {
            router.post('/factories', form, options);
        }
    };

    // FIX: reset form when modal opens/closes or factory changes
    // instead of useEffect (avoids ESLint warning)
    const handleOpen = () => {
        if (factory) {
            setForm({
                factory_name: factory.factory_name ?? '',
                location: factory.location ?? '',
                email: factory.email ?? '',
            });
        } else {
            setForm(emptyForm);
        }
    };

    // trigger reset when component becomes visible
    if (show && form.factory_name === '' && factory) {
        handleOpen();
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-lg">
                <h2 className="mb-4 text-lg font-bold text-gray-700">
                    {isEdit ? 'Edit Factory' : 'Create Factory'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="factory_name"
                        value={form.factory_name}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                        placeholder="Factory name"
                    />

                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                        placeholder="Location"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full rounded border p-2 text-gray-700"
                        placeholder="Email"
                    />

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded bg-gray-300 px-3 py-1"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
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
