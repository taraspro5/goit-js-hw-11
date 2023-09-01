async function serviceImage(currentPage = '1') {
  const params = new URLSearchParams({
    key: '39156572-72d7647317d1c76660d8c9d12',
    q: searchQuery.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 40,
  });

  return await axios.get(`https://pixabay.com/api/?${params}`);
}

export { serviceImage };
