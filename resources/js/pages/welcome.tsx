import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Factory Manager" />

            <div className="min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
                {/* NAVBAR */}
                <header className="flex items-center justify-between border-b px-6 py-4 dark:border-gray-800">
                    <h1 className="text-xl font-bold">FactoryManager</h1>

                    <nav className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="px-4 py-2 hover:underline"
                                >
                                    Log in
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* HERO SECTION */}
                <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
                    <h2 className="mb-4 text-4xl font-bold">
                        Manage Factories & Employees Easily
                    </h2>

                    <p className="mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
                        A simple Laravel + React (Inertia) system to track
                        factories, employees, and activity logs in real-time.
                    </p>

                    <div className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="rounded bg-black px-6 py-3 text-white dark:bg-white dark:text-black"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <Link
                                href={login()}
                                className="rounded bg-black px-6 py-3 text-white dark:bg-white dark:text-black"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </section>

                {/* FEATURES */}
                <section className="mx-auto grid max-w-6xl gap-6 px-6 py-16 md:grid-cols-3">
                    <div className="rounded-lg border p-6">
                        <h3 className="mb-2 font-semibold">
                            Factory Management
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create, update, and organize factories easily.
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <h3 className="mb-2 font-semibold">
                            Employee Tracking
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage employees under each factory.
                        </p>
                    </div>

                    <div className="rounded-lg border p-6">
                        <h3 className="mb-2 font-semibold">Activity Logs</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Track model changes (create, update, delete).
                        </p>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="border-t py-10 text-center text-sm text-gray-500 dark:border-gray-800">
                    © {new Date().getFullYear()} AlmondTuazon. All rights
                    reserved.
                </footer>
            </div>
        </>
    );
}
