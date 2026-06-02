import { router } from '@inertiajs/react';
import { Eye, FilePenLine, Trash } from 'lucide-react';
import { Button } from './ui/button';

type Factory = {
    id: number;
    factory_name: string;
    location: string;
    website?: string;
    email?: string;
};

type Props = {
    data: Factory[];
    loading?: boolean;
    error?: string | null;
    onDelete: (id: number) => void;
    onEdit: (factory: Factory) => void;
};

export default function FactoryTable({
    data,
    loading = false,
    error = null,
    onDelete,
    onEdit,
}: Props) {
    return (
        <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
                <thead className="text-center">
                    <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Location</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Website</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {/* LOADING STATE */}
                    {loading ? (
                        <tr>
                            <td
                                colSpan={5}
                                className="p-6 text-center text-blue-500"
                            >
                                Loading factories...
                            </td>
                        </tr>
                    ) : error ? (
                        /* ERROR STATE */
                        <tr>
                            <td
                                colSpan={5}
                                className="p-6 text-center text-red-500"
                            >
                                {error}
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        /* EMPTY STATE */
                        <tr>
                            <td
                                colSpan={5}
                                className="p-6 text-center text-gray-500"
                            >
                                No factories found
                            </td>
                        </tr>
                    ) : (
                        /* DATA TABLE */
                        data.map((f) => (
                            <tr
                                key={f.id}
                                className="border-t text-center hover:bg-gray-500"
                            >
                                {/* NAME */}
                                <td className="p-3 font-medium">
                                    {f.factory_name}
                                </td>

                                {/* LOCATION */}
                                <td className="p-3">{f.location}</td>

                                {/* EMAIL */}
                                <td className="p-3">{f.email ?? '-'}</td>

                                {/* WEBSITE */}
                                <td className="p-3">
                                    {f.website
                                        ? f.website.length > 30
                                            ? f.website.substring(0, 30) + '...'
                                            : f.website
                                        : '-'}
                                </td>

                                {/* ACTIONS */}
                                <td className="p-3">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* VIEW */}
                                        <Button
                                            onClick={() =>
                                                router.visit(
                                                    `/factories/${f.id}`,
                                                )
                                            }
                                            className="rounded bg-green-500 px-3 py-1 text-white hover:bg-green-700"
                                        >
                                            <Eye size={16} />
                                        </Button>

                                        {/* EDIT */}
                                        <Button
                                            onClick={() => onEdit(f)}
                                            className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-700"
                                        >
                                            <FilePenLine size={16} />
                                        </Button>

                                        {/* DELETE */}
                                        <Button
                                            onClick={() => onDelete(f.id)}
                                            className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-700"
                                        >
                                            <Trash size={16} />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
