const express = require("express");
const router = express.Router();
const publicationSchema = require("../models/publication.model");
const {
  getAllPublications,
  getPublicationById,
  getAllPublicationsByUserId,
  createPublication,
  deletePublication,
  findAllPublicationsByUserId,
} = require("../controllers/publication.controller");
const {verifyToken} = require("../middleware");

/**ENDPOINTS */

router.get("/", getAllPublications);

/**
 * Obtiene todas las publicaciones de los userId dados en un arreglo en el body.
 */
router.get("/byUsers", getAllPublicationsByUserId);

/**
 * Obtiene UNA publicación, por ID envíado por parámetro.
 */
router.get("/:id", getPublicationById );

router.post("/", verifyToken,createPublication);

router.delete("/", verifyToken,deletePublication);




/**EXPORTS */

module.exports = router;
