const express = require("express");
const { Client } = require("@notionhq/client");
const cors = require("cors");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const app = express();

app.use(cors());

const PORT = 4000;
const HOST = "localhost";

const notion = new Client({
  auth: "secret_W1uq8Dl11PXcGRCJ7HtNwqQIh6GpDb1DrAFdgDvQv9C",
});

const dataBaseId = "e5a583d6655c4557ae57e630cbcbae17";

app.post("/submitFormToNotion", jsonParser, async (req, res) => {
  const name = req.body.user;
  const hours = req.body.hours;
  const note = req.body.note;
  const date = req.body.date;
  const project = req.body.project;
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: dataBaseId,
      },
      properties: {
        Person: {
          relation: [
            {
              id: name,
            },
          ],
        },
        Hours: {
          number: parseInt(hours),
        },
        Date: {
          date: {
            start: date,
          },
        },
        Project: {
          relation: [
            {
              id: project,
            },
          ],
        },

        Note: {
          title: [
            {
              text: {
                content: note,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("SUCCESS!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, HOST, () => {
  console.log("Starting proxy at " + HOST + ":" + PORT);
});
