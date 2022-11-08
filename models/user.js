const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true, maxLength: 100 },
    membership_status: { type: String, required: true, enum: ["Non-member", "Member", "Admin"], default: "Non-member" }
});

module.exports = mongoose.model("User", UserSchema);