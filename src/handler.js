/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
const { nanoid } = require("nanoid");
const books = require("./books");
// menyimpan data
const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);
  const newBook = {
    // eslint-disable-next-line max-len
    name, year, author, summary, publisher, pageCount, readPage, finished, reading, id, insertedAt, updatedAt,
  }; 
  // properti name kosong
  if (name === undefined || name == null) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // nilai properti readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  books.push(newBook);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // gagal menyimpan
  const response = h.response({
    status: "fail",
    message: "Gagal menambahkan buku",
  });
  response.code(500);
  return response;
};

// menampilkan semua data
function getAllBookHandler(request, h) {
  // request.query
  const { name, finished, reading } = request.query;
  let filterBuku = books;
  if (finished) {
    filterBuku = books.filter((b) => b.finished === (finished === "1"));
  }
  if (reading) {
    // eslint-disable-next-line no-unused-vars
    filterBuku = books.filter((b) => b.reading === (reading === "1"));
  }
  if (name !== undefined) {
    // if (contacts[i].name.toLowerCase() === name.toLowerCase())  ,refensi not case sensitive
    // data.filter(x => x.title.toLowerCase().includes(term.toLowerCase()))
    filterBuku = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
  }
  const response = h.response({
    status: "success",
    data: {
      books: books.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  });
  response.code(200);
  return response;
}
// menampilkan detail  berdasarkan id
function getBookByIdHandler(request, h) {
  const { bookId } = request.params;
  const book = books.filter((b) => b.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: "success",
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
}

// edit data
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);

  if (name === undefined || name === null) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // nilai properti readPage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  // jika ok
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

// menghapus data
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });

  response.code(404);
  return response;
};

module.exports = {
  addBookHandler, getAllBookHandler, getBookByIdHandler, editBookByIdHandler, deleteBookByIdHandler,
};
