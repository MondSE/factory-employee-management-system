import { usePage } from '@inertiajs/react';

export default function FactoryShow() {
    const { factory } = usePage<any>().props;

    const employees = factory?.employees ?? [];

    return (
        <div style={{ padding: 20 }}>
            <h1>Factory Details</h1>

            {/* FACTORY INFO */}
            <div style={{ marginBottom: 20 }}>
                <p>
                    <b>Name:</b> {factory.factory_name}
                </p>
                <p>
                    <b>Location:</b> {factory.location}
                </p>
                <p>
                    <b>Email:</b> {factory.email ?? '-'}
                </p>
                <p>
                    <b>Website:</b> {factory.website ?? '-'}
                </p>
            </div>

            <hr />

            {/* EMPLOYEES */}
            <h2>Employees</h2>

            {employees.length === 0 ? (
                <p>No employees found</p>
            ) : (
                <table border={1} width="100%" cellPadding={10}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employees.map((emp: any) => (
                            <tr key={emp.id}>
                                <td>{emp.firstname}</td>
                                <td>{emp.lastname}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
