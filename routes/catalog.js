const express = require("express");
const router = express.Router();

// Require controller modules.
const review_controller = require("../controllers/reviewController");

/// BOOK ROUTES ///

// GET catalog home page.
router.get("/", review_controller.index);

// GET request for creating a Review. NOTE This must come before routes that display Review (uses id).
router.get("/review/create", review_controller.review_create_get);

// POST request for creating Review.
router.post("/review/create", review_controller.review_create_post);

// GET request to delete Review.
router.get("/review/:id/delete", review_controller.review_delete_get);

// POST request to delete Review.
router.post("/review/:id/delete", review_controller.review_delete_post);

// GET request to update Review.
router.get("/review/:id/update", review_controller.review_update_get);

// POST request to update Review.
router.post("/review/:id/update", review_controller.review_update_post);

// GET request for one Review.
router.get("/review/:id", review_controller.review_detail);

// GET request for list of all Review items.
router.get("/reviews", review_controller.review_list);


module.exports = router;