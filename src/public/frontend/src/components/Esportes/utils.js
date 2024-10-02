// src/components/Esportes/utils.js

export const fetchEsportes = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching esportes:', error);
      return [];
    }
  };
  
  export const createOrUpdateEsporte = async (url, esporte) => {
    try {
      const response = await fetch(esporte._id ? `${url}/${esporte._id}` : url, {
        method: esporte._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(esporte),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving esporte:', error);
      return { success: false };
    }
  };
  
  export const deleteEsporteById = async (url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Error deleting esporte:', error);
      return false;
    }
  };
  