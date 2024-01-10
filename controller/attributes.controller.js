const db = require("../config/db.config.js");
const Pagination = require("../pagination.js");
const apiResponse = require("../utils/API-response.util.js");

function createAttributes(req, res) {
  const body = req.body;
  res.send(body);
}
async function findAllAttributes (req, res) {
 
  try {
    const page = req.query.page;
    const limit = +req.query.limit;

    if (
      req.query.page &&
      req.query.limit &&
      (inNaN(page) || page < 1 || isNaN(limit) || limit < 1)
    ) {
      error.status = 400;
      throw error;
    }
    const countQuery = "SELECT COUNT(id) FROM attributes";
    const [[result]] = await db.query(countQuery);
    const totalItems = result["COUNT(id)"];

    const pagination = new Pagination(totalItems, +page, +limit);
    const [attributes] = await db.query("SELECT * FROM addresses LIMIT ? OFFSET ?", [
      pagination.limit,
      pagination.offSet,
    ]); 
    apiResponse(res, 200, attributes, null, pagination);
  } catch (error) {
    console.error(error);
  }
}

async function getByIdAttributes(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM attributes WHERE id =?";
    const [[attributes]] = await db.query(query, id);
    res.json(attributes || null);
  } catch (error) {
    res.json({ error: error.massage });
  }
}

async function findByIdAttributes(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM attributes WHERE id =?";
    const [[attributes]] = await db.query(query, id);
    res.json(attributes || null);
  } catch (error) {
    res.json({ error: error.massage });
  }
}

async function updateAttributes(req, res) {
  try {
    const id = req.params.id;
    const [[attributes]] = await db.query("SELECT * FROM attributes ", id);
    if (!attributes) {
      const erorr = new erorr(`Attributes with id:${id}not found`);
      erorr.status = 404;
      throw erorr;
    }
    const updateSql = "UPDATE attributes SET? ";
    await db.query(updateSql, [req.body, id]);
    res.send("sukkes");
  } catch (eror) {
    res.json({ erorr: eror.masage });
  }
}

async function deleteAttributes(req, res) {
  try {
    const id = req.params.id;
    const [[attributes]] = await db.query("DELETE * FROM attributes ", id);
    await db.query(query, [id]);
    res.json();
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  createAttributes,
  getByIdAttributes,
  findAllAttributes,
  findByIdAttributes,
  updateAttributes,
  deleteAttributes,
};