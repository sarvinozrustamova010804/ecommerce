

const db = require("../config/db.config.js");
const Pagination = require("../pagination.js");
const apiResponse = require("../utils/API-response.util.js");

async function creatCategory(req, res) {
  try {
    const body = req.body;
    const creatQuery =
      "INSERT INTO categories(name_uz,name_ru,desc_short,images,view_count) VALUES(?,?,?,?,?,?)";
    const parameters = [
      body.name_uz,
      body.name_ru,
      body.desc_short_ru,
      body.images, 
      body.desc_short_uz,
      body.view_count,
    ];
    await db.query(creatQuery, parameters);
    res.send("created");
  } catch (error) {
    res.send(error.massege);
  }
}
 async function findAllCategory(req, res) {
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
    const countQuery = "SELECT COUNT(id) FROM users";
    const [[result]] = await db.query(countQuery);
    const totalItems = result["COUNT(id)"];

    const pagination = new Pagination(totalItems, +page, +limit);
    const [user] = await db.query("SELECT * FROM users LIMIT ? OFFSET ?", [
      pagination.limit,
      pagination.offSet,
    ]); 
    apiResponse(res, 200, user, null, pagination);
  } catch (error) {
    console.error(error);
  }

  }
  async   function findCategoryById(req, res) {
    try {
      const id = req.params.id;
      const query = "SELECT * FROM category WHERE id =?";
      const [[category]] = await db.query(query, id);
      res.json(category || null);
    } catch (error) {
      res.json({ error: error.massage });
    }
    
  }
  async function updateCategory(req, res) {
    try {
      const id = req.params.id;
      const [[category]] = await db.query("SELECT * FROM category WHERE id=?", id);
      if (!category) {
        const erorr = new erorr(`Category with id:${id}not found`);
        erorr.status = 404;
        throw erorr;
      }
      const updateSql = "UPDATE  category SET? WHERE id=?";
      await db.query(updateSql, [req.body, id]);
      res.send("sukkes");
    } catch (eror) {
      res.json({ erorr: eror.masage });
    }
  }
  async function deleteCategory(req, res) {
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
    creatCategory,
    findAllCategory,
    findCategoryById,
    updateCategory,
    deleteCategory,
  };
  
