const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

const MenuItem = new mongoose.Schema(
    {
        name: {type: String, require: true, unique: true},
        description: {type: String, require: false, default: undefined},
        category: {type: String, require: true},
        subcategory: {type: String, require: true},
        price: {type: Number, require: true},
        allergens: {type: [String], require: false, default: undefined},
        side: {type: [String], require: false, default: undefined}
    }
);

module.exports = mongoose.model("MenuItem", MenuItem);