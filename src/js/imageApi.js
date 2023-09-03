import axios from 'axios';

async function serviceImage(currentPage = '1', inputValue) {
  const params = new URLSearchParams({
    key: '39156572-72d7647317d1c76660d8c9d12',
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 40,
  });

  return await axios
    .get(`https://pixabay.com/api/?${params}`)
    .then(res => res.data);
}

export { serviceImage };
