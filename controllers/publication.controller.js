const publicationSchema = require("../models/publication.model");

const getPublicationById = async (req, res) => {
  const id = req.params.id;
  const publication = await publicationSchema.findById(id);
  res.json(publication);
};

const getAllPublications = async (req, res) => {
  const publications = await publicationSchema.find();
  res.json(publications);
};

/**
 *
 * @param {*} req En el body se manda un arreglo con los userId (uno o más).
 * @param {*} res
 */
const getAllPublicationsByUserId = async (req, res) => {
  if (req.body) {
    const userId = req.body;
    console.log(userId);
    const publications = await publicationSchema
      .find({
        userId: { $in: userId },
      })
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
        res.json({ message: "error" });
      });
  }
};

/**
 * Guarda una publicación en la base de datos.
 * @param {*} req La publicación debe estar dentro del body de la request.
 * @param {*} res Se devuelve la publicación si hay éxito, y el error si lo hubo.
 */
const createPublication = async (req, res) => {
  const publication = publicationSchema(req.body);
  console.log(publication);
  publication
    .save()
    .then((data) => {
      res.json(data);
      console.log(`SAVED: ${data}`);
    })
    .catch((error) => {
      res.json({ message: error });
      console.log(error);
    });
};

/**
 * Elimina una publicación de la base de datos, por id enviado mediante parámetro.
 * @param {*} req
 * @param {*} res
 */
const deletePublication = async (req, res) => {
  const id = req.query.id;
  await publicationSchema
    .remove({ _id: id })
    .then((data) => {
      res.json({ message: "Publication eliminada" });
      console.log(`DELETED: ${data}`);
    })
    .catch((error) => {
      res.json({ message: error });
      console.log(error);
    });
};

module.exports = {
  getAllPublications,
  getPublicationById,
  getAllPublicationsByUserId,
  createPublication,
  deletePublication,
};
