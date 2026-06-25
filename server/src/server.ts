import { createServer } from "http";
import { PORT } from "./config/env.js";
import app from "./app.js";
import conn from "./config/db.js";

const server = createServer(app);

const startServer = async () => {
    try {
        const connection = await conn.getConnection();
        console.log("Connected to database successfully");


        connection.release();

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Error initializing server: ", error);
        process.exit(1);
    }
};


startServer();