import { API_BASE_URL } from '../../config';

export const fetchEnums = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/enums`);
      return response.ok ? await response.json() : {};
    } catch (error) {
      console.error('Error fetching enums:', error);
      return {};
    }
  };
  
  export const fetchAlimentos = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alimentos`);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching alimentos:', error);
      return [];
    }
  };
  
  export const createOrUpdateAlimento = async (alimento) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alimentos${alimento._id ? `/${alimento._id}` : ''}`, {
        method: alimento._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alimento),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving alimento:', error);
      return { success: false };
    }
  };
  
  export const deleteAlimentoById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/alimentos/${id}`, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Error deleting alimento:', error);
      return false;
    }
  };
  