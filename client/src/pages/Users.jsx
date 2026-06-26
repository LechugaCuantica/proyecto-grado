import { useEffect, useState } from "react";
import api from "../api/api";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import "../index.css";

function Users() {

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    const loadUsers = async () => {
        try {

            const res = await api.get("/dashboard/users");

            setUsers(res.data.users);

        } catch (error) {

            console.log(error);

        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Gestión de Usuarios</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Administra y gestiona las cuentas de usuario de la plataforma. Crea nuevos usuarios, actualiza sus datos o elimínalos.
                </p>
            </div>

            <UserForm
                loadUsers={loadUsers}
                editUser={editUser}
                setEditUser={setEditUser}
            />

            <UserTable
                users={users}
                loadUsers={loadUsers}
                setEditUser={setEditUser}
            />
        </div>
    );
}

export default Users;