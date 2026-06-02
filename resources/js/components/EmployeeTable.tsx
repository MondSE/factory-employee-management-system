type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
    factory?: {
        factory_name: string;
    };
};

type Props = {
    data: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
};

export default function EmployeeTable({ data, onEdit, onDelete }: Props) {
    return (
        <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
                <thead className="text-center">
                    <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Phone</th>
                        <th className="p-3">Factory</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="p-4 text-center">
                                No employees found
                            </td>
                        </tr>
                    ) : (
                        data.map((e) => (
                            <tr
                                key={e.id}
                                className="border-t hover:bg-gray-500"
                            >
                                <td className="p-3 font-medium">
                                    {e.firstname} {e.lastname}
                                </td>

                                <td className="p-3">{e.email ?? '-'}</td>
                                <td className="p-3">{e.phone ?? '-'}</td>

                                <td className="p-3">
                                    {e.factory?.factory_name ?? 'No Factory'}
                                </td>

                                <td className="flex gap-2 p-3">
                                    <button
                                        onClick={() => onEdit(e)}
                                        className="rounded bg-yellow-500 px-3 py-1 text-white"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => onDelete(e.id)}
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
    );
}
