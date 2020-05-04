/**
 * API Url
 */
const url = 'https://thinkful-list-api.herokuapp.com/jonc/bookmarks';

/**
 * Main API function call that accepts all arguements passed to it
 * Then returns the response as JSON
 * @param  {...any} args
 */
function apiFetch(...args) {
  return fetch(...args).then((res) => res.json());
  console.log('apiFetch was run');
}

/**
 * Grabs the current bookmarks by running apiFetch() with URL variable
 */
function getBookmarks() {
  return apiFetch(url);
}

/**
 *
 * @param {string} name
 * @param {string} desc
 * @param {string} url
 * @param {number} rating
 */
function createBookmark(name, desc, url, rating) {
  const newBookmark = JSON.stringify({ name, desc, url, rating });
  return apiFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newBookmark,
  });
}

/**
 * Gets the id of the object needing deletion and send a DELETE request to API
 * @param {string} id
 */
function deleteBookmark(id) {
  return apiFetch(`${url}/${id}`, {
    method: 'DELETE',
  });
}

// function updateBookmark(id, updateData) {
//   const stringData = JSON.stringify(updateData);
//   return apiFetch(`${url}/${id}`, {
//     method: 'PATCH',
//     headers: { 'Content-Type': 'application/json' },
//     body: stringData,
//   });
// }

export default {
  getBookmarks,
  createBookmark,
  apiFetch,

  deleteBookmark,
};
