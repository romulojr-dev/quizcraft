import api from './api';
import { LoginCredentials, AuthResponse } from '@/types/auth';

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login/', credentials);
    return response.data;
};

export const register = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register/', credentials);
    return response.data;
};