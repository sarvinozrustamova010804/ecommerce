const db = require("../config/db.config.js");
const apiResponse = require("../utils/API-response.util.js");
const Pagination = require('../utils/API-response.util.js');

async function creatUser(req, res) {
  sqlQuery = "INSERT INTO users (name,last_name,phone,email,password) VALUES(?,?,?,?)";
  const { name, lastName, phone, email,password } = req.body;
  await db.query(sqlQuery, [name, lastName, phone, email,password]);
  res.send("Created");
}

async function findAllUser(req, res) {
  try {
    const page=req.query.page
      const limit=+req.query.limit

      if(req.query.page && req.query.limit && (inNaN(page)|| page<1 ||isNaN(limit)|| limit<1)){
        const error=new error("limit or|and page must be a positive intiger")
        error.status=400
        throw error
      }
     const countQuery= "SELECT COUNT(id)FROM users";
    // const query = "SELECT * FROM users";
    // const [users, colums] = await db.query(query);
    const [[result]] = await db.query(countQuery );
    const totalItems=result["COUNT(id)"]

    const pagination= new Pagination(totalItems,+page,+limit)
    const[user]=await db.query("SELECT * FROM users LIMIT? OFFSET?",[pagination.limit,pagination.offSet])
    apiResponse(res,200,users,null,pagination)
    // console.table(users);
    // res.json(users);
  } catch (error) {
    apiResponse(res,error.status || 500,null,error,massage)
    // console.error(error);
  }
}

async function getByIdUser(req, res) {
  try {
    const id = req.params.id;
    const query = "SELECT * FROM users WHERE id =?";
    const [[user]] = await db.query(query, id);
    res.json(user || null);
  } catch (error) {
    res.json({ error: error.massage });
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const [[user]] = await db.query("SELECT * FROM users WHERE id=?", id);
    // check if user exists
    if (!user) {
      const erorr = new erorr(`User with id:${id}not found`);
      erorr.status = 404;
      throw erorr;
    }
    const updateSql = "UPDATE users SET? WHERE id=?";
    await db.query(updateSql, [req.body, id]);
    res.send("sukkes");
  } catch (eror) {
    res.json({ erorr: erorr.masage });
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id;
    const [[user]] = await db.query("DELETE * FROM users WHERE id=?", id);
    await db.query(query, [id]);
    res.json();
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = {
  creatUser,
  findAllUser,
  getByIdUser,
  updateUser,
  deleteUser,
};
