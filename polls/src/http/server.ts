import fastify from "fastify";
import cookie from "@fastify/cookie"
import websocket from "@fastify/websocket";
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import { pollResults } from "./ws/poll-results";
import { DeletPoll } from "./routes/delete-poll";



const app = fastify();

app.register(cookie, {
  secret: "polls-app-NLW", 
  hook: 'onRequest', 

})
app.register(websocket)

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)
app.register(DeletPoll)

app.register(pollResults)

app.listen({port: 3333}).then(() => {
  console.log("http Server running!");
})