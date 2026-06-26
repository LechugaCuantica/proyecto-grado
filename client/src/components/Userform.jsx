import { useEffect, useState } from "react";
import api from "../api/api";

function UserForm({ loadUsers, editUser, setEditUser }) {

    const initialState = {
        document: "",
        name: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    };

    const [form, setForm] = useState(initialState);

    useEffect(() => {

        if (editUser) {

            setForm({
                ...editUser,
                password: ""
            });

        }

    }, [editUser]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editUser) {

                await api.put(`/dashboard/users/${editUser.document}`, form);

                alert("Usuario actualizado");

                setEditUser(null);

            } else {

                await api.post("/register", form);

                alert("Usuario registrado");

            }

            setForm(initialState);

            loadUsers();

        } catch (error) {

            console.log(error);

            alert("Ocurrió un error");

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Documento"
                name="document"
                value={form.document}
                onChange={handleChange}
                disabled={editUser}
            />

            <br />

            <input
                type="text"
                placeholder="Nombre"
                name="name"
                value={form.name}
                onChange={handleChange}
            />

            <br />

            <input
                type="text"
                placeholder="Apellido"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
            />

            <br />

            <input
                type="email"
                placeholder="Correo"
                name="email"
                value={form.email}
                onChange={handleChange}
            />

            <br />

            <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={form.password}
                onChange={handleChange}
            />

            <br />

            <input
                type="text"
                placeholder="Teléfono"
                name="phone"
                value={form.phone}
                onChange={handleChange}
            />

            <br />

            <input
                type="text"
                placeholder="Dirección"
                name="address"
                value={form.address}
                onChange={handleChange}
            />

            <br /><br />

            <button type="submit">

                {editUser ? "Actualizar" : "Registrar"}

            </button>

        </form>

    );

}

export default UserForm;