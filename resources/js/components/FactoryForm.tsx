import { useState } from 'react';
import { router } from '@inertiajs/react';

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

    const [form, setForm] = useState<Factory>(emptyForm);
    const [loading, setLoading] = useState(false);

    // 🔥 KEY FIX: reset form WITHOUT useEffect
    const openForm = () => {
        setForm(
            factory
                ? {
                      factory_name: factory.factory_name ?? '',
                      location: factory.location ?? '',
                      email: factory.email ?? '',
                  }
                : emptyForm,
        );
    };

    // trigger reset when opening modal
    if (show && form.factory_name === '' && factory) {
        openForm();
    }

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

    const handleClose = () => {
        setForm(emptyForm); // reset safely
        onClose();
    };

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
                            onClick={handleClose}
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
