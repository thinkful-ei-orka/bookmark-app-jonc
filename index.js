import api from './api.js';
import render from './render.js';
import store from './store.js';

function main() {
  api
    .getBookmarks()
    .then((bookmarks) => {
      bookmarks.forEach((element) => {
        store.addBookmark(element);
        render.render();
      });
    })
    .catch(function (err) {
      console.log(err);
      render.renderError(err);
    });
  render.homePage();
  render.bindEventListeners();
}

$(main);
