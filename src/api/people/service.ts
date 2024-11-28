import axios from "axios";

const API_URL = 'https://swapi.dev/api/people/';

export const getPeople = async (page: number) => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
};

export const getPersonById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unknown error:', error);
        }
        throw error;
    }
};