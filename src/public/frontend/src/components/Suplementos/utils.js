// utils.js
export const fetchSuplementos = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json(); // Retorna a lista de suplementos
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching suplementos:', error);
    return [];
  }
};

export const createOrUpdateSuplemento = async (url, suplemento) => {
  try {
    const method = suplemento._id ? 'PUT' : 'POST';
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(suplemento),
    });

    // Verifica se a resposta é bem-sucedida
    if (response.ok) {
      const result = await response.json();
      return { success: true, ...result }; // Retorna o resultado com sucesso true
    } else {
      return { success: false, error: await response.text() }; // Retorna erro com mensagem do servidor
    }
  } catch (error) {
    console.error('Error creating or updating suplemento:', error);
    return { success: false, error };
  }
};

export const deleteSuplementoById = async (url) => {
  try {
    const response = await fetch(url, { method: 'DELETE' });
    return response.ok; // Retorna true se a exclusão foi bem-sucedida
  } catch (error) {
    console.error('Error deleting suplemento:', error);
    return false;
  }
};
