import api from './api.js';
import render from './render.js';
import store from './store.js';

function main() {
  api.getBookmarks().then((bookmarks) => {
    bookmarks.forEach((element) => {
      store.addBookmark(element);
    });
  });
  render.homePage();
  render.handleAddBookmarkClicked();

  console.log(api.getBookmarks());
}

$(main);
