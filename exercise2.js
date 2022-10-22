const createButton = document.querySelector("[data-action=create]");
const destroyButton = document.querySelector("[data-action=destroy]");

createButton.addEventListener("click", () => {
  const inputValue = document.querySelector("input[type=number]").value;
  createBoxes(inputValue);
});

destroyButton.addEventListener("click", () => {
  destroyBoxes();
});

function createBoxes(amount) {
  createBoxesContainerIfDoesNotExist();

  const boxesContainer = document.getElementById("boxes");
  const baseDimension = getContainerLastChildWidth(boxesContainer) || 30;

  for (let i = 1; i <= amount; i++) {
    const elementDimension = baseDimension + 10 * i;
    boxesContainer.appendChild(
      createNewDiv(elementDimension, elementDimension)
    );
  }
}

function destroyBoxes() {
  const boxesContainer = document.getElementById("boxes");

  boxesContainer?.remove();
}

function getContainerLastChildWidth(container) {
  const containerChilds = container.getElementsByTagName("div");
  return containerChilds
    ? containerChilds[containerChilds.length - 1]?.offsetWidth
    : undefined;
}

function createNewDiv(width, height) {
  const newElement = document.createElement("div");
  const backGroundColor = `rgb(${getRandomColorNumber()}, ${getRandomColorNumber()}, ${getRandomColorNumber()})`;
  newElement.style.cssText = `width: ${width}px; height: ${height}px; background-color: ${backGroundColor}`;
  return newElement;
}

function getRandomColorNumber() {
  return Math.random() * (255 - 0) + 0;
}

function createBoxesContainerIfDoesNotExist() {
  if (document.getElementById("boxes")) {
    return;
  }
  const container = document.createElement("div");
  container.setAttribute("id", "boxes");
  document.body.appendChild(container);
}
