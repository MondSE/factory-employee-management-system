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
    const [form, setForm] = useState(emptyForm);

    // ✅ safer sync (prevents unnecessary re-render loops in CI lint)
    useEffect(() => {
        if (!show) return;

        if (factory) {
            const nextForm = {
                factory_name: factory.factory_name ?? '',
                location: factory.location ?? '',
                email: factory.email ?? '',
                website: factory.website ?? '',
            };

            setForm((prev) => {
                // avoid setting same state again (lint-safe)
                const isSame =
                    prev.factory_name === nextForm.factory_name &&
                    prev.location === nextForm.location &&
                    prev.email === nextForm.email &&
                    prev.website === nextForm.website;

                return isSame ? prev : nextForm;
            });
        } else {
            setForm(emptyForm);
        }
    }, [factory?.id, show]);

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

        // Inertia doesn't return promise by default → use events
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Factory Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Factory Name
                        </label>
                        <Input
                            className="text-black"
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
                            className="text-black"
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
                            className="text-black"
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
                            className="text-black"
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
