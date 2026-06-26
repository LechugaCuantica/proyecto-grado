import api from "../api/api";

function UserTable({ users, loadUsers, setEditUser }) {

    const handleDelete = async (document) => {

        const confirmDelete = window.confirm("¿Eliminar usuario?");

        if (!confirmDelete) return;

        try {

            await api.delete(`/dashboard/users/${document}`);

            alert("Usuario eliminado");

            loadUsers();

        } catch (error) {

            console.log(error);

            alert("Error al eliminar");

        }

    };

    return (
        <div className="bg-white shadow sm:rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Listado de Usuarios</h3>
                <p className="mt-1 text-sm text-gray-500">Listado completo de usuarios registrados en el sistema.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Documento</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Apellido</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Correo</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Teléfono</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Dirección</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="px-6 py-10 text-center text-sm text-gray-500">
                                    No hay usuarios registrados.
                                </td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.document} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.document}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                                        <button
                                            onClick={() => setEditUser(user)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4 font-medium transition-colors cursor-pointer"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.document)}
                                            className="text-red-600 hover:text-red-900 font-medium transition-colors cursor-pointer"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default UserTable;