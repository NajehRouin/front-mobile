import { io } from "socket.io-client";



class WebSocketService {

    initializing(){

         this.socket = io("https://mobile-app-pfe.onrender.com/",{
            transports:["websocket"]
        });
        console.log("initializing socket service")
        
        this.socket.on("connect",(data)=>{
            console.log("===socket connected!===")
        })
        this.socket.on("disconnect",(data)=>{
            console.log("===socket disconnected!===")
        })
        this.on("error",(data)=>{
            console.log("===error===",data)
        })
    }

    emit(event,data){
        this.socket.emit(event,data)
    }

    on(event,cb){
        this.socket.on(event,cb)
    }

    removeListener(listenerName){
        this.socket.removeListener(listenerName)
    }
}

const socket=new WebSocketService()

export default socket