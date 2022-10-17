`use strict`;

document.addEventListener(`DOMContentLoaded`, () => {
  // ! Nav start
  function setMainNavigation() {
    const linksWrapper = document.querySelector(`.menu`);
    const menuHeight = document.querySelector(`.page-nav`).offsetHeight;

    linksWrapper.addEventListener(`click`, linksWrapperOnClick);

    function linksWrapperOnClick(e) {
      const target = e.target;
      if (target && target.classList.contains(`menu__link`)) {
        e.preventDefault();
        const scrollTarget = document.querySelector(
          target.getAttribute(`href`)
        );
        window.scrollBy({
          top: scrollTarget.getBoundingClientRect().top - menuHeight,
          behavior: `smooth`,
        });
      }
    }
  }
  setMainNavigation();
  // Nav end

  // ! Our Services start
  function ourServices() {
    const tabs = [...document.querySelectorAll(`.service-tabs__item`)];
    const tabsContent = [
      ...document.querySelectorAll(`.service-tabs-content__item`),
    ];

    tabs.forEach((tab) => {
      if (tab.classList.contains(`active-tab`)) {
        tabsContent.forEach((content) => {
          if (
            content.getAttribute(`data-tabs`) === tab.getAttribute(`data-tabs`)
          ) {
            content.style.display = `flex`;
          }
        });
      }
    });

    tabs.forEach((tab) => {
      tab.addEventListener(`click`, tabsOnClick);
    });

    function tabsOnClick(e) {
      tabs.forEach((tab) => {
        tab.classList.remove(`active-tab`);
      });
      e.target.classList.add(`active-tab`);

      tabsContent.forEach((content) => {
        if (
          content.getAttribute(`data-tabs`) ===
          e.target.getAttribute(`data-tabs`)
        ) {
          content.style.display = `flex`;
        } else {
          content.style.display = `none`;
        }
      });
    }
  }
  ourServices();
  // Our Services end

  // ! Amazing Works start
  function AmazingWorks() {
    const filters = [...document.querySelectorAll(`.filter__item`)];
    const filtersContent = [];
    const filtersContentList = document.querySelector(`.filter__content-list`);
    const countOfWorks = 36;
    const btnLoadMore = document.querySelector(`.amazing-works .btn-load-more`);

    for (let i = 1; i <= countOfWorks; i++) {
      const li = document.createElement(`li`);
      li.classList.add(`filter__content-item`);

      li.setAttribute(`data-filter`, randomDataAttribute(i));

      li.innerHTML = `
				<img src="./img/amazing-works/amazing-works-${i}.jpg" alt="amazing-works-${i}" width="284" height="206"
				class="filter__content-img">
				<div class="filter__content-description-wrapper">
					<div class="filter__content-description-links">
						<a href="#" class="filter__content-description-link">...</a>
						<a href="#" class="filter__content-description-link">...</a>
					</div>
					<p class="filter__content-description-title">
						creative design
					</p>
					<p class="filter__content-description-text">
						Web Design
					</p>
				</div>
			`;

      filtersContent.push(li);
    }

    for (let i = 1; i <= 12; i++) {
      const li = filtersContent.splice(
        Math.floor(Math.random() * filtersContent.length),
        1
      );
      filtersContentList.append(li[0]);
    }

    filters.forEach((btn) => {
      btn.addEventListener(`click`, filteringOnClick);
    });
    btnLoadMore.addEventListener(`click`, btnLoadMoreOnClick);

    function randomDataAttribute(i) {
      if (!(i % 4)) return `graphic-design`;
      if (!(i % 3)) return `web-design`;
      if (!(i % 2)) return `landing-pages`;
      return `wordpress`;
    }

    function btnLoadMoreOnClick() {
      btnLoadMore.classList.add(`btn-load-more__loading`);
      setTimeout(() => {
        filters.forEach((btn) => {
          if (btn.getAttribute(`data-filter`) === `all`) {
            btn.classList.add(`filter__item--active`);
          } else {
            btn.classList.remove(`filter__item--active`);
          }
        });

        document
          .querySelectorAll(`.filter__content-item`)
          .forEach((element) => {
            element.style.display = `block`;
          });

        btnLoadMore.classList.remove(`btn-load-more__loading`);
        for (let i = 1; i <= 12; i++) {
          if (filtersContent.length === 0) break;
          const li = filtersContent.splice(
            Math.floor(Math.random() * filtersContent.length),
            1
          );
          filtersContentList.append(li[0]);
        }
        if (filtersContent.length === 0) {
          btnLoadMore.style.display = `none`;
        }
      }, 2000);
    }

    function filteringOnClick(e) {
      filters.forEach((btn) => {
        if (btn === e.target) {
          e.target.classList.add(`filter__item--active`);
        } else btn.classList.remove(`filter__item--active`);
      });

      const filtersContent = [
        ...document.querySelectorAll(`.filter__content-item`),
      ];
      if (e.target.getAttribute(`data-filter`) === `all`) {
        filtersContent.forEach((element) => {
          element.style.display = `block`;
        });
      } else {
        filtersContent.forEach((element) => {
          if (
            e.target.getAttribute(`data-filter`) ===
            element.getAttribute(`data-filter`)
          ) {
            element.style.display = `block`;
          } else element.style.display = `none`;
        });
      }
    }
  }
  AmazingWorks();
  //  Amazing Works end

  // ! feedback start
  function feedbackSlider() {
    const sliderFaces = [...document.querySelectorAll(`.clients__img`)];
    const sliderContents = [
      ...document.querySelectorAll(`.clients-content__item`),
    ];
    const btnLeft = document.querySelector(`.clients__arrow--left`);
    const btnRight = document.querySelector(`.clients__arrow--right`);
    const sliderContentsWrapper = document.querySelector(
      `.clients-content__list`
    );

    sliderContentsWrapper.style.height = `${getMaxSliderHeight()}px`;

    sliderFaces.forEach((element) => {
      element.addEventListener(`click`, sliderFacesOnClick);
    });
    btnLeft.addEventListener(`click`, btnLeftOnClick);
    btnRight.addEventListener(`click`, btnRightOnClick);

    function sliderFacesOnClick(e) {
      const btn = e.target;
      sliderFaces.forEach((element) => {
        if (element === btn) {
          element.classList.add(`clients__img--active`);
        } else {
          element.classList.remove(`clients__img--active`);
        }
      });

      sliderContents.forEach((element) => {
        if (
          element.getAttribute(`data-client`) ===
          btn.getAttribute(`data-client`)
        ) {
          element.classList.add(`clients-content__item--active`);
        } else {
          element.classList.remove(`clients-content__item--active`);
        }
      });
    }

    function getActiveClient() {
      for (let i = 0; i < sliderFaces.length; i++) {
        if (sliderFaces[i].classList.contains(`clients__img--active`)) {
          return +sliderFaces[i].getAttribute(`data-client`);
        }
      }
    }

    function btnLeftOnClick() {
      let numberOfActiveClient = getActiveClient();
      if (numberOfActiveClient === 1) {
        sliderFaces[numberOfActiveClient - 1].classList.remove(
          `clients__img--active`
        );
        sliderContents[numberOfActiveClient - 1].classList.remove(
          `clients-content__item--active`
        );
        numberOfActiveClient = sliderFaces.length;
        sliderFaces[numberOfActiveClient - 1].classList.add(
          `clients__img--active`
        );
        sliderContents[numberOfActiveClient - 1].classList.add(
          `clients-content__item--active`
        );
      } else {
        sliderFaces[numberOfActiveClient - 1].classList.remove(
          `clients__img--active`
        );
        sliderContents[numberOfActiveClient - 1].classList.remove(
          `clients-content__item--active`
        );
        sliderFaces[numberOfActiveClient - 2].classList.add(
          `clients__img--active`
        );
        sliderContents[numberOfActiveClient - 2].classList.add(
          `clients-content__item--active`
        );
      }
    }
    function btnRightOnClick() {
      let numberOfActiveClient = getActiveClient();
      if (numberOfActiveClient === sliderFaces.length) {
        sliderFaces[numberOfActiveClient - 1].classList.remove(
          `clients__img--active`
        );
        sliderContents[numberOfActiveClient - 1].classList.remove(
          `clients-content__item--active`
        );
        numberOfActiveClient = 1;
        sliderFaces[numberOfActiveClient - 1].classList.add(
          `clients__img--active`
        );
        sliderContents[numberOfActiveClient - 1].classList.add(
          `clients-content__item--active`
        );
      } else {
        sliderFaces[numberOfActiveClient - 1].classList.remove(
          `clients__img--active`
        );
        sliderContents[numberOfActiveClient - 1].classList.remove(
          `clients-content__item--active`
        );
        sliderFaces[numberOfActiveClient].classList.add(`clients__img--active`);
        sliderContents[numberOfActiveClient].classList.add(
          `clients-content__item--active`
        );
      }
    }

    function getMaxSliderHeight() {
      let res = 0;
      for (let i = 0; i < sliderContents.length; i++) {
        if (sliderContents[i].scrollHeight > res)
          res = sliderContents[i].scrollHeight;
      }
      return res;
    }
  }
  feedbackSlider();
  // feedback end

  // ! gallery start
  function setGallery() {
    const gallery = document.querySelector(`.gallery__list`);
    const btnLoadMore = document.querySelector(`.gallery .btn-load-more`);

    const grid = document.querySelector(`.gallery__list`);
    const msnry = new Masonry(grid, {
      columnWidth: 378,
      itemSelector: ".gallery__item",
      gutter: 5,
    });

    btnLoadMore.addEventListener(`click`, btnLoadMoreOnClick);

    function btnLoadMoreOnClick(e) {
      e.preventDefault();
      btnLoadMore.classList.add(`btn-load-more__loading`);

      setTimeout(() => {
        btnLoadMore.style.display = `none`;

        const elems = [];
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= 10; i++) {
          const elem = document.createElement(`li`);
          elem.classList.add(`gallery__item`);
          elem.innerHTML = `
					<img src="./img/gallery/wordpress${i}.jpg" alt="gallery-1" width="284" height="206" class="gallery__img">
					<div class="gallery__img-info">
					<a href="#" class="gallery__zoom">Увеличить изображение</a>
					<a href="./img/gallery/wordpress${i}.jpg" target="_blank" class="gallery__open">Открыть
					изображение в новом
					окне</a>
					</div>
					`;
          fragment.appendChild(elem);
          elems.push(elem);
        }
        gallery.appendChild(fragment);
        msnry.appended(elems);
      }, 2000);
    }

    setGalleryPopup(gallery);
  }
  setGallery();

  function setGalleryPopup(gallery) {
    const galleryPopup = document.querySelector(`.gallery-popup`);

    gallery.addEventListener(`click`, galleryOnClick);
    galleryPopup.addEventListener(`click`, galleryPopupOnClick);

    function galleryOnClick(e) {
      const target = e.target;

      if (target && target.classList.contains(`gallery__zoom`)) {
        e.preventDefault();

        const imgSrc = target
          .closest(`li`)
          .querySelector(`.gallery__img`)
          .getAttribute(`src`);
        const galleryPopupImg = document.querySelector(`.gallery-popup__img`);

        galleryPopupImg.setAttribute(`src`, imgSrc);
        galleryPopup.classList.remove(`gallery-popup__opacity`);
        galleryPopup.style.display = `flex`;
        document.body.classList.add(`popup-is-open`);
      }
    }

    function galleryPopupOnClick(e) {
      const target = e.target;
      if (!target.classList.contains(`gallery-popup__img`)) {
        galleryPopup.classList.add(`gallery-popup__opacity`);
        document.body.classList.remove(`popup-is-open`);
        setTimeout(() => {
          galleryPopup.style.display = `none`;
        }, 750);
      }
    }
  }
  // gallery end
});
