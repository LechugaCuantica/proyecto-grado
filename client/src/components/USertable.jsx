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

        <table border="1" cellPadding="10">

            <thead>

                <tr>

                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

                {

                    users.map(user => (

                        <tr key={user.document}>

                            <td>{user.document}</td>

                            <td>{user.name}</td>

                            <td>{user.lastName}</td>

                            <td>{user.email}</td>

                            <td>{user.phone}</td>

                            <td>{user.address}</td>

                            <td>

                                <button
                                    onClick={() => setEditUser(user)}
                                >
                                    Editar
                                </button>

                                {" "}

                                <button
                                    onClick={() => handleDelete(user.document)}
                                >
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}

export default UserTable;