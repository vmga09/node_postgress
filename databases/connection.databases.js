import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const config = {
    "user": process.env.DB_USER,
    "host": process.env.DB_HOST,
    "database": process.env.DB_NAME,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT
}

const connectionString = `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`

const db = new Pool(
    {
        connectionString,
        allowExitOnIdle: true
    }
);

try {
    await db.query('SELECT NOW()');
    console.log("Database connected");
} catch (error) {
    console.log(error);
    
}



export {db}