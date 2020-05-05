import api from './api.js';
import render from './render.js';
import store from './store.js';

function main() {
  api.getBookmarks().then((bookmarks) => {
    bookmarks.forEach((element) => {
      store.addBookmark(element);
      render.render();
    });
  });
  render.homePage();
  render.bindEventListeners();

  console.log(api.getBookmarks());
}

$(main);
