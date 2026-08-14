import jwt from "jsonwebtoken";

export function socketAuth(socket,next){
    try {

        const token = socket.handshake.auth.token;
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        socket.user = payload;
        socket.token = token;
        next();

    } catch (error) {
console.log(error)
        next(new Error("Unauthorized"));

    }

}