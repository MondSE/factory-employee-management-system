import { Head, usePage, router } from '@inertiajs/react';

type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
};

export default function FactoryShow() {
    const { factory } = usePage<any>().props;

    const employees = factory?.employees;

    if (!factory) {
        return (
            <div className="p-6 text-center text-gray-500">
                Loading factory...
            </div>
        );
    }

    const goToPage = (url: string | null) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    return (
        <>
            <Head title="Factory Details" />

            <div className="flex max-w-6xl flex-col gap-6 p-6">
                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Factory Details</h1>

                    <div className="flex gap-2">
                        <button
                            onClick={() =>
                                router.visit(`/factories/${factory.id}/edit`)
                            }
                            className="rounded bg-yellow-500 px-4 py-2 text-white"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => router.visit('/factories')}
                            className="rounded bg-gray-800 px-4 py-2 text-white"
                        >
                            Back
                        </button>
                    </div>
                </div>

                {/* FACTORY CARDS */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Factory Name</p>
                        <p className="text-lg font-semibold">
                            {factory.factory_name}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="text-lg font-semibold">
                            {factory.location}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-lg font-semibold">
                            {factory.email ?? '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Website</p>
                        <p className="text-lg font-semibold">
                            {factory.website ?? '-'}
                        </p>
                    </div>
                </div>

                {/* EMPLOYEE SUMMARY */}
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border p-4">
                        <p className="text-sm text-gray-500">Total Employees</p>
                        <p className="text-2xl font-bold">
                            {employees?.total ?? 0}
                        </p>
                    </div>
                </div>

                {/* EMPLOYEE TABLE */}
                <div className="overflow-hidden rounded-xl border">
                    <div className="border-b p-4">
                        <h2 className="text-lg font-semibold">Employees</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="text-center">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Phone</th>
                                </tr>
                            </thead>

                            <tbody>
                                {employees?.data?.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="p-4 text-center text-gray-500"
                                        >
                                            No employees found
                                        </td>
                                    </tr>
                                ) : (
                                    employees?.data?.map((emp: Employee) => (
                                        <tr
                                            key={emp.id}
                                            className="border-t text-center hover:bg-gray-50"
                                        >
                                            <td className="p-3 font-medium">
                                                {emp.firstname} {emp.lastname}
                                            </td>
                                            <td className="p-3">
                                                {emp.email ?? '-'}
                                            </td>
                                            <td className="p-3">
                                                {emp.phone ?? '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* PAGINATION */}
                    {employees?.links && (
                        <div className="flex items-center justify-between p-4">
                            <button
                                disabled={!employees.prev_page_url}
                                onClick={() =>
                                    goToPage(employees.prev_page_url)
                                }
                                className="rounded border px-3 py-1 disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <p className="text-sm text-gray-500">
                                Page {employees.current_page} of{' '}
                                {employees.last_page}
                            </p>

                            <button
                                disabled={!employees.next_page_url}
                                onClick={() =>
                                    goToPage(employees.next_page_url)
                                }
                                className="rounded border px-3 py-1 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
