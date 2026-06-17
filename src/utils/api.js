import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5240/api';

// Create axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle token expiration
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or unauthorized
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authApi = {
    login: (email, password) =>
        apiClient.post('/auth/login', { email, password }),

    register: (data) =>
        apiClient.post('/auth/register', data),

    logout: () =>
        apiClient.post('/auth/logout'),
};

export const ticketApi = {
    getTickets: () =>
        apiClient.get('/tickets'),

    getTicket: (id) =>
        apiClient.get(`/tickets/${id}`),

    createTicket: (data) =>
        apiClient.post('/tickets', data),

    updateTicket: (id, data) =>
        apiClient.put(`/tickets/${id}`, data),

    deleteTicket: (id) =>
        apiClient.delete(`/tickets/${id}`),

    assignTicket: (ticketId, memberId) =>
        apiClient.post(`/tickets/${ticketId}/assign`, { memberId }),

    addComment: (ticketId, content) =>
        apiClient.post(`/tickets/${ticketId}/comments`, { content }),

    changeStatus: (ticketId, status) =>
        apiClient.put(`/tickets/${ticketId}/status`, { status }),
};

export const teamApi = {
    getMembers: () =>
        apiClient.get('/team/members'),

    getMember: (id) =>
        apiClient.get(`/team/members/${id}`),

    createMember: (data) =>
        apiClient.post('/team/members', data),

    updateMember: (id, data) =>
        apiClient.put(`/team/members/${id}`, data),

    deleteMember: (id) =>
        apiClient.delete(`/team/members/${id}`),
};

export default apiClient;
