const API_BASE_URL = 'https://blog-platform.kata.academy/api';

export const fetchPostSlug = async (slug) => {
  const response = await fetch(`${API_BASE_URL}/articles/${slug}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};
