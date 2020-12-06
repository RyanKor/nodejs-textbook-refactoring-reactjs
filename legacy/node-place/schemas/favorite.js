const mongoose = require("mongoose");
// 즐겨찾기 : 장소 아이디, 장소명, 좌표, 생성시간
const { Schema } = mongoose;
const favoriteSchema = new Schema({
  placeId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: { type: [Number], index: "2dsphere" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
