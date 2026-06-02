import { Head, usePage, router } from '@inertiajs/react';
import { useState } from 'react';

type Factory = {
    id: number;
    factory_name: string;
    location: string;
    email?: string;
    website?: string;
};

export default function FactoriesIndex() {
    const { factories } = usePage<any>().props;

    const data: Factory[] = factories?.data ?? [];
    const links = factories?.links ?? [];

    const [search, setSearch] = useState('');

    let timeout: any;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        clearTimeout(timeout);

        timeout = setTimeout(() => {
            router.get(
                '/factories',
                { search: value, page: 1 },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 400);
    };

    const handleDelete = (id: number) => {
        if (!confirm('Delete this factory?')) return;

        router.delete(`/factories/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                router.reload({ only: ['factories'] });
            },
        });
    };

    return (
        <>
            <Head title="Factories" />

            <div className="flex flex-col gap-4 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Factories</h1>

                    <input
                        value={search}
                        onChange={handleSearch}
                        placeholder="Search factories..."
                        className="w-64 rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                {/* CARDS */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-gray-500">Total Factories</p>
                        <p className="text-2xl font-bold">{factories.total}</p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-gray-500">Current Page</p>
                        <p className="text-2xl font-bold">
                            {factories.current_page}
                        </p>
                    </div>

                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-gray-500">Last Page</p>
                        <p className="text-2xl font-bold">
                            {factories.last_page}
                        </p>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-hidden rounded-xl border">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-left">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Location</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">
                                        No factories found
                                    </td>
                                </tr>
                            ) : (
                                data.map((f) => (
                                    <tr
                                        key={f.id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-3 font-medium">
                                            {f.factory_name}
                                        </td>

                                        <td className="p-3">{f.location}</td>

                                        <td className="p-3">
                                            {f.email ?? '-'}
                                        </td>

                                        <td className="flex gap-2 p-3">
                                            <button
                                                onClick={() =>
                                                    router.visit(
                                                        `/factories/${f.id}`,
                                                    )
                                                }
                                                className="rounded bg-green-500 px-3 py-1 text-white"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    router.visit(
                                                        `/factories/${f.id}/edit`,
                                                    )
                                                }
                                                className="rounded bg-yellow-500 px-3 py-1 text-white"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(f.id)
                                                }
                                                className="rounded bg-red-500 px-3 py-1 text-white"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION */}
                <div className="flex flex-wrap justify-center gap-2">
                    {links.map((link: any, index: number) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`rounded border px-3 py-1 text-sm ${
                                link.active
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white hover:bg-gray-100'
                            } ${!link.url ? 'opacity-50' : ''}`}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
