const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  content: { type: String, required: true },
  movie: { type: String, required: true },
  date: { type: Date },
});

ReviewSchema.virtual("review_date").get(function() {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

ReviewSchema.virtual("url").get(function () {
  return `/catalog/review/${this._id}`;
});

// Export model
module.exports = mongoose.model("Review", ReviewSchema);