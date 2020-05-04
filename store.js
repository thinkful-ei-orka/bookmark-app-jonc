const bookmarks = [];

function addBookmark(bookmark) {
  bookmarks.push(bookmark);
}
function findById(id) {
  return bookmarks.find((e) => e.id === id);
}

export default {
  addBookmark,
  findById,
};
