import { Head, usePage, router } from '@inertiajs/react';
import { useRef, useState } from 'react';
import FactoryForm from '@/components/FactoryForm';
import FactoryTable from '@/components/FactoryTable';
import { Button } from '@/components/ui/button';
import { BadgePlus } from 'lucide-react';

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
    const [showModal, setShowModal] = useState(false);
    const [selectedFactory, setSelectedFactory] = useState<Factory | null>(
        null,
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // SEARCH
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setLoading(true);
            setError(null);

            router.get(
                '/factories',
                { search: value, page: 1 },
                {
                    preserveState: true,
                    replace: true,
                    onFinish: () => setLoading(false),
                    onError: () => {
                        setError('Failed to load factories');
                        setLoading(false);
                    },
                },
            );
        }, 400);
    };

    // DELETE
    const handleDelete = (id: number) => {
        if (!confirm('Delete this factory?')) return;

        setLoading(true);
        setError(null);

        router.delete(`/factories/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setLoading(false);
                router.reload({ only: ['factories'] });
            },
            onError: () => {
                setError('Failed to delete factory');
                setLoading(false);
            },
        });
    };

    const handleCreate = () => {
        setSelectedFactory(null);
        setShowModal(true);
    };

    const handleEdit = (factory: Factory) => {
        setSelectedFactory(factory);
        setShowModal(true);
    };

    return (
        <>
            <Head title="Factories" />

            <div className="flex flex-col gap-4 p-4">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Factories</h1>

                    <div className="flex gap-2">
                        <Button
                            onClick={handleCreate}
                            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-800"
                        >
                            <BadgePlus />
                        </Button>

                        <input
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search factories..."
                            className="w-64 rounded-md border px-3 py-2 text-sm"
                        />
                    </div>
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

                {/* ERROR */}
                {error && (
                    <div className="rounded border border-red-300 bg-red-50 p-3 text-red-600">
                        {error}
                    </div>
                )}

                {/* TABLE */}
                <FactoryTable
                    data={data}
                    loading={loading}
                    error={error}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                />

                {/* PAGINATION */}
                <div className="flex flex-wrap justify-center gap-2">
                    {links.map((link: any, index: number) => (
                        <Button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
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
            <FactoryForm
                key={selectedFactory?.id ?? 'create'} // 🔥 FIX IS HERE
                show={showModal}
                factory={selectedFactory}
                onClose={() => {
                    setShowModal(false);
                    setSelectedFactory(null);
                }}
            />
        </>
    );
}
