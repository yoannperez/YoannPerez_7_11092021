//                                         -------------------------------------------------------
//                                         --                 ROUTES FOR USERS                --
//                                         -------------------------------------------------------

const express = require("express");
const route = express();

//Import controller
const controller = require("../controllers/user");

//create route
route.get("/index", controller.index);
// route.get("/list", controller.list);
// route.get("/countries", controller.listCountries);
// route.get("/create", controller.create);
// route.get("/update", controller.update);
// route.get("/get/:id", controller.get);
// route.get("/delete/:id", controller.delete);



//Export route
module.exports = route;