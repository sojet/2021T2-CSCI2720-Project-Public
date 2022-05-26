/*
    1155125983 SO Siu Ho Aeon
    1155127434 HO Chun Lun
    1155127648 TSANG Ho San
    1155128632 LAM Kin Hong
    1155157707 CHOI Siu Hin
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    postTime: { type: Date},
    content: {type: String},
    location_id: {type: Schema.Types.ObjectId, ref: 'weatherlocation'},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'}
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = {Comment};