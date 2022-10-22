var currentPage = 0;
var searchPhrase = "";
var timeout;

const observer = new IntersectionObserver((entries) => {
  if (entries[0].intersectionRatio <= 0 || entries[0].intersectionRect.y === 0)
    return;
  getData(searchPhrase);
});

const searchInput = document.querySelector("[type=text]");

searchInput.addEventListener("input", (e) => {
  window.clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (!e.target.value) {
      clearList();
      return;
    }
    if (e.target.value.length < 100) {
      searchPhrase = e.target.value;
      clearList();
      getData(e.target.value);
    }
  }, 300);
});

async function getData(searchPhrase) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=30762561-e1f3f390912826999d7a057ac&per_page=20&page=${
        currentPage + 1
      }&q=${searchPhrase}`
    );
    const data = await response.json();

    currentPage += 1;

    displayData(data.hits);
  } catch (error) {
    console.log(error);
  }
}

function clearList() {
  const list = document.querySelector("ul");
  let lastChild = list.lastElementChild;
  while (lastChild) {
    list.removeChild(lastChild);
    lastChild = list.lastElementChild;
  }
  currentPage = 0
}

function displayData(data) {
  const list = document.querySelector("ul");
  data.forEach((imageItem) => {
    const listItem = document.createElement("li");
    const link = createLink(imageItem);
    const image =createImage(imageItem);

    link.appendChild(image);
    listItem.appendChild(link);
    list.appendChild(listItem);
  });
  addScrollObserver();
}

function addScrollObserver() {
    const list = document.querySelector("ul");
    observer.observe(list.lastElementChild);
}

function createLink(imageItem) {
    const link = document.createElement("a");
    link.addEventListener("click", (e) => openModal(e, imageItem));
    link.setAttribute("href", imageItem.largeImageURL);
    return link;
}

function createImage(imageItem) {
    const image = document.createElement("img");
    image.setAttribute("src", imageItem.webformatURL);
    image.setAttribute("data-source", imageItem.largeImageURL);
    image.setAttribute("alt", imageItem.tags);
    return image
}

function openModal(event, imageItem) {
  event.preventDefault();
  const instance = basicLightbox.create(`
  <div class="modal">
    <img src="${imageItem.largeImageURL}"/>
  </div>
`);
  instance.show();
}
