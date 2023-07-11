import { notifyWarning, notifyInfo, notifySuccess } from './notifyMasseges';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { getImgApi } from './api-imgSearch-then';
import { getImgApi } from './api-imgSearch-async';
import { cbFordrawPictures } from './cbForDraw-imgSearch';

const formEl = document.querySelector('#search-form');
const imgContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const optionToFeach = {
  pageNumber: 1,
  searchWord: '',
  numberOfPictures: 40,
};
let simpleLightbox = new SimpleLightbox('.gallery a');

formEl.addEventListener('submit', feachPictures);
loadMoreBtn.addEventListener('click', feachMorePictures);

async function feachPictures(event) {
  event.preventDefault();
  loadMoreBtn.classList.add('visually-hidden');
  imgContainer.innerHTML = '';
  optionToFeach.pageNumber = 1;
  optionToFeach.searchWord = event.target.elements.searchQuery.value;

  const respons = await getImgApi(optionToFeach);

  if (respons.totalHits >= optionToFeach.numberOfPictures) {
    notifySuccess(respons);
  }
  drawPictures(respons);
}
async function feachMorePictures() {
  optionToFeach.pageNumber += 1;
  const respons = await getImgApi(optionToFeach);
  drawPictures(respons);
  smoothScroll();
}

function drawPictures(data) {
  const { hits: pictures, totalHits } = data;
  const { pageNumber, numberOfPictures } = optionToFeach;
  if (pictures.length === 0) {
    loadMoreBtn.classList.add('visually-hidden');
    notifyInfo();
    return;
  }
  loadMoreBtn.classList.add('visually-hidden');
  const picturesElements = pictures.map(cbFordrawPictures).join('');
  imgContainer.insertAdjacentHTML('beforeend', picturesElements);
  simpleLightbox.refresh();

  if (totalHits <= pageNumber * numberOfPictures) {
    notifyWarning();
    return;
  }
  loadMoreBtn.classList.remove('visually-hidden');
}

function smoothScroll() {
  const { height: cardHeight } =
    imgContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
