// src/components/Horarios/utils.js

export const fetchHorarios = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching horarios:', error);
      return [];
    }
  };
  
  export const createOrUpdateHorario = async (url, horario) => {
    try {
      const response = await fetch(horario._id ? `${url}/${horario._id}` : url, {
        method: horario._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(horario),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving horario:', error);
      return { success: false };
    }
  };
  
  export const deleteHorarioById = async (url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Error deleting horario:', error);
      return false;
    }
  };
  