import '/src/scss/style.scss';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import JustValidate from 'just-validate';

/* Swiper */

try {
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
} catch (error) {}

/* Header Menu */

const burger = document.querySelector('.header__burger');
const closeButton = document.querySelector('.header__menu-close');
const menu = document.querySelector('.header__menu');

const toggleMenu = (show) => {
  menu.classList.toggle('header__menu_active', show);
  document.body.style.overflow = show ? 'hidden' : '';
};

document.addEventListener('click', (e) => {
  if (e.target.closest('.header__burger')) {
    toggleMenu(true);
  } else if (e.target.closest('.header__menu-close')) {
    toggleMenu(false);
  }
});

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    if (window.innerWidth >= 768) toggleMenu(false);
  }, 100);
});

/* Tabs */

try {
  const tabs = document.querySelectorAll('.catalog__tab');
  const contents = document.querySelectorAll('.catalog__content-item');

  tabs[0]?.classList.add('catalog__tab_active');
  contents.forEach((c, i) => (c.style.display = i ? 'none' : 'flex'));

  document.addEventListener('click', (e) => {
    const tab = e.target.closest('.catalog__tab');
    if (!tab) return;

    const index = [...tabs].indexOf(tab);
    if (index < 0) return;

    tabs.forEach((t) => t.classList.toggle('catalog__tab_active', t === tab));
    contents.forEach(
      (c, i) => (c.style.display = i === index ? 'flex' : 'none')
    );
  });
} catch (error) {}

/* Forms */

try {
  const validatorTouch = new JustValidate('.touch__form');

  validatorTouch
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Please fill the name'
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Minimum 2 chars!'
      }
    ])
    .addField('#email', [
      {
        rule: 'required'
      },
      {
        rule: 'email'
      }
    ])
    .addField(
      '#question',
      [
        {
          rule: 'required'
        },
        {
          rule: 'minLength',
          value: 5
        }
      ],
      {
        errorsContainer: '.error-message'
      }
    )
    .addField(
      '#checkbox',
      [
        {
          rule: 'required'
        }
      ],
      {
        errorsContainer: '.checkbox-error-message'
      }
    )
    .onSuccess((event) => {
      const form = event.currentTarget;
      const formData = new FormData(form);

      fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Success', data);
          form.reset();
        });
    });
} catch (error) {}

try {
  const validatorFooter = new JustValidate('.footer__form');

  validatorFooter
    .addField(
      '#footer__email',
      [
        {
          rule: 'required'
        },
        {
          rule: 'email'
        }
      ],
      {
        errorsContainer: document
          .querySelector('#footer__email')
          .parentElement.querySelector('.email-error-message')
      }
    )
    .addField(
      '#footer-terms',
      [
        {
          rule: 'required'
        }
      ],
      {
        errorsContainer: '.check-error-message'
      }
    )
    .onSuccess((event) => {
      const form = event.currentTarget;
      const formData = new FormData(form);

      fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Success', data);
          form.reset();
        });
    });
} catch (e) {}
