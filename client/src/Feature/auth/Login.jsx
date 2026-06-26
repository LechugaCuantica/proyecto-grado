import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginApp = () => {
    const navigate = useNavigate();

    const [datos, setDatos] = useState({
        email: '',
        password: ''

    })

    const Formulario = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', datos);
            if (response.status === 200) {
                alert("¡Ingreso correcto!");
                navigate('/dashboard');
            }
        } catch (error) {
            alert(error?.response?.data?.message || "Error al iniciar sesión");
            console.log("Error al iniciar sesión: ", error);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Título de la app */}
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Inicia sesión en tu cuenta
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <a onClick={() => navigate('/Register')} className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer">
                        Regístrate aquí
                    </a>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
                    <form className="space-y-6" onSubmit={Formulario}>
                        {/* Campo: Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Correo electrónico
                            </label>
                            <div className="mt-1">
                                <input
                                    onChange={(e) => { setDatos({ ...datos, email: e.target.value }) }}
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
                                    onChange={(e) => { setDatos({ ...datos, password: e.target.value }) }}
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
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
                                Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginApp;