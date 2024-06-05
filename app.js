const express = require("express");
const mongoose = require("mongoose");
const StudentSchema = require('./Schema/StudentSchema')
const cors = require("cors");
const app = express();
const PORT = 3000;
const http = require('http');
const server = http.createServer(app);

app.use(express.json());

// const {Server} = require("socket.io");
const socketIO = require("socket.io");

const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3001", // Adjust with your React app's URL
      methods: ["GET", "POST"],
    },
  });
  app.use((req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "https://qrproject-15a08.web.app");
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");

    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cors());


io.on('connection',(socket)=>{
    console.log('Attendance connected');
    socket.on('attendance-count',(count)=>{
        console.log("count : ",count);
        // socket.broadcast
        socket.emit('abc',count);
    })
})

const studentRoutes = require('./Routes/StudentRoutes');
const facultyRoutes = require('./Routes/FacultyRoutes');
const branchRoutes = require('./Routes/BranchRoutes');
const semRoutes = require('./Routes/SemRoutes');
const subjectRoutes = require("./Routes/SubjectRoutes");
const qrRoutes = require("./Routes/QRRoutes");
const attendanceRoutes = require("./Routes/attendanceRoutes1");
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);
app.use('/branch', branchRoutes);
app.use('/sem', semRoutes);
app.use('/subject', subjectRoutes);
app.use('/qrcode', qrRoutes);
app.use('/attendance', attendanceRoutes);

mongoose.connect("mongodb+srv://samir:samir@cluster0.key63fx.mongodb.net/vedantattandace", {
// mongoose.connect("mongodb://127.0.0.1:27017/cw1", {
// mongoose.connect("mongodb+srv://vedantpatel:vedant@cluster0.uvqub21.mongodb.net/vedantattandace", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to database");
}).catch((err) => {
    console.log("error..", err);
})

server.listen(PORT, () => {
    console.log("server started on port", PORT);
});











