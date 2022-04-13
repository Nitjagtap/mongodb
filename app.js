const express = require("express");
const app = express();
const routes = require("./routes/index");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/", routes);

const PORT=3001;



app.listen(PORT, () => {

	console.log(`This users app listening at : http://localhost:${PORT}`);

	

});
