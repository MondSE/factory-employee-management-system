import { useState } from 'react';
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

    // 🔥 initialize form based on factory (runs only on mount because of key)
    const [form, setForm] = useState(() => {
        if (!factory) return emptyForm;

        return {
            factory_name: factory.factory_name ?? '',
            location: factory.location ?? '',
            email: factory.email ?? '',
            website: factory.website ?? '',
        };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleClose = () => {
        setForm(emptyForm);
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const request = factory?.id
            ? router.put(`/factories/${factory.id}`, form)
            : router.post('/factories', form);

        router.on('finish', () => {
            setLoading(false);
            handleClose();
        });

        request;
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-lg font-bold text-gray-700">
                    {factory ? 'Edit Factory' : 'Add Factory'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4 text-black">
                    {/* Factory Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Factory Name
                        </label>
                        <Input
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
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={handleClose}
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
