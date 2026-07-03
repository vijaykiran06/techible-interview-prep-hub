import { useQuery } from '@tanstack/react-query';
import apiClient from './axiosConfig'; // Centralized client setup [cite: 73]

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'; // [cite: 81, 208]

export const challengesApi = {
  // 1. Fetch all top-level active domains [cite: 190]
  getDomains: async () => {
    const response = await apiClient.get(`${BACKEND_URL}/api/challenges/domains`); // [cite: 73, 190]
    return response.data;
  },

  // 2. Fetch categories belonging to a specific domain slug [cite: 190]
  getDomainDetails: async (domainSlug) => {
    const response = await apiClient.get(`${BACKEND_URL}/api/challenges/domains/${domainSlug}`); // [cite: 73, 190]
    return response.data;
  },

  // 3. Fetch challenge cards for a specific category list (paginated & filterable) [cite: 190]
  getCategoryChallenges: async (domainSlug, categorySlug, params) => {
    const queryParams = new URLSearchParams(); // [cite: 208]
    if (params.page) queryParams.append('page', params.page); // [cite: 209]
    if (params.limit) queryParams.append('limit', params.limit); // [cite: 209]
    if (params.difficulty && params.difficulty !== 'All') {
      queryParams.append('difficulty', params.difficulty); // [cite: 210]
    }

    const response = await apiClient.get(
      `${BACKEND_URL}/api/challenges/domains/${domainSlug}/${categorySlug}?${queryParams.toString()}` // [cite: 73, 190]
    );
    return response.data;
  },

  // 4. Fetch full breakdown details for a single specific challenge walkthrough [cite: 190]
  getChallengeDetail: async (domainSlug, categorySlug, challengeSlug) => {
    const response = await apiClient.get(
      `${BACKEND_URL}/api/challenges/${domainSlug}/${categorySlug}/${challengeSlug}` // [cite: 73, 190]
    );
    return response.data;
  }
};

// --- Custom React Query Hooks --- [cite: 212, 260]

export const useChallengeDomains = () => {
  return useQuery({
    queryKey: ['challengeDomains'],
    queryFn: () => challengesApi.getDomains(),
    staleTime: 10 * 60 * 1000 // Cache for 10 minutes [cite: 213]
  });
};

export const useChallengeDomainDetails = (domainSlug) => {
  return useQuery({
    queryKey: ['challengeDomain', domainSlug],
    queryFn: () => challengesApi.getDomainDetails(domainSlug),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes [cite: 212]
    enabled: !!domainSlug // Only run hook if parameter is active [cite: 213]
  });
};

export const useCategoryChallenges = (domainSlug, categorySlug, params) => {
  return useQuery({
    queryKey: ['categoryChallenges', domainSlug, categorySlug, params],
    queryFn: () => challengesApi.getCategoryChallenges(domainSlug, categorySlug, params),
    staleTime: 2 * 60 * 1000,
    enabled: !!domainSlug && !!categorySlug,
    placeholderData: (previousData) => previousData // Clean layout pagination transitions [cite: 212]
  });
};

export const useChallengeDetail = (domainSlug, categorySlug, challengeSlug) => {
  return useQuery({
    queryKey: ['challengeDetail', challengeSlug],
    queryFn: () => challengesApi.getChallengeDetail(domainSlug, categorySlug, challengeSlug),
    staleTime: 15 * 60 * 1000,
    enabled: !!domainSlug && !!categorySlug && !!challengeSlug
  });
};