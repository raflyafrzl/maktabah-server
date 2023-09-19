const Categories = require("../../api/v2/categories/model");
const Bibliografi = require("../../api/v2/bibliografi/model");
const TableOfContent = require("../../api/v2/table-of-content/model");
const Content = require("../../api/v2/content/model");
const { NotFoundError } = require("../../errors");

const { Client } = require("elasticsearch");

const getAllCategories = async () => {
  const result = await Categories.find({}).populate({
    path: "subCategories",
    select: "_id name",
  });
  return result;
};

const getOneCategories = async (req) => {
  const { id } = req.params;

  const result = await Categories.find({ _id: id }).populate({
    path: "subCategories",
    select: "_id name",
  });
  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id: ${id}`);

  return result;
};

const getAllBooks = async (req) => {
  const { id } = req.params;
  const result = await Bibliografi.find({ sub_category: id }).select(
    "_id title creator image"
  );

  if (!result.length) {
    const resultC = await Bibliografi.find({ category: id }).select(
      "_id title creator image"
    );
    return resultC;
  }
  return result;
};

const getContent = async (req) => {
  const { bookId, contentPage } = req.query;
  let contentData = {};
  const bookDetail = await Bibliografi.findOne({ _id: bookId }).select(
    "title creator date_created"
  );
  const tableOfContentsData = await TableOfContent.find({ book: bookId })
    .select("-_id page text sub children")
    .sort({ page: "asc" });

  if (!contentPage) {
    contentData = await Content.find({ book: bookId })
      .sort({ page: 1 })
      .limit(1);
  } else {
    contentData = await Content.find({ book: bookId, page: contentPage });
  }

  const data = {
    title: bookDetail.title,
    creator: bookDetail.creator,
    date_created: bookDetail.date_created,
    table_of_content: tableOfContentsData,
    content: {
      page: contentData[0].page,
      text: contentData[0].text,
    },
  };
  return data;
};

const searchBook = async (req) => {
  const { keyword } = req.query;
  const client = new Client({
    node: "http://localhost:9200",
  });
  const body = {
    query: {
      match: {
        text: keyword,
      },
    },
    highlight: {
      fields: {
        text: {},
      },
    },
  };

  const result = await client.search({ body });
  const extractedData = [];

  result.hits.hits.forEach((hit) => {
    const extractedItem = {
      page: hit._source.page,
      book: hit._source.book,
      highlightText: hit.highlight.text,
    };
    extractedData.push(extractedItem);
  });
  return extractedData;
};

module.exports = {
  getAllCategories,
  getOneCategories,
  getAllBooks,
  getContent,
  searchBook,
};
