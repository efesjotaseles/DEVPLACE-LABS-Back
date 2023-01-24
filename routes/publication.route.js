const express = require("express");
const router = express.Router();
const publicationSchema = require("../models/publication.model");
const {
  getAllPublications,
  getPublicationById,
  getAllPublicationsByUserId,
  createPublication,
  deletePublication,
  toggleFavedBy,
} = require("../controllers/publication.controller");

/**ENDPOINTS */

router.get("/", getAllPublications);

/**
 * Obtiene todas las publicaciones de los userId dados en un arreglo en el body.
 */
router.post("/byUsers", getAllPublicationsByUserId);

/**
 * Obtiene UNA publicación, por ID envíado por parámetro.
 */
router.get("/:id", getPublicationById );

router.post("/", createPublication);

router.delete("/", deletePublication);

router.put("/id/:id/userId/:userId", toggleFavedBy);




/**EXPORTS */

module.exports = router;
