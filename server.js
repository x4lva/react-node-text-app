const express = require("express")
const app = express()
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http")

const PORT = 5000;

mongoose.connect(
    "mongodb+srv://x4lva:dimonchak@cluster0.tuqkc.mongodb.net/notes?retryWrites=true&w=majority",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
).then(r => {
    console.log("DataBase connected successfully")
});

mongoose.set("useFindAndModify", false);

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

const server = http.createServer(app);

const io = socketIo(server);

server.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

io.on("connection", (socket) => {

})

app.use("/note", require("./routes/Note"));
app.use("/user", require("./routes/User"));
