import '/src/scss/style.scss';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 5,
  direction: 'horizontal',
  loop: true,
  navigation: {
    nextEl: '.icon-right-open',
    prevEl: '.icon-left-open'
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
      spaceBetween: 5
    },
    1920: {
      slidesPerView: 3,
      spaceBetween: 35
    }
  }
});
