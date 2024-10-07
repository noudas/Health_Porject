// src/components/Sintomas/utils.js

export const fetchSintomas = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching sintomas:', error);
      return [];
    }
  };
  
  export const createOrUpdateSintoma = async (url, sintoma) => {
    try {
      const response = await fetch(sintoma._id ? `${url}/${sintoma._id}` : url, {
        method: sintoma._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sintoma),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving sintoma:', error);
      return { success: false };
    }
  };
  
  export const deleteSintomaById = async (url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Error deleting sintoma:', error);
      return false;
    }
  };
  