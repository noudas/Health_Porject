// src/components/Dietas/utils.js

export const fetchDietas = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching dietas:', error);
      return [];
    }
  };
  
  export const fetchAlimentos = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching alimentos:', error);
      return [];
    }
  };
  
  export const fetchHorarios = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching horarios:', error);
      return [];
    }
  };
  
  export const createOrUpdateDieta = async (url, dieta) => {
    try {
      const response = await fetch(dieta._id ? `${url}/${dieta._id}` : url, {
        method: dieta._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dieta),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving dieta:', error);
      return { success: false };
    }
  };
  
  export const deleteDietaById = async (url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Error deleting dieta:', error);
      return false;
    }
  };
  