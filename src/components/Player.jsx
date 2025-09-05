import { useAudio } from '../context/AudioContext';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

const Player = () => {
    const { currentTrack, isPlaying, togglePlay } = useAudio();

    if (!currentTrack) {
        return null; // No mostrar nada si no hay canción seleccionada
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-[#181818] text-white p-3 z-50 lg:pl-64">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                    <img src={currentTrack.album.cover_small} alt={currentTrack.title} className="w-14 h-14 rounded"/>
                    <div className="min-w-0">
                        <p className="font-semibold truncate">{currentTrack.title}</p>
                        <p className="text-sm text-gray-400 truncate">{currentTrack.artist.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105">
                        {isPlaying ? <PauseIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Player;