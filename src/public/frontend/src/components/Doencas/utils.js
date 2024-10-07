// src/components/Doencas/utils.js

export const fetchDoencas = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching doencas:', error);
      return [];
    }
  };
  
  export const fetchSintomas = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching sintomas:', error);
      return [];
    }
  };
  
  export const createOrUpdateDoenca = async (url, doenca) => {
    try {
      const response = await fetch(doenca._id ? `${url}/${doenca._id}` : url, {
        method: doenca._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doenca),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving doenca:', error);
      return { success: false };
    }
  };
  
  export const deleteDoencaById = async (url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Error deleting doenca:', error);
      return false;
    }
  };
  