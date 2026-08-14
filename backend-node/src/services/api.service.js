import axios from "axios";

export function createSpringApi(token) {

    const api = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return {

        async get(url, config = {}) {
            const response = await api.get(url, config);
            return response.data;
        },

        async post(url, payload = {}, config = {}) {
            const response = await api.post(url, payload, config);
            return response.data;
        },

        async put(url, payload = {}, config = {}) {
            const response = await api.put(url, payload, config);
            return response.data;
        },

        async patch(url, payload = {}, config = {}) {
            const response = await api.patch(url, payload, config);
            return response.data;
        },

        async delete(url, config = {}) {
            const response = await api.delete(url, config);
            return response.data;
        }

    };

}