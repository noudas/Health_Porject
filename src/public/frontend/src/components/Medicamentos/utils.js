// src/components/Medicamentos/utils.js

export const fetchMedicamentos = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching medicamentos:', error);
      return [];
    }
  };
  
  export const createOrUpdateMedicamento = async (url, medicamento) => {
    try {
      const response = await fetch(url, {
        method: medicamento._id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicamento)
      });
      
      return response.ok ? await response.json() : { success: false };
    } catch (error) {
      console.error('Error creating or updating medicamento:', error);
      return { success: false };
    }
  };
  
  export const deleteMedicamentoById = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting medicamento:', error);
      return false;
    }
  };
  