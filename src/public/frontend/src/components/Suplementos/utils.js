export const fetchSuplementos = async (url) => {
    try {
      const response = await fetch(url);
      return response.ok ? await response.json() : [];
    } catch (error) {
      console.error('Error fetching suplementos:', error);
      return [];
    }
  };
  
  export const createOrUpdateSuplemento = async (url, suplemento) => {
    try {
      const response = await fetch(url, {
        method: suplemento._id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(suplemento)
      });
      
      return response.ok ? await response.json() : { success: false };
    } catch (error) {
      console.error('Error creating or updating suplemento:', error);
      return { success: false };
    }
  };
  
  export const deleteSuplementoById = async (url) => {
    try {
      const response = await fetch(url, { method: 'DELETE' });
      
      return response.ok;
    } catch (error) {
      console.error('Error deleting suplemento:', error);
      return false;
    }
  };
  