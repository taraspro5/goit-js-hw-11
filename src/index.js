import axios from 'axios';

const params = new URLSearchParams({
  key: '39156572-72d7647317d1c76660d8c9d12',
});

axios.get(`https://pixabay.com/api/?${params}`).then(res => console.log(res));
