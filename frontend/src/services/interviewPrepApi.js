import apiClient from './axiosConfig';
import { useQuery } from '@tanstack/react-query';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const interviewPrepApi = {
    getLevels: async () => {
        const response = await apiClient.get(`${BACKEND_URL}/api/interview-prep/levels`);
        return response.data;
    },

    getTopicsByLevel: async (level) => {
        const response = await apiClient.get(`${BACKEND_URL}/api/interview-prep/${level}`);
        return response.data;
    },

    getTopicQuestions: async (level, slug) => {
        const response = await apiClient.get(`${BACKEND_URL}/api/interview-prep/${level}/${slug}`);
        return response.data;
    },
};


export const useInterviewLevels = () => {
    return useQuery({
        queryKey: ['interviewLevels'],
        queryFn: () => interviewPrepApi.getLevels(),
        staleTime: 15 * 60 * 1000, // Cache for 15 mins
    });
};

export const useInterviewTopics = (level) => {
    return useQuery({
        queryKey: ['interviewTopics', level],
        queryFn: () => interviewPrepApi.getTopicsByLevel(level),
        staleTime: 10 * 60 * 1000, // Cache for 10 mins
        enabled: !!level,
    });
};

export const useInterviewQuestions = (level, slug) => {
    return useQuery({
        queryKey: ['interviewQuestions', level, slug],
        queryFn: () => interviewPrepApi.getTopicQuestions(level, slug),
        staleTime: 5 * 60 * 1000, // Cache for 5 mins
        enabled: !!level && !!slug,
    });
};