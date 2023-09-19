const Tableofcontent = require("../../api/v2/table-of-content/model");
const Bibliography = require("../../api/v2/bibliografi/model");
const { BadRequestError, NotFoundError } = require("../../errors");

const createTableOfContent = async (req) => {
  const { page, text, children, book } = req.body;
  const checkBook = await Bibliography.findOne({
    _id: book,
  });
  if (!checkBook)
    throw new NotFoundError("Buku tidak ditemukan, mohon untuk pilih buku!");
  const check = await Tableofcontent.findOne({ page, book });
  if (check)
    throw new BadRequestError(
      "Gagal menyimpan,Table of content dengan page di buku tersebut sudah tersedia"
    );
  const result = await Tableofcontent.create({
    page,
    text,
    children,
    book,
  });
  return result;
};

const getAllTableOfContents = async () => {
  const toc = await Tableofcontent.find({}).sort({ page: "asc" });
  const biblio = await Bibliography.find().select("_id title");

  let result = toc.map((res) => {
    let book = biblio.find((bib) => bib._id === res.book);
    return { ...res.toObject(), title: book.title };
  });
  return result;
};

const deleteTableOfContents = async (req) => {
  const { id } = req.params;
  const result = await Tableofcontent.deleteOne({ _id: id });
  return result;
};

const updateTableOfContents = async (req) => {
  const { text, children } = req.body;
  const { id } = req.params;
  const result = await Tableofcontent.findByIdAndUpdate(
    { _id: id },
    { text, children },
    {
      runValidators: true,
      new: true,
    }
  );
  return result;
};

module.exports = {
  createTableOfContent,
  getAllTableOfContents,
  deleteTableOfContents,
  updateTableOfContents
};
