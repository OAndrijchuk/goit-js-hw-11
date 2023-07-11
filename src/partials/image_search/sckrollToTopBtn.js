import throttle from 'lodash.throttle';
const scrollToTop = document.querySelector('.scroll-to-top');
const trackScrollThrottle = throttle(trackScroll, 500);

window.addEventListener('scroll', trackScrollThrottle);

function trackScroll() {
  const offset = window.scrollY;
  const coords = document.documentElement.clientHeight;
  function goToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (offset >= coords) {
    scrollToTop.addEventListener('click', goToTop);
    scrollToTop.classList.remove('unvisually');
  } else {
    scrollToTop.classList.add('unvisually');
    scrollToTop.addEventListener('click', goToTop);
  }
}
