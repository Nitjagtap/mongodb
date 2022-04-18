const express = require("express");
const controller = require("../controllers/controller");
const router = express.Router();

pouter.post("/insert",controller.insert);

router.get("/select",controller.select);

router.get("/filter",controller.sort);

router.get("/sort",controller.order);

router.delete("/delete",controller.delete);

router.put("/update",controller.update);



module.exports = router;
