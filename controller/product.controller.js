const db = require("../config/db.config.js");
const Pagination = require("../pagination.js");
const apiResponse = require("../utils/API-response.util.js");

function createProduct(req, res) {
  const body = req.body;
  res.send(body);
}
async function findAllProduct(req, res) {
 
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
    const countQuery = "SELECT COUNT(id) FROM product";
    const [[result]] = await db.query(countQuery);
    const totalItems = result["COUNT(id)"];

    const pagination = new Pagination(totalItems, +page, +limit);
    const [product] = await db.query("SELECT * FROM product LIMIT ? OFFSET ?", [
      pagination.limit,
      pagination.offSet,
    ]); 
    apiResponse(res, 200, product, null, pagination);
  } catch (error) {
    console.error(error);
  }
}

async function getByIdProduct(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM product WHERE id =?";
    const [[product]] = await db.query(query, id);
    res.json(product || null);
  } catch (error) {
    res.json({ error: error.massage });
  }
}

async function findByIdProduct(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM product WHERE id =?";
    const [[product]] = await db.query(query, id);
    res.json(product || null);
  } catch (error) {
    res.json({ error: error.massage });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const [[product]] = await db.query("SELECT * FROM product WHERE id=?", id);
    if (!product) {
      const erorr = new erorr(`Product with id:${id}not found`);
      erorr.status = 404;
      throw erorr;
    }
    const updateSql = "UPDATE product SET? WHERE id=?";
    await db.query(updateSql, [req.body, id]);
    res.send("sukkes");
  } catch (eror) {
    res.json({ erorr: eror.masage });
  }
}
async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const [[product]] = await db.query("DELETE * FROM product WHERE id=?", id);
    await db.query(query, [id]);
    res.json();
  } catch (error) {
    res.json({ error: error.message });
  }
}
module.exports = {
  createProduct,
  getByIdProduct,
  findAllProduct,
  findByIdProduct,
  updateProduct,
  deleteProduct,
};

// function findAllProduct(req, res) {
//   res.send({
//     method: req.method,
//     url: req.originalUrl,
//     id: req.id,
//     role: req.role,
//   });
// }
// function findByIdProduct(req, res) {
//   res.send({ method: req.method, url: req.originalUrl });
// }
// function updateProduct(req, res) {
//   res.send({ method: req.method, url: req.originalUrl });
// }
// function deleteProduct(req, res) {
//   res.send({ method: req.method, url: req.originalUrl });
// }
