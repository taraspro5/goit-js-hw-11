import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './js/commonMarkup';
import { serviceImage } from './js/imageApi';

const form = document.querySelector('.search-form');
const container = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');
const { searchQuery } = form;
let page = 1;
let totalToEnd = 0;

const options = {
  rootMargin: '300px',
};
const observer = new IntersectionObserver(handlerLoad, options);

let lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
  captionsData: 'alt',
});

form.addEventListener('submit', handlerSubmit);

async function handlerSubmit(evt) {
  try {
    evt.preventDefault();
    if (!searchQuery.value.trim()) {
      container.innerHTML = '';
      throw new Error();
    }
    page = 1;
    const data = await serviceImage(page, searchQuery.value.trim());
    if (!data.hits.length) {
      container.innerHTML = '';
      throw new Error();
    }
    totalToEnd = data.totalHits;
    totalToEnd /= 40;
    Notiflix.Notify.success(`"Hooray! We found ${data.totalHits} images."`);
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    observer.observe(guard);
    lightbox.refresh();
  } catch (err) {
    observer.unobserve(guard);
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function handlerLoad(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page++;
      if (totalToEnd <= page) {
        observer.unobserve(guard);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      const { hits } = await serviceImage(page, searchQuery.value);
      container.insertAdjacentHTML('beforeend', createMarkup(hits));
      lightbox.refresh();
    }
  });
}
