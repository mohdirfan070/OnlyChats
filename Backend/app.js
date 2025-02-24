require('dotenv').config();

const express = require('express');
const app = express();
const { Server } = require('socket.io');


// Creating a HTTP Server
const http = require('http');
const server = http.createServer(app);





// Cross Origin Setup
// CORS for HTTP
const cors = require('cors');
app.use(cors({ origin:[ 'http://localhost:5173'  , '*'], credentials: true, methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'], httpOnly: true }));


// Creating a Socket Server
const io = new Server(server, {
    cors: {
        origin: ["*", "http://localhost:5173"],
        credentials: true,
        methods: ["POST", "GET"],
    }
});




// DB Connections
const ConnectDB = require('./controller/mongoose.js');
ConnectDB();

//Parsing the data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Requriing All HTTP Routes
const homeRoute = require('./routes/home.js');
const userRoute = require('./routes/User.js');
const { verifyToken } = require('./middlewear/Auth.js');

// All HTTP Middlewears
app.use('/', homeRoute);

app.use('/apiv1/user', userRoute);

app.get('/end', (req, res) => {
    process.exit(0);
})





// All Socket Middlewears
let activeUser = [];
const { updateSocketId , updateStatus } = require('./controller/Socket.js');
const { verifyTokenForSocket } = require('./middlewear/Auth.js');
const user = require('./models/User.js');
const Msg = require('./models/Msg.js');

io.on("connection", async (socket) => {
    // console.log(socket.client.request.rawHeaders[1].split("Bearer%20")[1]); 
    //Taken token from user that is connected
    try {
        // console.log(socket.client.request.rawHeaders);
        // if (!socket.client.request.rawHeaders.find(ele => ele.startsWith("token="))) throw new Error("Unauthorized user");      
        
        //For Browsers
        // const user = await verifyTokenForSocket(socket.client.request.rawHeaders.find(ele => ele.startsWith("token=")).split("%20")[1]);
        //For Postman
        // const user = await verifyTokenForSocket(socket.client.request.rawHeaders[1].split("Bearer%20")[1]);

        
        
        // Using Queery Handshake
        const  {token}  = socket.handshake.query;
        // console.log(token);
        if(!token){
            throw new Error("Unauthorized user");
        }
        
        const user = await verifyTokenForSocket(token);

        
        if (!user) throw new Error("Something went wrong");
        !user && socket.disconnect();
        user && activeUser.push({ socketId: socket.id, ...user });
        // console.log(activeUser);
        const result = await updateSocketId({ socketId: socket.id, ...user });

        // console.log(user);
        //if it is not an authorize user then disconnect the user


    } catch (error) {
        socket.disconnect();
        await updateStatus({ socketId : socket.id  , status : false });
        // console.log(error.message);
    }

    

    socket.on("get-all-users",async()=>{
        // console.log(activeUser)

        // Fetching All Online Users
        const users = await user.find({isOnline:true}).select('name email username profilePicture socketId isOnline updatedAt');

        // Fetching All Users
        // const users = await user.find({}).select('name email username profilePicture socketId isOnline updatedAt');
        io.to(socket.id).emit("all-active-users", users);
    });

    // io.emit("hii");
    
    socket.on("fetch-chats", async (data) => {
      try {
        // console.log(data);
        const chats = await Msg.find({$or:[
            {username:data.username , sendTo:data.sendTo},
            {username:data.sendTo , sendTo:data.username},
        ]});

        // console.log(chats);
        socket.emit("current-user-chats",  chats ); // Emit the chats back to the client
      } catch (error) {
        console.error("Error fetching chats: ", error);
      }
    });


    socket.on("sent-msg", async (data) => {
        try {
            // console.log(data.socketId);
            const { text, username, sendTo, receiverSocketId } = data;
           const newMsg = await Msg.insertMany([{ text, username, sendTo, status: "sent" }]);
            // console.log(newMsg);     
            
            //Getting both SocketId
            let sendedTo = await user.findOne({email:sendTo}).select('name username socketId email');
            // console.log(sendedTo);
        //    let socketIds = user.map((ele)=>ele.socketId);
            // console.log(socketIds);
            
            // Emit message to both sender and receiver
            io.to([socket.id,sendedTo.socketId]).emit("new-msg",{newMsg:newMsg[0],user:sendedTo});
        } catch (error) {
            console.log(error);
        }
    });
    
    

    // socket.on("msg", (msg) => {
    //     console.log(msg);
    //     io.emit("msg", msg);
    // });


    // socket.on("msg-to-all", (msg) => {
    //     console.log(msg.msg);
    //     // io.to([...activeUser]).emit( "msg-to-all",msg);
    //     socket.broadcast.emit("msg-to-all", msg);
    // });

    socket.on("disconnect",async () => {
        activeUser = activeUser.filter(user => user.socketId != socket.id);
        await updateStatus({ socketId : socket.id  , status : false });
        // console.log(activeUser)
    });
});



server.listen(process.env.PORT, (req, res) => {
    console.log("Listenning on PORT:" + process.env.PORT);
})
