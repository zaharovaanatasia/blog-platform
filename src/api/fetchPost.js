const API_BASE_URL = 'https://blog-platform.kata.academy/api';

export const fetchArticles = async (page = 1, limit = 5) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/articles?limit=${limit}&offset=${(page - 1) * limit}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
