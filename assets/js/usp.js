---
---
const uspButtons = Array.from(document.getElementsByClassName('usp__button'));
const uspText = document.getElementById('usp__text');

const icons = ['salary.png', 'skills-big.png', 'offers-preview.png', 'career.png', 'recrutation.png'];

let texts = [];
const texts_list = document.querySelectorAll('.usp_good__text');
for (let text_item of texts_list) {
  texts.push(text_item.innerText);
}

const togglePreview = (preview) => {
  preview.classList.toggle('usp__preview--shown');
  preview.classList.toggle('usp__preview--hidden');
}

const toggleText = (text) => {
  text.classList.toggle('usp__text--shown');
  text.classList.toggle('usp__text--hidden');
}

const setButtonActive = (button, index) => {
  const activeButton = document.querySelector('.usp__button--active');
  if (activeButton) activeButton.classList.remove('usp__button--active');
  button.classList.add('usp__button--active');

  if (uspText) uspText.innerText = texts[index];

  const visibleImg = document.querySelector('.usp__preview--shown');
  const hiddenImg = document.querySelector('.usp__preview--hidden');

  const visibleText = document.querySelector('.usp__text--shown');
  const hiddenText = document.querySelector('.usp__text--hidden');

  if (visibleText && hiddenText) {
    hiddenText.innerText = texts[index];
    toggleText(visibleText);
    toggleText(hiddenText);
  }

  if (hiddenImg && visibleImg) {
    hiddenImg.src = '{{ site.baseurl }}/assets/svg/' + icons[index];
    togglePreview(visibleImg);
    togglePreview(hiddenImg);
  }

  toggleAccordion(button.parentElement.querySelector('.usp__content').id);
}

if (uspButtons) uspButtons.forEach((button, index) => button.addEventListener('click', () => setButtonActive(button, index)));

let originalHeights;
let accordions;

window.onload = () => {
  accordions = Array.from(document.getElementsByClassName('usp__content'));
  if (accordions) {
    originalHeights = accordions.map(accordion => ({ id: accordion.id, accordionHeight: accordion.offsetHeight }));
    accordions.forEach((accordion, index) => {
      if (index > 0) accordion.style.height = '0';
    });
  }
}

const toggleAccordion = (id) => {
  const accordion = document.getElementById(id);
  const accordionData = originalHeights.find(el => el.id === id);
  accordions.forEach(el => {
    if (el.id !== id && el.offsetHeight > 0) {
      el.style.height = '0';
    }
  })
  if (accordion && accordionData) {
    if (accordion.offsetHeight === 0) accordion.style.height = accordionData.accordionHeight + 'px';
    else accordion.style.height = '0';
  }
}
