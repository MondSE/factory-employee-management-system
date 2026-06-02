import { useEffect, useState } from 'react';

type Factory = {
    id: number;
    factory_name: string;
    location: string;
    email?: string;
    website?: string;
};

export default function Factories() {
    const [factories, setFactories] = useState<Factory[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            fetchFactories();
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        fetchFactories();
    }, []);

    const fetchFactories = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`/api/factories?search=${search}`);

            if (!res.ok) throw new Error('Failed to fetch factories');

            const json = await res.json();
            setFactories(json.data);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        }

        setLoading(false);
    };

    const deleteFactory = async (id: number) => {
        const confirmDelete = confirm('Delete this factory?');
        if (!confirmDelete) return;

        setLoading(true);

        try {
            const res = await fetch(`/api/factories/${id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error('Delete failed');

            // refresh list after delete
            fetchFactories();
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            {/* HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>Factories</h1>
            </div>

            {/* SEARCH */}
            <input
                type="text"
                placeholder="Search factories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: '10px',
                    width: '300px',
                    marginBottom: '20px',
                }}
            />

            {/* STATES */}
            {loading && <p>Loading factories...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && factories.length === 0 && <p>No factories found.</p>}

            {/* TABLE */}
            <table width="100%" cellPadding={10} border={1}>
                <thead>
                    <tr>
                        <th>Factory Name</th>
                        <th>Location</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {factories.map((factory) => (
                        <tr key={factory.id}>
                            <td>{factory.factory_name}</td>
                            <td>{factory.location}</td>
                            <td>{factory.email || '-'}</td>
                            <td>{factory.website || '-'}</td>
                            <td>
                                <button
                                    onClick={() => deleteFactory(factory.id)}
                                    style={{ color: 'red' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
