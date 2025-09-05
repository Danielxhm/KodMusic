import { useEffect, useState } from 'react';
import { getTopPlaylists, getChartTrack } from '../services/deezer';
import { useAuth } from '../context/AuthContext';
import { HeartIcon, PlayCircleIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas Noches';
};

const HomePage = () => {
    const { user } = useAuth();
    const [playlists, setPlaylists] = useState([]);
    const [trendingTrack, setTrendingTrack] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [playlistsData, trackData] = await Promise.all([
                    getTopPlaylists(3),
                    getChartTrack()
                ]);
                setPlaylists(playlistsData);
                setTrendingTrack(trackData);
                setError(null);
            } catch (err) {
                setError('No se han podido recuperar los datos de Deezer. Inténtalo de nuevo más tarde.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    if (loading) return <div className="flex justify-center items-center h-full"><p>Loading music...</p></div>;
    if (error) return <div className="flex justify-center items-center h-full text-red-500"><p>{error}</p></div>;

    return (
        <div className="p-6">
            <header className="mb-6">
                 <h1 className="text-white text-3xl font-bold">{getGreeting()}, {user?.name}</h1>
            </header>
            
            <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2">
                <button className="px-5 py-2 bg-[#A8F700] text-black font-semibold rounded-full text-sm flex-shrink-0">All</button>
                <button className="px-5 py-2 bg-[#2A2A2A] text-gray-300 font-semibold rounded-full text-sm flex-shrink-0">New Release</button>
                <button className="px-5 py-2 bg-[#2A2A2A] text-gray-300 font-semibold rounded-full text-sm flex-shrink-0">Trending</button>
                <button className="px-5 py-2 bg-[#2A2A2A] text-gray-300 font-semibold rounded-full text-sm flex-shrink-0">Top</button>
            </div>

            <section className="mb-8">
                <h2 className="text-white text-xl font-bold mb-4">Trending Music</h2>
                {trendingTrack && (

                    <div className="relative bg-gradient-to-br from-[#8E2DE2] to-[#4A00E0] rounded-3xl p-8 text-white overflow-hidden flex items-center min-h-[220px]">
                        
                        {/* Contenido de texto y botones a la izquierda */}
                        <div className="relative z-10 w-full md:w-1/2">
                            <h3 className="font-bold text-4xl">{trendingTrack.title}</h3>
                            <p className="text-sm max-w-[250px] mt-2 text-gray-200">
                                Lo más sonado de la semana, de <strong>{trendingTrack.artist.name}</strong>.
                            </p>
                            <div className="flex items-center gap-4 mt-8">
                                <button className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 transition transform hover:scale-105">
                                    <PlayCircleIcon className="h-12 w-12 text-white" />
                                </button>
                                <HeartIcon className="h-7 w-7 text-gray-300 hover:text-white transition cursor-pointer" />
                                <EllipsisHorizontalIcon className="h-7 w-7 text-gray-300 hover:text-white transition cursor-pointer" />
                            </div>
                        </div>

                        
                        <div className="absolute top-0 right-0 w-3/5 h-full z-0 hidden sm:block">
                            <img 
                                src={trendingTrack.album.cover_xl} 
                                className="w-full h-full object-cover" 
                                alt={trendingTrack.title}
                            />
                        
                            <div 
                                className="absolute inset-0 bg-gradient-to-r from-[#6A0DE0] via-transparent to-transparent"
                            ></div>
                        </div>

                    </div>
                
                )}
            </section>

            <section className="pb-24 lg:pb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-xl font-bold">Top daily playlists</h2>
                    <a href="#" className="text-gray-400 text-sm font-semibold hover:text-white transition">See all</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {playlists.map(playlist => (
                        <div key={playlist.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition group">
                            <img src={playlist.picture_medium} alt={playlist.title} className="w-16 h-16 rounded-lg object-cover"/>
                            <div className="flex-grow min-w-0">
                                <p className="text-white font-semibold truncate">{playlist.title}</p>
                                <p className="text-gray-400 text-sm">By {playlist.user.name}</p>
                            </div>
                            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#A8F700] text-black opacity-0 group-hover:opacity-100 transition-opacity ml-auto -translate-x-2 group-hover:translate-x-0 flex-shrink-0">
                                <PlayCircleIcon className="h-8 w-8"/>
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;