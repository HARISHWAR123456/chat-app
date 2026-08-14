import express from "express";
import path from "path";
const app = express();  //Creates Express Application

app.use(express.json());

app.get("/",(req,res)=>{
   res.sendFile(path.join(process.cwd(), "public", "index.html"));
})

export default app;




/*

Express is not the HTTP server.
Internally, Express does something conceptually like:

const server = http.createServer(app);
server.listen(3000);

In other words,
app.listen(...);

*/

        //         server.js

        //              │

        //      imports app

        //              │

        //           app.js

        //              │

        //      express()

        //              │

        //   Express Application

        //              │

        //       app.listen()

        //              │

        //  Node HTTP Server (created internally)

        //              │

        //        Waiting for requests