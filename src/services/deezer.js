import axios from 'axios';

const API_URL = '/api';

// Función para obtener una selección aleatoria de un array
const getRandomSelection = (arr, count) => {
    if (!arr) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getTopPlaylists = async (limit = 3) => {
    try {
        const response = await axios.get(`${API_URL}/chart/0/playlists`);
        return getRandomSelection(response.data.data, limit);
    } catch (error) {
        console.error("Error fetching top playlists:", error);
        throw error;
    }
};

export const getChartTrack = async () => {
    try {

        const response = await axios.get(`${API_URL}/chart/0/tracks`);


        return getRandomSelection(response.data.data, 1)[0];
    } catch (error) {
        console.error("Error fetching chart track:", error);
        throw error;
    }
};
export const searchTracks = async (query) => {
    try {
        const response = await axios.get(`${API_URL}/search/track`, {
            params: { q: query, limit: 20 }
        });
        return response.data.data;
    } catch (error) {
        console.error("Error searching tracks:", error);
        throw error;
    }
};