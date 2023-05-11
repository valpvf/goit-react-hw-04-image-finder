import axios from 'axios';

const getSearchGalleryApi = (query, page = 1) => {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '35178730-35412664985809edebeff8fc3';
  const options = {
    params: {
      key: API_KEY,
      q: query,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  };
  return axios.get(URL, options).then(res => {
    return res.data;
  });
};

export default getSearchGalleryApi;
