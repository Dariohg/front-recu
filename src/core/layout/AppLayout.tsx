import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router';

type AppLayoutProps = {
    children: ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold">App React Clean Architecture</h1>
                        <nav>
                            <ul className="flex space-x-4">
                                <li>
                                    <Link
                                        to="/"
                                        className={`hover:text-blue-200 transition ${
                                            isActive('/') ? 'font-bold text-white' : 'text-blue-100'
                                        }`}
                                    >
                                        Notas
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/products"
                                        className={`hover:text-blue-200 transition ${
                                            isActive('/products') ? 'font-bold text-white' : 'text-blue-100'
                                        }`}
                                    >
                                        Productos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/dashboard"
                                        className={`hover:text-blue-200 transition ${
                                            isActive('/dashboard') ? 'font-bold text-white' : 'text-blue-100'
                                        }`}
                                    >
                                        Dashboard
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
            <main className="flex-grow">
                {children}
            </main>
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Clean Architecture Demo</p>
                </div>
            </footer>
        </div>
    );
};

export default AppLayout;