const MenuItem = require("../models/menu-item");

function createMenuItem(req, res) {
    const menuItem = new MenuItem(req.body);

    menuItem
        .save()
        .then(function() {return res.status(201).json({success: true, id: menuItem._id})})
        .catch(function(error) {return res.status(400).json({error})});
}

// function getMenuItemsBySubcateogry(req, res) {
//     MenuItem.find({subcategory: req.params.subcategory}, function(err, items) {
//         if (!err) {
//             return res.status(200).json({success: true, data: items});
//         } else {
//             return res.status(400).json({success: false, error: err})
//         }
//     })
// }

function getMenu(req, res) {
    MenuItem.find({}, function(err, items) {
        if (!err) {
            return res.status(200).json({success: true, data: items});
        } else {
            return res.status(400).json({success: false, error: err})
        }
    })
}

module.exports = {
    createMenuItem,
    // getMenuItemsBySubcateogry,
    getMenu
};