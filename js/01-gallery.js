import { galleryItems } from "./gallery-items.js";

const listGallery = document.querySelector(".gallery");

function createGalleryMarkup() {
  return galleryItems
    .map(
      ({ preview, original, description }) => `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
                </a>
            </li>`
    )
    .join("");
}

listGallery.insertAdjacentHTML("beforeend", createGalleryMarkup());
listGallery.addEventListener("click", onImgClick);

let instance;

function onImgClick(evt) {
  evt.preventDefault();
  
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  const dataSource = evt.target.dataset.source;
  instance = basicLightbox.create(`
    <img src="${dataSource}" width="800" height="600">
`);
  instance.show();
  document.addEventListener("keydown", closeModal);
}

function closeModal(evt) {
  if (evt.code === "Escape") {
    instance.close();
    document.removeEventListener("keydown", closeModal);
  }
}
