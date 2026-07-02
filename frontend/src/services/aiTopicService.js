import axiosConfig from "./axiosConfig";

export const fetchAiTopicsGrouped = () =>
  axiosConfig.get("/api/ai-topics").then(r => r.data.data);

export const fetchAiTopicBySlug = (slug) =>
  axiosConfig.get(`/api/ai-topics/${slug}`).then(r => r.data.data);