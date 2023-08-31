import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
    page = 1;
    const object = await serviceImage(page);
    console.log(object);
    if (!object.data.hits.length) {
      container.innerHTML = '';
      throw new Error();
    }
    totalToEnd = object.data.totalHits;
    Notiflix.Notify.success(`"Hooray! We found ${totalToEnd} images."`);
    container.innerHTML = '';
    container.insertAdjacentHTML('beforeend', createMarkup(object.data.hits));
    observer.observe(guard);
    lightbox.refresh();
  } catch (err) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function serviceImage(currentPage = '1') {
  const params = new URLSearchParams({
    key: '39156572-72d7647317d1c76660d8c9d12',
    q: searchQuery.value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 40,
  });

  return await axios.get(`https://pixabay.com/api/?${params}`);
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a class="photo-link" href=${largeImageURL}>
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <ul class="info">
        <li class="info-item">
          <b>Likes</b>
          ${likes}
        </li>
        <li class="info-item">
          <b>Views</b>
          ${views}
        </li>
        <li class="info-item">
          <b>Comments</b>
          ${comments}
        </li>
        <li class="info-item">
          <b>Downloads</b>
          ${downloads}
        </li>
      </ul>
    </div>`
    )
    .join('');
}

async function handlerLoad(entries) {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      page++;
      totalToEnd -= 40;
      if (totalToEnd <= 0) {
        observer.unobserve(guard);
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
      }
      const object = await serviceImage(page);
      container.insertAdjacentHTML('beforeend', createMarkup(object.data.hits));
      lightbox.refresh();
    }
  });
}
