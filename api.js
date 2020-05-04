/**
 * API Url
 */
const url = 'https://thinkful-list-api.herokuapp.com/jonc/bookmarks';

function apiFetch(...args) {
  return fetch(...args).then((res) => res.json());
}

function getBookmarks() {
  return apiFetch(url);
}

function createBookmark(name) {
  const newBookmark = JSON.stringify({ name, desc, url, rating });
  return apiFetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newBookmark,
  });
}
function deleteBookmark(id) {
  return apiFetch(url, {
    method: 'DELETE',
  });
}

function updateBookmark(id, updateData) {
  const stringData = JSON.stringify(updateData);
  return apiFetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: stringData,
  });
}

export default {
  getBookmarks,
  createBookmark,
  apiFetch,
  updateBookmark,
  deleteBookmark,
};
