const mysql = require('mysql2');

const settings = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'homnayangi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(settings);

const promisePool = pool.promise();

const getUsers = async () => {
    let sql = "SELECT * FROM  tbl_user";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getRecipes = async () => {
    let sql = "SELECT * FROM tbl_recipe";
    const [rows, fields] = await promisePool.query(sql);
    return rows;
}

const getUserByUsername = async ( user_name, user_email ) => {
    let sql = "SELECT * FROM  tbl_user WHERE user_name = ? OR user_email = ?";
    const [rows, fields] = await promisePool.query(sql, [user_name, user_email]);
    return rows;
}

const getUsernameAndEmail = async (user_name, user_email) => {
    let sql = "SELECT * FROM tbl_user WHERE user_name = ? AND user_email = ?";
    const [rows, fields] = await promisePool.query(sql, [user_name, user_email]);
    return rows;
}

const getUserById = async ( user_id ) => {
    let sql = "SELECT * FROM  tbl_user WHERE user_id = ?";
    const [rows, fields] = await promisePool.query(sql, [user_id]);
    return rows;
}

const getUserLogin = async({ user_name, user_password }) => {
    let sql = "SELECT * FROM tbl_user WHERE user_name = ? AND user_password = ?";
    const [rows, fields] = await promisePool.query(sql, [user_name, user_password]);
    return rows;
}

const addNewUser = async ({user_name, user_password, user_email}) => {
    const sql = "INSERT INTO tbl_user (user_name, user_password, user_email) VALUES (?, ?, ?)";
    await promisePool.query(sql, [user_name, user_password, user_email]);
}

const updatePassword = async (user_id, user_password) => {
    let sql = "UPDATE tbl_user SET user_password = ? WHERE user_id = ?";
    await promisePool.query(sql, [user_password, user_id]);
}

const updateVerifyCode = async (user_id, verify_code) => {
    let sql = "UPDATE tbl_user SET verify_code = ? WHERE user_id = ?";
    await promisePool.query(sql, [verify_code, user_id]);
}

module.exports = {
    getUsers: getUsers,
    getRecipes: getRecipes,
    addNewUser: addNewUser,
    getUserByUsername: getUserByUsername,
    getUserLogin: getUserLogin,
    getUserById: getUserById,
    updatePassword: updatePassword,
    getUsernameAndEmail: getUsernameAndEmail,
    updateVerifyCode: updateVerifyCode
}