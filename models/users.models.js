import { text } from "express";
import { db } from "../databases/connection.databases.js";

const getUsers = async () => {
    const result = await db.query('SELECT * FROM users');
    console.log(result.rows); 
    return result.rows;
}

const createUser = async ({username, email, password}) => {

    try{
                    const query = {
                        text: `INSERT INTO users ( email, password, username)
                            VALUES ($1, $2, $3)
                            RETURNING username, email, uid`,
                        values: [ email, password, username ]
                    };

                    const {rows} = await db.query(query);
                    console.log(rows);
                    return rows;

    }catch(error){
        console.log(error);
        return {error: error.message};
    }
}

const findUser = async (email) => {
    const query = {
        text:`SELECT * 
              FROM users 
              WHERE email = $1`,
        values: [email]
    };
    const result = await db.query(query); 
    return result.rows[0];
}


export {getUsers, 
    createUser,
    findUser};