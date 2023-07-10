import axios from 'axios';

export function getImgApi({ pageNumber, searchWord, numberOfPictures }) {
  const optionObject = {
    method: 'get',
    baseURL: 'https://pixabay.com/api/',
    params: {
      key: '38159533-e12282be0ac062c7779a27933',
      q: searchWord,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: pageNumber,
      per_page: numberOfPictures,
    },
  };
  return axios(``, optionObject).then(data => {
    return data.data;
  });
}
