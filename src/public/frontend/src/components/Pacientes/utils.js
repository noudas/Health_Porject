// src/components/Pacientes/utils.js

export const fetchPacientes = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching pacientes:', error);
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
  
  export const fetchDoencas = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching doencas:', error);
      return [];
    }
  };
  
  export const createOrUpdatePaciente = async (url, paciente) => {
    try {
      const response = await fetch(paciente._id ? `${url}/${paciente._id}` : url, {
        method: paciente._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente),
      });
      return await response.json();
    } catch (error) {
      console.error('Error saving paciente:', error);
      return { success: false };
    }
  };
  
  export const deletePacienteById = async (url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      return response.ok;
    } catch (error) {
      console.error('Error deleting paciente:', error);
      return false;
    }
  };
  