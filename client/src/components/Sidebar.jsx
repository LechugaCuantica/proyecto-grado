import { NavLink, useNavigate } from 'react-router-dom';

export function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("¿Estás seguro de que deseas cerrar sesión?");

        if (confirmLogout) {
            localStorage.removeItem("token");
            navigate('/');
        }
    };

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4 shrink-0">
            {/* Header / Logo */}
            <div>
                <div className="flex items-center gap-3 px-2 mb-8">
                    <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                        U
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">AdminPanel</span>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M7.5 9.75l4.5-4.5 4.5 4.5" />
                        </svg>
                        <span>Inicio</span>
                    </NavLink>

                    <NavLink
                        to="/dashboard/users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                ? 'bg-indigo-50 text-indigo-700'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 1 8.625 21c-2.3 0-4.436-.684-6.22-1.857L2.1 19.127m15.8-3.069a8.944 8.944 0 0 0-2.619-2.07 4.125 4.125 0 0 0-7.533 0 8.944 8.944 0 0 0-2.62 2.07m15.812-4.73a4.836 4.836 0 0 0-1.417-3.223 4.822 4.822 0 0 0-3.38-1.484 4.825 4.825 0 0 0-3.385 1.484A4.836 4.836 0 0 0 6.627 9.75M8.25 12h7.5" />
                        </svg>
                        <span>Usuarios</span>
                    </NavLink>
                </nav>
            </div>

            {/* Logout Section */}
            <div className="border-t border-gray-200 pt-4">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 w-full text-left cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                    </svg>
                    <span>Cierre de sesión</span>
                </button>
            </div>
        </aside>
    );
}
