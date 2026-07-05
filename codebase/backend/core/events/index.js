import { eventStream } from "express-web-tools";

eventStream.onEvent("auth-webhook",(e)=>{
    console.log(e);
})