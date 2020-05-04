/**
 * API Url
 */
const url = 'https://thinkful-list-api.herokuapp.com/jonc/bookmarks';

/**
 * GET list of items from API
 *
 */
function getBookmarks() {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        console.log(element);
      });
    });
}

export default {
  getBookmarks,
};
