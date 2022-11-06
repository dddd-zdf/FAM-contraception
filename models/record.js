const mongoose = require("mongoose");

const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  temprature: { 
    type: Number,
    min: [35.5, "too low"],
    max: [39.0, "too high"],
  },
  secretion: { 
    type: String,
    enum: ["transparent", "sticky", "dry", "period"],
  },
  //cervix height: left for possible future use
  /*
  cervix: {
    type: String,
    enum: ["high", "low"]
  },
  */
  date: { type: Date },
});

RecordSchema.virtual("formatted_date").get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
  });

// Export model
module.exports = mongoose.model("Author", RecordSchema);
