import axios from 'axios';
import { notifyInfo, notifyFailure } from './notifyMasseges';

export async function getImgApi({ pageNumber, searchWord, numberOfPictures }) {
  try {
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
    const respons = await axios(``, optionObject);
    if (!searchWord) {
      notifyInfo();
      return { hits: [] };
    }
    return respons.data;
  } catch (err) {
    notifyFailure();
  }
}
