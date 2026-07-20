import { Server } from "socket.io";
import { Server as HttpServer } from "http";


let io: Server;


export const initSocket = (
server: HttpServer
)=>{

io = new Server(server,{

cors:{
origin:"*"
}

});


io.on(
"connection",
(socket)=>{


console.log(
"Socket connected:",
socket.id
);



socket.on(
"joinVendor",
(vendorId)=>{

socket.join(
`vendor_${vendorId}`
);

});


socket.on(
"joinCustomer",
(customerId)=>{

socket.join(
`customer_${customerId}`
);

});



socket.on(
"disconnect",
()=>{

console.log(
"Socket disconnected"
);

});


});


};



export const getIO = ()=>{

if(!io){

throw new Error(
"Socket not initialized"
);

}

return io;

};