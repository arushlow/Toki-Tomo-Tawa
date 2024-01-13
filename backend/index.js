import express from 'express';
import { Low } from 'lowdb';
import { JSONFileSync } from 'lowdb/node';

const defaultData = {};
const app = express();
const database = new Low(new JSONFileSync('db.json'), defaultData);
const port = 3001;

app.get("/api", (req,res) => {
    res.json({message: "Hello from the server!"});
});


