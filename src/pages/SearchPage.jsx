import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { searchTracks } from '../services/deezer';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useAudio } from '../context/AudioContext'; 
import { PauseCircleIcon } from '@heroicons/react/24/solid'; 

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const query = searchParams.get('q') || '';
    
    const [searchTerm, setSearchTerm] = useState(query);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const { playTrack, currentTrack, isPlaying } = useAudio(); 

    useEffect(() => {
        if (query) {
            setHasSearched(true);
            const fetchResults = async () => {
                setLoading(true);
                setError(null);
                try {
                    const data = await searchTracks(query);
                    setResults(data);
                } catch (err) {
                    setError('Could not fetch search results.');
                } finally {
                    setLoading(false);
                }
            };
            fetchResults();
        }
    }, [query]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchTerm) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Search</h1>
            <form onSubmit={handleSearch} className="mb-8">
                <div className="relative">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="¿Qué quieres escuchar?"
                        className="bg-[#2A2A2A] text-white rounded-full py-3 pl-12 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#A8F700]"
                    />
                    <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"/>
                </div>
            </form>

            {loading && <p>Searching...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            {!loading && hasSearched && results.length === 0 && (
                <p>No results found for "{query}". Try another search.</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-24 lg:pb-6">
                {results.map((track) => {
                    const isActive = currentTrack?.id === track.id;
                    return (
                        <div key={track.id} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition group flex flex-col">
                            <div className="relative mb-4">
                                <img src={track.album.cover_medium} alt={track.album.title} className="w-full rounded-md aspect-square object-cover"/>
                                <button
                                    onClick={() => playTrack(track)}
                                    className="absolute bottom-2 right-2 w-12 h-12 flex items-center justify-center rounded-full bg-[#A8F700] text-black transition-all transform scale-100 group-hover:scale-110 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                                >
                                    {isActive && isPlaying ? <PauseCircleIcon className="h-10 w-10"/> : <PlayCircleIcon className="h-10 w-10"/>}
                                </button>
                            </div>
                            <h3 className={`font-bold truncate ${isActive ? 'text-[#A8F700]' : ''}`}>{track.title}</h3>
                            <p className="text-sm text-gray-400 truncate">{track.artist.name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SearchPage;