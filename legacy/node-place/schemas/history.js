const mongoose = require("mongoose");
// 검색 내역 스키마 : 검색어 & 생성시간 스키마
const { Schema } = mongoose;
const historySchema = new Schema({
  query: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("History", historySchema);
