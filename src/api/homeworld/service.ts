import axios from "axios";

const API_URL = 'https://swapi.dev/api/planets/';

export const getHomeworldById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('Axios error:', error.message);
        } else {
            console.log('Unknown error:', error);
        }
        throw error;
    }
}