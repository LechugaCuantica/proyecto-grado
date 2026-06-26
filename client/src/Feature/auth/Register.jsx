import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterApp = () => {
    const navigate = useNavigate();

    // 1. Añadidos los campos solicitados al estado inicial
    const [datos, setDatos] = useState({
        document: '',
        name: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const Formulario = async (e) => {
        e.preventDefault();

        try {
            console.log(datos);

            const response = await axios.post(
                "http://localhost:3000/register",
                datos
            );

            if (response.data) {
                navigate('/');
                alert(response.data.message);

            } else {
                alert(response.data.message);
            }

        } catch (error) {
            console.log(error);
            console.log(error.response);

            alert(error.response?.data?.message || "Error en el registro");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Crea tu cuenta
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    ¿Ya tienes cuenta?{' '}
                    <a onClick={() => navigate('/')} className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer">
                        Inicia sesión
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
                    <form className="space-y-6" onSubmit={Formulario}>

                        {/* Campo: Documento */}
                        <div>
                            <label htmlFor="document" className="block text-sm font-medium text-gray-700">
                                Documento de identidad
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => setDatos({ ...datos, document: e.target.value })}
                                    id="document"
                                    name="document"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="123456789"
                                />
                            </div>
                        </div>

                        {/* Campo: Nombre */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Nombre
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => setDatos({ ...datos, name: e.target.value })}
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Juan"
                                />
                            </div>
                        </div>

                        {/* Campo: Apellido */}
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                                Apellido
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => setDatos({ ...datos, lastName: e.target.value })}
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Pérez"
                                />
                            </div>
                        </div>

                        {/* Campo: Teléfono */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                Teléfono
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => setDatos({ ...datos, phone: e.target.value })}
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="3001234567"
                                />
                            </div>
                        </div>

                        {/* Campo: Dirección */}
                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                Dirección
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => setDatos({ ...datos, address: e.target.value })}
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Calle 10 #45-12"
                                />
                            </div>
                        </div>

                        {/* Campo: Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo electrónico
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => setDatos({ ...datos, email: e.target.value })}
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="tu@ejemplo.com"
                                />
                            </div>
                        </div>

                        {/* Campo: Contraseña */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Contraseña
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => setDatos({ ...datos, password: e.target.value })}
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {/* Botón de enviar */}
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterApp;