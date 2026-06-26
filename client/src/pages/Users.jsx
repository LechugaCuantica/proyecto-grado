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
        <>
            <h1>Crudsito mamalon</h1>

            <UserForm
                loadUsers={loadUsers}
                editUser={editUser}
                setEditUser={setEditUser}
            />

            <hr />

            <UserTable
                users={users}
                loadUsers={loadUsers}
                setEditUser={setEditUser}
            />
        </>
    );
}

export default Users;