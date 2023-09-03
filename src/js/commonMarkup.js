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

export { createMarkup };
