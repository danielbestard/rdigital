const express = require("express");
const MenuItemCtrl = require("../controllers/menu-item-ctrl");

const router = express.Router();

router.post("/menu/item", MenuItemCtrl.createMenuItem);
// router.get("/menu/:subcategory", MenuItemCtrl.getMenuItemsBySubcateogry);
router.get("/menu", MenuItemCtrl.getMenu);

module.exports = router;