const Review = require("../models/review");
const { body, validationResult } = require("express-validator");
const success_url = "";


const async = require("async");
const review = require("../models/review");

exports.index = (req, res) => {
  async.parallel(
    {
      review_count(callback) {
        Review.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      }
    },
    (err, results) => {
      res.render("index", {
        title: "Movie Review Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of all reviews.
exports.review_list = (req, res, next) => {
  Review.find({}, "content movie date")
  .sort({ date: 1 })
  .exec(function (err, list_reviews) {
    if (err) {
      return next(err);
    }
    //Successful, so render
    res.render("review_list", { title: "Review List", review_list: list_reviews });
  });
};

// Display detail page for a specific review.
exports.review_detail = (req, res, next) => {
  async.parallel(
    {
      review(callback) {
        Review.findById(req.params.id)
          .populate("content")
          .populate("movie")
          .populate("date")
          .exec(callback);
      }
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.review == null) {
        // No results.
        const err = new Error("Review not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("review_detail", {
        title: "Review Detail",
        review: results.review
      });
    }
  );
};


// Display review create form on GET.
exports.review_create_get = (req, res, next) => {
    res.render("review_form", { title: "Create Review" });
}
  

// Handle review create on POST.
exports.review_create_post = [
    body("content").trim().isLength({ min: 1 }).escape().withMessage("content must not be null"),
    body("movie").trim().isLength({ min: 1} ).escape().withMessage("movie title must not be null"),
    body("date").optional({ checkFalsy: true }).isISO8601().toDate(),
    (req, res, next) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            //if there are errors
            res.render("review_form", {
                title: "Create Review",
                review: body,
                errors: errors.array(),
            });
            return;
        }
        //create object
        const review = new Review({
            content: req.body.content,
            movie: req.body.movie,
            date: req.body.date,
        });
        review.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect(review.url)
        })
    }
]

// Display review delete form on GET.
exports.review_delete_get = (req, res) => {
  async.parallel(
    {
      review(callback) {
        Review.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.review == null) {
        // No results.
        res.redirect("/catalog/reviews");
      }
      // Successful, so render.
      
      
      res.render("review_delete", {
        title: "Delete Review",
        review: results.review
      });
    }
  );
};

// Handle review delete on POST.
exports.review_delete_post = (req, res) => {
  async.parallel(
    {
      review(callback) {
        Review.findById(req.body.reviewid).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      // Success
      Review.findByIdAndRemove(req.body.reviewid, (err) => {
        if (err) {
          return next(err);
        }
        // Success - go to review list
        res.redirect("/catalog/reviews");
      });
    }
  );
};

// Display review update form on GET.
exports.review_update_get = (req, res) => {
  async.parallel(
    {
      review(callback) {
        Review.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.review == null) {
        const err = new Error("Review not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("review_form", {
        title: "Update Review",
        review: results.review
      });
    }
  );};

// Handle review update on POST.
exports.review_update_post = [
  body("content").trim().isLength({ min: 1 }).escape().withMessage("content must not be null"),
  body("movie").trim().isLength({ min: 1} ).escape().withMessage("movie title must not be null"),
  body("date").optional({ checkFalsy: true }).isISO8601().toDate(),
  (req, res, next) => {
      const errors = validationResult(req);
      
      if (!errors.isEmpty()) {
          //if there are errors
          res.render("review_form", {
              title: "Create Review",
              review: body,
              errors: errors.array(),
          });
          return;
      }
      Review.findByIdAndUpdate(req.params.id, {
        content: req.body.content,
        movie: req.body.movie,
        date: req.body.date
      },
      (err) => {
        if (err) {
            return next(err);
        }
        res.redirect(`../${req.params.id}`)
  })
      //create object
      /*
      const review = new Review({
          content: req.body.content,
          movie: req.body.movie,
          date: req.body.date,
          _id: req.params.id,
      });
      review.save((err) => {
          if (err) {
              return next(err);
          }
          res.redirect(review.url)
      })
      */

  }
]
