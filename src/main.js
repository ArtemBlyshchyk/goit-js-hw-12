import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { appendImages } from './js/render-functions';

const form = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('[type="text"]'),
};

export const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
export const loadMoreBtn = document.querySelector('.loadBtn');

export let currentPage = 1;
export let currentQuery = '';
export const perPage = 15;

const totalPages = Math.ceil(100 / perPage);

form.searchForm.addEventListener('submit', onSearchImg);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchImg(event) {
  event.preventDefault();
  const searchQuery = form.input.value.trim();
  if (!searchQuery) {
    iziToast.error({
      message: 'Fill in the input field!',
      position: 'topRight',
    });
    return;
  }
  // Показувати завантажувач
  loader.style.display = 'block';

  currentQuery = searchQuery;
  currentPage = 1;

  // Виклик запиту до сервера та отримання даних
  try {
    const images = await fetchImages(currentQuery, currentPage);
    displayImages(images);
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while fetching images!',
      position: 'topRight',
    });
  } finally {
    // Приховати індикатор завантаження після завершення запиту
    loader.style.display = 'none';
  }

  form.searchForm.reset();
}

async function onLoadMore() {
  if (currentPage > totalPages) {
    loadMoreBtn.style.display = 'none';
    return iziToast.error({
      position: 'topRight',
      message: "We're sorry, there are no more posts to load",
    });
  }
  currentPage++;
  try {
    const images = await fetchImages(currentQuery, currentPage);
    appendImages(images);

    // Прокрутити сторінку на висоту однієї карточки галереї
    const itemHeight = getGalleryItemHeight();
    window.scrollBy({
      top: itemHeight * 2, // Прокрутка на дві висоти карточки галереї
      behavior: 'smooth', // Плавна анімація прокрутки
    });
  } catch (error) {
    console.log(error);
    iziToast.error({
      message: 'An error occurred while fetching more images!',
      position: 'topRight',
    });
  }
}

// =================== MAIN  ======================
function displayImages(images) {
  // Очистити існуючу галерею
  galleryContainer.innerHTML = '';
  appendImages(images);
}

// =================  MAIN ===============================================
//Функція, яка отримує висоту однієї карточки галереї за допомогою getBoundingClientRect:
function getGalleryItemHeight() {
  const galleryItem = document.querySelector('.gallery-item');
  const itemHeight = galleryItem.getBoundingClientRect().height;
  return itemHeight;
}

// ===================РОБОЧИЙ КОД=======================================

// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';
// import axios from 'axios';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const form = {
//   searchForm: document.querySelector('.search-form'),
//   input: document.querySelector('[type="text"]'),
// };

// const galleryContainer = document.querySelector('.gallery');
// const loader = document.querySelector('.loader');
// const loadMoreBtn = document.querySelector('.loadBtn');

// let currentPage = 1;
// let currentQuery = '';
// const perPage = 15;

// const totalPages = Math.ceil(100 / perPage);

// form.searchForm.addEventListener('submit', onSearchImg);
// loadMoreBtn.addEventListener('click', onLoadMore);

// async function onSearchImg(event) {
//   event.preventDefault();
//   const searchQuery = form.input.value.trim();
//   if (!searchQuery) {
//     iziToast.error({
//       message: 'Fill in the input field!',
//       position: 'topRight',
//     });
//     return;
//   }
//   // Показувати завантажувач
//   loader.style.display = 'block';

//   currentQuery = searchQuery;
//   currentPage = 1;

//   // Виклик запиту до сервера та отримання даних
//   try {
//     const images = await fetchImages(currentQuery, currentPage);
//     displayImages(images);
//   } catch (error) {
//     iziToast.error({
//       message: 'An error occurred while fetching images!',
//       position: 'topRight',
//     });
//   } finally {
//     // Приховати індикатор завантаження після завершення запиту
//     loader.style.display = 'none';
//   }

//   form.searchForm.reset();
// }

// async function onLoadMore() {
//   if (currentPage > totalPages) {
//     loadMoreBtn.style.display = 'none';
//     return iziToast.error({
//       position: 'topRight',
//       message: "We're sorry, there are no more posts to load",
//     });
//   }
//   currentPage++;
//   try {
//     const images = await fetchImages(currentQuery, currentPage);
//     appendImages(images);

//     // Прокрутити сторінку на висоту однієї карточки галереї
//     const itemHeight = getGalleryItemHeight();
//     window.scrollBy({
//       top: itemHeight * 2, // Прокрутка на дві висоти карточки галереї
//       behavior: 'smooth', // Плавна анімація прокрутки
//     });
//   } catch (error) {
//     console.log(error);
//     iziToast.error({
//       message: 'An error occurred while fetching more images!',
//       position: 'topRight',
//     });
//   }
// }

// async function fetchImages(currentQuery, page) {
//   axios.defaults.baseURL = `https://pixabay.com`;
//   const response = await axios.get('/api/', {
//     params: {
//       key: '42191077-576543231991193ea17287b56',
//       q: currentQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page: page,
//       per_page: perPage,
//     },
//   });
//   if (response.status !== 200) {
//     throw new Error('Failed to fetch images');
//   } else if (response.data.hits.length === 0) {
//     iziToast.error({
//       message:
//         'Sorry, there are no images matching your search query. Please try again!',
//       messageSize: 10.5,
//       position: 'topRight',
//     });
//   }
//   return response.data.hits;
// }

// function displayImages(images) {
//   // Очистити існуючу галерею
//   galleryContainer.innerHTML = '';
//   appendImages(images);
// }

// function appendImages(images) {
//   const galleryItem = images
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<li class="gallery-item">
//   <a class="gallery-link" href="${largeImageURL}">
//     <img
//       class="gallery-image"
//       src="${webformatURL}"
//       alt="${tags}"
//     />
//   </a>
//   <div class="image-details">
//     <p><b>Likes</b> ${likes}</p>
//     <p><b>Views</b> ${views}</p>
//     <p><b>Comments</b> ${comments}</p>
//     <p><b>Downloads</b> ${downloads}</p>
//   </div>
// </li>`;
//       }
//     )
//     .join('');
//   galleryContainer.insertAdjacentHTML('beforeend', galleryItem);
//   // Додаємо бібліотеку SimpleLightbox
//   let gallery = new SimpleLightbox('.gallery a', {
//     captionsData: 'alt',
//   });
//   gallery.refresh();

//   // Відображення кнопки "Load more" при наявності зображень
//   loadMoreBtn.style.display = images.length > 0 ? 'block' : 'none';
// }

// //Функція, яка отримує висоту однієї карточки галереї за допомогою getBoundingClientRect:
// function getGalleryItemHeight() {
//   const galleryItem = document.querySelector('.gallery-item');
//   const itemHeight = galleryItem.getBoundingClientRect().height;
//   return itemHeight;
// }
