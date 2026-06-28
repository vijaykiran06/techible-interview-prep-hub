import apiClient from './axiosConfig';

export const getCompanies = async (params = {}) => {
  const { data } = await apiClient.get(
    "/api/companies",
    {
      params,
    }
  );

  return data;
};

export const getCompanyBySlug = async (slug) => {
  const { data } = await apiClient.get(
    `/api/companies/${slug}`
  );

  return data;
};

export const getInterviewProcess = async (
  slug
) => {
  const { data } = await apiClient.get(
    `/api/companies/${slug}/interview-process`
  );

  return data;
};

export const getQuestions = async (
  slug,
  params = {}
) => {
  const { data } = await apiClient.get(
    `/api/companies/${slug}/questions`,
    {
      params,
    }
  );

  return data;
};

export const getSuccessStories = async (
  slug
) => {
  const { data } = await apiClient.get(
    `/api/companies/${slug}/success-stories`
  );

  return data;
};

export const getCompensation = async (
  slug
) => {
  const { data } = await apiClient.get(
    `/api/companies/${slug}/compensation`
  );

  return data;
};

export const getRecentQuestions = async (
  slug
) => {
  const { data } = await apiClient.get(
    `/api/companies/${slug}/questions/recent`
  );

  return data;
};