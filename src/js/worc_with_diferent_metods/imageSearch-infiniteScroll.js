import { notifyWarning, notifyInfo, notifySuccess } from '../notifyMasseges';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import { getImgApi } from './api-imgSearch-then';
import { getImgApi } from '../api-imgSearch-async';
import { cbFordrawPictures } from '../cbForDraw-imgSearch';

export function infiniteScroll() {
  let simpleLightbox = new SimpleLightbox('.gallery a');
  const formEl = document.querySelector('#search-form');
  const submitBtn = formEl.querySelector('.submit-btn');
  const submitBtnText = formEl.querySelector('.search-btn-text');
  const submitBtnLoader = formEl.querySelector('.loader');
  const imgContainer = document.querySelector('.gallery');
  const observerTarget = document.querySelector('#infinity-sckroll-point');

  formEl.addEventListener('submit', feachPictures);
  // ==========================================

  const optionToFeach = {
    pageNumber: 1,
    searchWord: '',
    numberOfPictures: 40,
  };

  // ===========================================
  const optionsToObserver = {
    root: null,
    rootMargin: '0px 0px 15% 0px',
    threshold: 1.0,
  };

  const observer = new IntersectionObserver(
    feachMorePictures,
    optionsToObserver
  );

  // ===========================================

  async function feachPictures(event) {
    try {
      event.preventDefault();
      showLoader();
      observer.unobserve(observerTarget);
      imgContainer.innerHTML = '';
      optionToFeach.pageNumber = 1;
      optionToFeach.searchWord = event.target.elements.searchQuery.value;

      const respons = await getImgApi(optionToFeach);
      drawPictures(respons);
      const { totalHits, hits } = respons;
      if (totalHits > optionToFeach.numberOfPictures) {
        observer.observe(observerTarget);
        notifySuccess(respons);
      } else if (hits.length) {
        notifyWarning();
        notifySuccess(respons);
      } else {
        notifyInfo();
      }
    } catch (err) {
      console.log(err);
    } finally {
      hideLoader();
    }
  }

  async function feachMorePictures(entries, observer) {
    try {
      if (entries[0].isIntersecting) {
        optionToFeach.pageNumber += 1;
        const respons = await getImgApi(optionToFeach);
        const { pageNumber, numberOfPictures } = optionToFeach;
        if (respons.totalHits <= pageNumber * numberOfPictures) {
          notifyWarning();
          observer.unobserve(observerTarget);
        }
        drawPictures(respons);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function drawPictures(data) {
    const { hits: pictures } = data;
    const picturesElements = pictures.map(cbFordrawPictures).join('');
    imgContainer.insertAdjacentHTML('beforeend', picturesElements);
    simpleLightbox.refresh();
  }
  function showLoader() {
    submitBtnText.classList.add('unvisually');
    submitBtnLoader.classList.remove('unvisually');
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.6';
  }
  function hideLoader() {
    submitBtnText.classList.remove('unvisually');
    submitBtnLoader.classList.add('unvisually');
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
  }
}
