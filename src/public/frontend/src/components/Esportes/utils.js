//utils.js

export const fetchEsportes = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar esportes:', error);
    return [];
  }
};

export const createOrUpdateEsporte = async (url, esporte) => {
  const apiUrl = esporte._id ? `${url}/${esporte._id}` : url; // Inclui o ID se for um PUT
  try {
    const response = await fetch(apiUrl, {
      method: esporte._id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(esporte),
    });

    if (!response.ok) {
      return { success: false, message: 'Erro na resposta da API' }; // Adiciona uma mensagem de erro
    }

    const data = await response.json();
    return { success: true, data }; // Retorna success: true
  } catch (error) {
    console.error('Erro ao salvar esporte:', error);
    return { success: false, message: error.message }; // Inclui a mensagem de erro
  }
};

export const deleteEsporteById = async (url) => {
  try {
    const response = await fetch(url, { method: 'DELETE' });
    return response.ok;
  } catch (error) {
    console.error('Erro ao deletar esporte:', error);
    return false;
  }
};
