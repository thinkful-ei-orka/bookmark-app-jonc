/**
 * API Url
 */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jonc';

/**
 * Main API function call that accepts all arguements passed to it
 * Then returns the response as JSON
 * @param  {...any} args
 */
function apiFetch(...args) {
  let error = false;
  return fetch(...args)
    .then((response) => {
      if (!response.ok) {
        error = { code: response.status };
      }

      return response.json();
    })
    .then((data) => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      return data;
    });
}

/**
 * Grabs the current bookmarks by running apiFetch() with URL variable
 */
function getBookmarks() {
  return apiFetch(`${BASE_URL}/bookmarks/`);
}

/**
 *
 * @param {string} name
 * @param {string} desc
 * @param {string} url
 * @param {number} rating
 */
function createBookmark(bookmark) {
  let newBookmark = JSON.stringify(bookmark);
  return apiFetch(`${BASE_URL}/bookmarks`, {
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
  return apiFetch(`${BASE_URL}/bookmarks/${id}`, {
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
