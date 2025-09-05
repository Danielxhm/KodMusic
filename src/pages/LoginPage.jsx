import { useForm } from 'react-hook-form';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    const onSubmit = (data) => {
        const name = data.email.split('@')[0];
        const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
        
        login(capitalizedName);
        navigate('/');
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
            <div className="bg-[#1f1f1f] p-8 rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#A8F700]">Kodi Music</h1>
                    <p className="text-gray-400">Inicie Sesion para continuar</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="yourname@example.com"
                            className="mt-1 block w-full bg-[#2A2A2A] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A8F700]"
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Invalid email address'
                                }
                             })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="******"
                            className="mt-1 block w-full bg-[#2A2A2A] border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-[#A8F700]"
                            {...register('password', { 
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                             })}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>
                    <div>
                        <button type="submit" className="w-full py-2 px-4 bg-[#A8F700] text-black font-semibold rounded-md hover:bg-lime-400 transition">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;