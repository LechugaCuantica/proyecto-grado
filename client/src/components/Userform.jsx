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
        <div className="bg-white shadow sm:rounded-lg border border-gray-200 p-6 mb-8">
            <div className="mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    {editUser ? "Editar Usuario" : "Registrar Nuevo Usuario"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    {editUser ? "Modifique los datos del usuario seleccionado." : "Complete todos los campos para registrar un nuevo usuario."}
                </p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campo: Documento */}
                    <div>
                        <label htmlFor="form_document" className="block text-sm font-medium text-gray-700 mb-1">
                            Documento de identidad
                        </label>
                        <input
                            id="form_document"
                            type="text"
                            placeholder="123456789"
                            name="document"
                            value={form.document}
                            onChange={handleChange}
                            disabled={editUser}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Campo: Teléfono */}
                    <div>
                        <label htmlFor="form_phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <input
                            id="form_phone"
                            type="text"
                            placeholder="3001234567"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Campo: Nombre */}
                    <div>
                        <label htmlFor="form_name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            id="form_name"
                            type="text"
                            placeholder="Juan"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Campo: Apellido */}
                    <div>
                        <label htmlFor="form_lastName" className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <input
                            id="form_lastName"
                            type="text"
                            placeholder="Pérez"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Campo: Correo */}
                    <div>
                        <label htmlFor="form_email" className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            id="form_email"
                            type="email"
                            placeholder="tu@ejemplo.com"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Campo: Contraseña */}
                    <div>
                        <label htmlFor="form_password" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            id="form_password"
                            type="password"
                            placeholder={editUser ? "Dejar en blanco para mantener la actual" : "••••••••"}
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required={!editUser}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    {/* Campo: Dirección */}
                    <div className="md:col-span-2">
                        <label htmlFor="form_address" className="block text-sm font-medium text-gray-700 mb-1">
                            Dirección
                        </label>
                        <input
                            id="form_address"
                            type="text"
                            placeholder="Calle 10 #45-12"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    {editUser && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditUser(null);
                                setForm(initialState);
                            }}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer"
                    >
                        {editUser ? "Actualizar Usuario" : "Registrar Usuario"}
                    </button>
                </div>
            </form>
        </div>
    );

}

export default UserForm;