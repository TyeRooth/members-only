const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
    text: { type: String, required: true },
    timestamp: {type: Date },
    user: { type: Schema.Types.ObjectId, ref: "User" }
});

MessageSchema.virtual("date").get(function () {
    const year = this.timestamp.getFullYear();
    const month = this.timestamp.getMonth() + 1;
    const day = this.timestamp.getDate();
    return `${ month }-${ day }-${ year }`;
});

module.exports = mongoose.model("Message", MessageSchema);