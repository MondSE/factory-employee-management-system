import { Input } from '@/components/ui/input';
import { Head, useForm, usePage, router } from '@inertiajs/react';

export default function EditFactory() {
    const { factory } = usePage<any>().props;

    const { data, setData, put, processing, errors } = useForm({
        factory_name: factory.factory_name || '',
        location: factory.location || '',
        email: factory.email || '',
        website: factory.website || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        put(`/factories/${factory.id}`, {
            onSuccess: () => {
                router.visit('/factories');
            },
        });
    };

    return (
        <>
            <Head title="Edit Factory" />

            <div className="flex justify-center p-6">
                <div className="w-full max-w-xl rounded-xl border p-6 shadow-sm">
                    <h1 className="mb-4 text-xl font-bold">Edit Factory</h1>

                    <form onSubmit={submit} className="space-y-4">
                        {/* Factory Name */}
                        <div>
                            <label className="text-sm font-medium">
                                Factory Name
                            </label>
                            <Input
                                type="text"
                                value={data.factory_name}
                                onChange={(e) =>
                                    setData('factory_name', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                            />
                            {errors.factory_name && (
                                <p className="text-sm text-red-500">
                                    {errors.factory_name}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="text-sm font-medium">
                                Location
                            </label>
                            <Input
                                type="text"
                                value={data.location}
                                onChange={(e) =>
                                    setData('location', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                            />
                            {errors.location && (
                                <p className="text-sm text-red-500">
                                    {errors.location}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                            />
                        </div>

                        {/* Website */}
                        <div>
                            <label className="text-sm font-medium">
                                Website
                            </label>
                            <Input
                                type="text"
                                value={data.website}
                                onChange={(e) =>
                                    setData('website', e.target.value)
                                }
                                className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                {processing ? 'Updating...' : 'Update Factory'}
                            </button>

                            <button
                                type="button"
                                onClick={() => router.visit('/factories')}
                                className="rounded border px-4 py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
