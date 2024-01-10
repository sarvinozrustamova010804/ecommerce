const db = require("../config/db.config.js");
const Pagination = require("../pagination.js");
const apiResponse = require("../utils/API-response.util.js");

function createAddresses(req, res) {
  const body = req.body;
  res.send(body);
}
async function findAllAddresses(req, res) {
 
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
    const countQuery = "SELECT COUNT(id) FROM addresses";
    const [[result]] = await db.query(countQuery);
    const totalItems = result["COUNT(id)"];

    const pagination = new Pagination(totalItems, +page, +limit);
    const [addresses] = await db.query("SELECT * FROM addresses LIMIT ? OFFSET ?", [
      pagination.limit,
      pagination.offSet,
    ]); 
    apiResponse(res, 200, addresses, null, pagination);
  } catch (error) {
    console.error(error);
  }
}

async function getByIdAddresses(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM addresses WHERE id =?";
    const [[addresses]] = await db.query(query, id);
    res.json(addresses || null);
  } catch (error) {
    res.json({ error: error.massage });
  }
}

async function findByIdAddresses(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM addresses WHERE id =?";
    const [[addresses]] = await db.query(query, id);
    res.json(addresses || null);
  } catch (error) {
    res.json({ error: error.massage });
  }
}

async function updateAddresses(req, res) {
  try {
    const id = req.params.id;
    const [[addresses]] = await db.query("SELECT * FROM addresses ", id);
    if (!addresses) {
      const erorr = new erorr(`Addresses with id:${id}not found`);
      erorr.status = 404;
      throw erorr;
    }
    const updateSql = "UPDATE addresses SET? ";
    await db.query(updateSql, [req.body, id]);
    res.send("sukkes");
  } catch (eror) {
    res.json({ erorr: eror.masage });
  }
}

async function deleteAddresses(req, res) {
  try {
    const id = req.params.id;
    const [[addresses]] = await db.query("DELETE * FROM addresses ", id);
    await db.query(query, [id]);
    res.json();
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  createAddresses,
  getByIdAddresses,
  findAllAddresses,
  findByIdAddresses,
  updateAddresses,
  deleteAddresses,
};