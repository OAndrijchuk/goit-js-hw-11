import { Notify, Report } from 'notiflix';

export function notifyWarning() {
  Notify.warning("We're sorry, but you've reached the end of search results.", {
    ID: 'MKA',
    timeout: 3000,
    showOnlyTheLastOne: true,
    position: 'right-top',
    fontSize: '18px',
  });
}
export function notifyInfo() {
  Report.info(
    'Ooops!!!',
    'Sorry, there are no images matching your search query. Please try again.',
    'Ok'
  );
}
export function notifySuccess(data) {
  Notify.success(`Hooray! We found ${data.totalHits} images.`, {
    position: 'right-top',
    timeout: 3000,
    showOnlyTheLastOne: true,
    fontSize: '18px',
  });
}
export function notifyFailure() {
  Report.failure(
    'Misfortune!!',
    'An error occurred. Please try again ...',
    'Ok'
  );
}
