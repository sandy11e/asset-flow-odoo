import api from '@/services/api';

export const getAssets = async () => {
  return api.get('/assets');
};

export const getAssetById = async (id) => {
  return api.get(`/assets/${id}`);
};

export const createAsset = async (data) => {
  return api.post('/assets', data);
};

export const updateAsset = async (id, data) => {
  return api.patch(`/assets/${id}`, data);
};
