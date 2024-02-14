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

function displayImages(images) {
  // Очистити існуючу галерею
  galleryContainer.innerHTML = '';
  appendImages(images);
}

//Функція, яка отримує висоту однієї карточки галереї за допомогою getBoundingClientRect:
function getGalleryItemHeight() {
  const galleryItem = document.querySelector('.gallery-item');
  const itemHeight = galleryItem.getBoundingClientRect().height;
  return itemHeight;
}
