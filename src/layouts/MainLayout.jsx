import { Outlet, NavLink } from 'react-router-dom';
import { HomeIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useAuth } from '../context/AuthContext';
import { useAudio } from '../context/AudioContext'; 
import Player from '../components/Player';

const Sidebar = () => {
   
    const { user, logout } = useAuth();

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-[#080808] p-6 fixed h-full">
            <div className="flex items-center gap-2 mb-10">
                 <h1 className="font-bold text-2xl text-[#A8F700]">Kodi Music</h1>
            </div>
            <nav className="flex flex-col space-y-2 flex-grow">
                <NavLink to="/" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg ${isActive ? 'bg-[#2A2A2A] text-white' : 'text-gray-400 hover:bg-[#1f1f1f]'}`}>
                    <HomeIcon className="h-6 w-6"/>
                    <span className="font-semibold">Home</span>
                </NavLink>
                <NavLink to="/search" className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg ${isActive ? 'bg-[#2A2A2A] text-white' : 'text-gray-400 hover:bg-[#1f1f1f]'}`}>
                    <MagnifyingGlassIcon className="h-6 w-6"/>
                    <span className="font-semibold">Search</span>
                </NavLink>
            </nav>
            <div className="mt-auto">
                 <div className="flex items-center gap-3 border-t border-gray-800 pt-4">
                    <UserCircleIcon className="h-10 w-10 text-gray-500" />
                    <div>
                        <p className="font-semibold text-white">{user?.name}</p>
                        <button onClick={logout} className="text-sm text-gray-400 hover:text-white">Log out</button>
                    </div>
                 </div>
            </div>
        </aside>
    );
};

// Componente MobileNav 
const MobileNav = () => {
    const { currentTrack } = useAudio();
    // La barra sube si hay una canción reproduciéndose, si no, se queda abajo.
    const bottomClass = currentTrack ? 'bottom-[88px]' : 'bottom-4';

    return (
        <nav className={`fixed left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-gray-900/50 backdrop-blur-md rounded-full px-6 py-3 shadow-lg flex items-center justify-around z-[60] lg:hidden transition-all duration-300 ${bottomClass}`}>
            <NavLink to="/" className={({isActive}) => isActive ? 'text-[#A8F700]' : 'text-gray-400'}>
                <HomeIcon className="h-7 w-7"/>
            </NavLink>
            <NavLink to="/search" className={({isActive}) => isActive ? 'text-[#A8F700]' : 'text-gray-400'}>
                <MagnifyingGlassIcon className="h-7 w-7"/>
            </NavLink>
        </nav>
    );
};


const MainLayout = () => {
    const { currentTrack } = useAudio();
    
    const mainPaddingBottom = currentTrack ? 'pb-48' : 'pb-24'; 

    return (
        <div className="flex min-h-screen bg-[#0B1A2C] text-white">
            <Sidebar />
            <main className={`w-full bg-[#121212] lg:ml-64 main-content h-screen overflow-y-auto lg:pb-6 ${mainPaddingBottom}`}>
                <Outlet />
            </main>
            <MobileNav />
            <Player />
        </div>
    );
};

export default MainLayout;