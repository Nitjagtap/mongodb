const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

router.post("/insert",controller.insert);

router.get("/select",controller.select);

router.get("/aggregate",controller.aggregate);

router.get("/sort",controller.order);

router.delete("/delete",controller.delete);

router.put("/update",controller.update);



module.exports = router;
