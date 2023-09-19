const Content = require("../../api/v2/content/model");
const Bibliography = require("../../api/v2/bibliografi/model");
const { BadRequestError, NotFoundError } = require("../../errors");
const axios = require("axios");
const { Client } = require("elasticsearch");

const createContent = async (req) => {
  const { page, text, book } = req.body;

  const checkBook = await Bibliography.findOne({ _id: book });
  if (!checkBook)
    throw new NotFoundError(`Tidak ditemukkan buku dengan id ${book}`);
  const check = await Content.findOne({ book, page });

  if (check)
    throw new BadRequestError(
      "Gagal menyimpan konten, karena halaman ini sudah digunakan"
    );
  const result = await Content.create({ page, text, book });
  const response = await axios.post(
    "http://localhost:9200/maktabah_versi2/_doc",
    { page, book, text }
  );

  return result;
};

const getContent = async () => {
  const result = await Content.find().select("text page book");
  const biblio = await Bibliography.find().select("_id title");

  let coba = result.map((res) => {
    let book = biblio.find((bib) => bib._id === res.book);
    return { ...res.toObject(), title: book.title };
  });

  return coba;
};

const deleteContent = async (req) => {
  const { id } = req.params;
  const { page, book } = req.query;

  const result = await Content.deleteOne({ _id: id });
  const client = new Client({
    node: "http://localhost:9200", // Replace with your Elasticsearch server's URL
  });

  // Define the search query
  const searchQuery = {
    index: "maktabah_versi2", // Replace with your index name
    body: {
      query: {
        bool: {
          must: [{ match: { page } }, { match: { book } }],
        },
      },
    },
  };
  client
    .search(searchQuery)
    .then((response) =>
      client.delete({ index: "maktabah_versi2", id: response.hits.hits[0]._id })
    );

  return result;
};

const updateContent = async (req) => {
  const { id } = req.params;
  const { text } = req.body;
  const result = await Content.findByIdAndUpdate(
    { _id: id },
    { text },
    {
      runValidators: true,
      new: true,
    }
  );
  return result;
};

module.exports = {
  deleteContent,
  createContent,
  getContent,
  updateContent,
};
