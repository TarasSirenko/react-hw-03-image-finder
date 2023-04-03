const BASE_URL = 'https://pixabay.com/api/';
const KEY = '33110097-e31e2273406f912ac77c7c325';

const fetchImage = (text, page = 1) => {
  return fetch(
    `${BASE_URL}?key=${KEY}&q=${text}&per_page=12&page=${page} `,
  ).then(response => {
    if (response.ok) return response.json();
    return Promise.reject(new Error(`Нет изображений по запросу ${text}`));
  });
};

const api = {
  fetchImage,
};

export default api;
