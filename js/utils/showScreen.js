const showScreen = (htmlElements) => {
  const mainBlock = document.querySelector(`#main`);
  if (mainBlock.lastElementChild !== null) {
    [...mainBlock.children].forEach((element) => element.remove());
  }
  mainBlock.append(htmlElements);
};

export {showScreen};
