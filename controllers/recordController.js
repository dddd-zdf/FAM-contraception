const Record = require("../models/record");

//index page
exports.index = (req, res) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
};

//display all records
exports.record_list = (req, res) => {
    res.send("record list");
};

//detail page
exports.record_detail = (req, res) => {
    res.send(`detail page, ${req.params.id}`);
};

//display create form on GET
exports.record_create_get = (req, res) => {
    res.send("create_get");
};

//handle create on POST
exports.record_create_post = (req, res) => {
    res.send("create_post");
};

//display delete on GET
exports.record_delete_get = (req, res) => {
    res.send("delete_get");
};

//handle delete on POST
exports.record_delete_post = (req, res) => {
    res.send("delete_post");
};


//display update on GET
exports.record_update_get = (req, res) => {
    res.send("update_get");
};


//handle update on POST
exports.record_update_post = (req, res) => {
    res.send("update_post");
};