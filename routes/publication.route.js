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
  isFavedBy,
  toggleLikedBy,
  toggleDislikedBy,
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
router.get("/:id", getPublicationById);

router.post("/", createPublication);

router.delete("/", deletePublication);

/**
 *
 */
router.put("/fav/id/:id/userId/:userId", toggleFavedBy);

router.get("/fav/id/:id/userId/:userId", isFavedBy);

router.put("/like/id/:id/userId/:userId", toggleLikedBy);
router.put("/dislike/id/:id/userId/:userId", toggleDislikedBy);

/**EXPORTS */

module.exports = router;
