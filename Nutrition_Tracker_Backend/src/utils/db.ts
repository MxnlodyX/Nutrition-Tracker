import { Pool } from "pg";

// โหลด dotenv เฉพาะตอนรันใน local เท่านั้น
if (process.env.NODE_ENV !== "production") {
    await import("dotenv").then(({ default: dotenv }) => dotenv.config());
}

const pool = new Pool(
    process.env.DATABASE_URL
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        }
        : {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            port: Number(process.env.DB_PORT),
            ssl: { rejectUnauthorized: false },
        }
);

export default pool;
