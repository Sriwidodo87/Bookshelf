const {
  addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler,
} = require("./handler");

const routes = [
  // route untuk menyimpan buku
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },

  // route menampilkan seluruh buku
  {
    method: "GET",
    path: "/books",
    handler: getAllBookHandler,
  },

  // route menampilkan buku berdasarkan id buku
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBookByIdHandler,
  },
  // route update data buku
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookByIdHandler,
  },
  // route delete buku by id buku
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
