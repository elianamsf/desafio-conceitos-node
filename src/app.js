const express = require("express");
const cors = require("cors");
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs } = request.body;
  let likes = 0;
  const item = {id: uuid(), title, url, techs, likes };
  repositories.push(item);
  return response.json(item);
});

app.put("/repositories/:id", (request, response) => {
  const {id}= request.params;
  const {title, url, techs } = request.body;
  const itemIndex = repositories.findIndex(item => item.id === id);

  if(itemIndex < 0){
      return response.status(400).json({
          error : "Item not found."
      });
  }
  repositories[itemIndex]['title'] = title;
  repositories[itemIndex]['url'] = url ;
  repositories[itemIndex]['techs'] = techs;
  return (response.json(repositories[itemIndex]));
});

app.delete("/repositories/:id", (request, response) => {
  const {id}= request.params
  const itemIndex = repositories.findIndex(item => item.id === id);

  if(itemIndex < 0){
      return response.status(400).json({
          error : "Item not found."
      });
  }

  repositories.splice(itemIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id}= request.params;
  const itemIndex = repositories.findIndex(item => item.id === id);

  if(itemIndex < 0){
      return response.status(400).json({
          error: "Item not found."
      });
  }
  let likes = repositories[itemIndex]['likes'];
  let title = repositories[itemIndex]['title'];
  let url   = repositories[itemIndex]['url'];
  let techs = repositories[itemIndex]['techs'];
  likes++;
  const item ={id, title, url, techs, likes }
  repositories[itemIndex] = item;
  return response.json(item);

});

module.exports = app;

