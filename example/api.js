import $ from 'jQuery';
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/JonCYousef';

function apiFetch(...args) {
  return fetch(...args).then((res) => {
    if (!res.ok) {
      $('h1').append(`<h2 class="error">🔥${res.statusType}🔥</h2>`);
    }
    return res.json();
  });
}

function getItems() {
  return apiFetch(`${BASE_URL}/items`);
}
// function getItems() {
//   return fetch(`${BASE_URL}/items`).catch((err) => console.error(err.message));
// }

function createItem(name) {
  const newItem = JSON.stringify({
    name,
  });
  return apiFetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newItem,
  });
}

// function createItem(name) {
//   const newItem = JSON.stringify({
//     name,
//   });
//   return fetch(`${BASE_URL}/items`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: newItem,
//   }).catch((err) => (store.error = true));
// }

function deleteItem(id) {
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'DELETE',
  });
}

function updateItem(id, updateData) {
  const stringData = JSON.stringify(updateData);
  return apiFetch(`${BASE_URL}/items/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: stringData,
  });
}

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};
