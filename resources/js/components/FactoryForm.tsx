import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Input } from './ui/input';

type Factory = {
    id: number;
    factory_name: string;
    location: string;
    email?: string;
    website?: string;
};

type Props = {
    show: boolean;
    onClose: () => void;
    factory: Factory | null;
};

const emptyForm = {
    factory_name: '',
    location: '',
    email: '',
    website: '',
};

export default function FactoryForm({ show, onClose, factory }: Props) {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState(() => ({
        factory_name: factory?.factory_name ?? '',
        location: factory?.location ?? '',
        email: factory?.email ?? '',
        website: factory?.website ?? '',
    }));

    // ✅ Reset / fill form when modal opens
    useEffect(() => {
        if (!show) return;

        if (factory) {
            setForm({
                factory_name: factory.factory_name ?? '',
                location: factory.location ?? '',
                email: factory.email ?? '',
                website: factory.website ?? '',
            });
        } else {
            setForm(emptyForm);
        }
    }, [show, factory]);

    if (!show) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (factory?.id) {
            router.put(`/factories/${factory.id}`, form, {
                preserveScroll: true,
                onFinish: () => setLoading(false),
                onSuccess: () => {
                    onClose();
                    router.reload({ only: ['factories'] });
                },
            });
        } else {
            router.post('/factories', form, {
                preserveScroll: true,
                onFinish: () => setLoading(false),
                onSuccess: () => {
                    setForm(emptyForm);
                    onClose();
                    router.reload({ only: ['factories'] });
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bold text-gray-700">
                    {factory ? 'Edit Factory' : 'Add Factory'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Factory Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Factory Name
                        </label>
                        <Input
                            className="text-gray-700"
                            name="factory_name"
                            value={form.factory_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <Input
                            className="text-gray-700"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            className="text-gray-700"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Website */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Website
                        </label>
                        <Input
                            className="text-gray-700"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded border px-4 py-2 text-gray-700"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`rounded px-4 py-2 text-white ${
                                loading
                                    ? 'cursor-not-allowed bg-blue-400'
                                    : 'bg-blue-600'
                            }`}
                        >
                            {loading
                                ? 'Saving...'
                                : factory
                                  ? 'Update'
                                  : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
