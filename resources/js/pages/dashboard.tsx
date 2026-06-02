import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props as any;

    return (
        <>
            <div className="flex min-h-[80vh] items-center justify-center p-6">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Welcome back{auth?.user ? `, ${auth.user.name}` : ''} 👋
                    </h1>

                    <p className="text-lg text-gray-500">
                        You are now inside the Factory Management System
                    </p>
                </div>
            </div>
        </>
    );
}
