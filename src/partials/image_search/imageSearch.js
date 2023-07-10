import { Notify, Report } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getImgApi } from './api-imgSearch';
import { cbFordrawPictures } from './cbForDraw-imgSearch';

const formEl = document.querySelector('#search-form');
const imgContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const optionToFeach = {
  pageNumber: 1,
  searchWord: '',
  numberOfPictures: 40,
};

formEl.addEventListener('submit', feachPictures);
loadMoreBtn.addEventListener('click', feachMorePictures);

function feachPictures(event) {
  event.preventDefault();
  imgContainer.innerHTML = '';
  optionToFeach.pageNumber = 1;
  optionToFeach.searchWord = event.target.elements.searchQuery.value;
  getImgApi(optionToFeach).then(data => {
    drawPictures(data);
    notifySuccess(data);
  });
}
function feachMorePictures(event) {
  optionToFeach.pageNumber += 1;
  getImgApi(optionToFeach).then(data => {
    drawPictures(data);
    smoothScroll();
  });
}

function drawPictures(data) {
  const { hits: pictures, totalHits } = data;
  const { pageNumber, numberOfPictures } = optionToFeach;
  if (pictures.length === 0) {
    notifyInfo();
    return;
  }
  loadMoreBtn.classList.add('visually-hidden');
  const picturesElements = pictures.map(cbFordrawPictures).join('');
  imgContainer.insertAdjacentHTML('beforeend', picturesElements);
  new SimpleLightbox('.gallery a').refresh();

  if (totalHits <= pageNumber * numberOfPictures) {
    notifyWarning();
    return;
  }
  loadMoreBtn.classList.remove('visually-hidden');
}

function notifyWarning() {
  Notify.warning("We're sorry, but you've reached the end of search results.", {
    ID: 'MKA',
    timeout: 5000,
    showOnlyTheLastOne: true,
    position: 'right-bottom',
    fontSize: '18px',
  });
}
function notifyInfo() {
  Report.info(
    'Ooops!!!',
    'Sorry, there are no images matching your search query. Please try again.',
    'Ok'
  );
}
function notifySuccess(data) {
  Notify.success(`Hooray! We found ${data.totalHits} images.`, {
    position: 'right-top',
    timeout: 5000,
    showOnlyTheLastOne: true,
    fontSize: '18px',
  });
}
function smoothScroll() {
  const { height: cardHeight } =
    imgContainer.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
