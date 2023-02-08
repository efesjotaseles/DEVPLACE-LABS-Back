const publicationSchema = require("../models/publication.model");

const getPublicationById = async (req, res) => {
  const id = req.params.id;
  const publication = await publicationSchema.findById(id);
  res.json(publication);
};

const getAllPublications = async (req, res, next) => {
  const publications = await publicationSchema.find().sort({ _id: -1 }); //OJO, CUANDO ESTÉ SOLUCIONADO EL TEMA DE LA FECHA, ORDENAR POR FECHA
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
      .sort({ _id: -1 })
      .then((data) => {
        console.log(`data a enviar: ${data}`);
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
      res.json({ message: "Publication deleted" });
      console.log(`DELETED: ${data}`);
    })
    .catch((error) => {
      res.json({ message: error });
      console.log(error);
    });
};
/**
 * Use a PUT mehtod pls
 * @param {*} req
 * @param {*} res
 */
const toggleFavedBy = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const publication = await publicationSchema.findById(id).catch((error) => {
    res.json({ message: error });
  });

  let favedBy = publication.favedBy;

  if (favedBy.includes(userId)) {
    const index = favedBy.indexOf(userId);
    favedBy.splice(index, 1);
  } else {
    favedBy.push(userId);
  }

  publicationSchema
    .updateOne({ _id: id }, { favedBy: favedBy, favedCount: favedBy.length })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
};

//Preguntar si es necesaria
const isFavedBy = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;
  //TODO ...
  const publication = await publicationSchema.findById(id);
  if (publication && publication.favedBy.includes(userId)) {
    res.json(true);
  } else {
    res.json(false);
  }
};

const toggleLikedBy = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const publication = await publicationSchema.findById(id).catch((error) => {
    res.json({ message: error });
  });

  let likedBy = publication.likedBy;
  let dislikedBy = publication.dislikedBy;

  if (likedBy.includes(userId)) {
    const index = likedBy.indexOf(userId);
    likedBy.splice(index, 1);
  } else {
    likedBy.push(userId); //lo agregamos en likedBy
    //Y si está en dislikedBy, lo removemos
    if (dislikedBy.includes(userId)) {
      const indexAux = dislikedBy.indexOf(userId);
      dislikedBy.splice(indexAux, 1);
    }
  }

  publicationSchema
    .updateOne(
      { _id: id },
      {
        likedBy: likedBy,
        likeCount: likedBy.length,
        dislikedBy: dislikedBy,
        dislikeCount: dislikedBy.length,
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
};

const toggleDislikedBy = async (req, res) => {
  const id = req.params.id;
  const userId = req.params.userId;
  const publication = await publicationSchema.findById(id).catch((error) => {
    res.json({ message: error });
  });

  let dislikedBy = publication.dislikedBy;
  let likedBy = publication.likedBy;

  if (dislikedBy.includes(userId)) {
    const index = dislikedBy.indexOf(userId);
    dislikedBy.splice(index, 1);
  } else {
    dislikedBy.push(userId); //lo agregamos en dislikedBy
    //Y si está en likedBy, lo removemos
    if (likedBy.includes(userId)) {
      const indexAux = likedBy.indexOf(userId);
      likedBy.splice(indexAux, 1);
    }
  }

  publicationSchema
    .updateOne(
      { _id: id },
      {
        likedBy: likedBy,
        likeCount: likedBy.length,
        dislikedBy: dislikedBy,
        dislikeCount: dislikedBy.length,
      }
    )
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ message: error });
    });
};

module.exports = {
  getAllPublications,
  getPublicationById,
  getAllPublicationsByUserId,
  createPublication,
  deletePublication,
  toggleFavedBy,
  isFavedBy,
  toggleLikedBy,
  toggleDislikedBy,
};
