"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const http_1 = __importDefault(require("http"));
const client_1 = require("@notionhq/client");
// The dotenv library will read from your .env file into these values on `process.env`
const notionDatabaseId = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_SECRET;
const db = process.env.NOTION_DATABASE_PEOPLE_ID;
const proj = process.env.NOTION_DATABASE_PROJECTS_ID;
const timereport = process.env.NOTION_DATABASE_TIMEREPORT_ID;
// Will provide an error to users who forget to create the .env file
// with their Notion data in it
if (!notionDatabaseId || !db || !proj || !timereport || !notionSecret) {
    throw Error("Must define NOTION_SECRET and NOTION_DATABASE_ID in env");
}
// Initializing the Notion client with your secret
const notion = new client_1.Client({
    auth: notionSecret,
});
const host = "localhost";
const port = 8000;
// Require an async function here to support await with the DB query
const server = http_1.default.createServer((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader("Access-Control-Allow-Origin", "*");
    switch (req.url) {
        case "/":
            // Query the database and wait for the result
            const { results } = yield notion.request({ path: `databases/${notionDatabaseId}/query`, method: `post` });
            // We map over the complex shape of the results and return a nice clean array of
            const list = results.map((page) => {
                // console.log(page.properties);
                return {
                    ProjectName: page.properties.Projectname.rollup.array[0].title[0].plain_text,
                    PersonName: page.properties.Person.rollup.array[0].title[0].plain_text,
                    ProjectStatus: page.properties.Projectstatus.rollup.array[0].select.name,
                    Note: page.properties.Note.title[0].plain_text
                };
            });
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(list));
            break;
        case "/person":
            const users = yield notion.databases.query({
                database_id: db
            });
            const people = users.results.map((page) => {
                // console.log(page.properties);
                return {
                    Users: page.properties.Name.title[0].plain_text
                };
            });
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(people));
            break;
        case "/proj":
            const project = yield notion.databases.query({
                database_id: proj,
                filter: {
                    property: "Status",
                    select: {
                        equals: "Active"
                    }
                }
            });
            const projects = project.results.map((page) => {
                //  console.log(page.properties.Hours.number);
                return {
                    Hours: page.properties.Hours.number,
                    Status: page.properties.Status.select.name,
                    Project: page.properties.Projectname.title[0].plain_text,
                };
            });
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(projects));
            break;
        case "/allproj":
            const allproj = yield notion.databases.query({
                database_id: proj
            });
            const everyproject = allproj.results.map((page) => {
                console.log(page.properties);
                return {
                    workedHours: page.properties.WorkedHours.rollup.number,
                    hoursLeft: page.properties.HoursLeft.formula.number,
                    totalHours: page.properties.Hours.number,
                    allProjects: page.properties.Projectname.title[0].plain_text,
                    everyStatus: page.properties.Status.select.name
                };
            });
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(everyproject));
            break;
        case "/time":
            const time = yield notion.databases.query({
                database_id: timereport
            });
            const timereports = time.results.map((page) => {
                // console.log(page.properties.Person.relation)
                return {};
            });
            res.setHeader("Content-Type", "application/json");
            res.writeHead(200);
            res.end(JSON.stringify(timereports));
            break;
        default:
            res.setHeader("Content-Type", "application/json");
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
}));
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
function SubmitToNotion(setDate, user, hours, project, note) {
    const { Client } = require('@notionhq/client');
    const notion = new Client({ auth: notionSecret });
    (() => __awaiter(this, void 0, void 0, function* () {
        const response = yield notion.pages.create({
            parent: {
                database_id: process.env.NOTION_DATABASE_TIMEREPORT_ID,
            },
            properties: {
                Date: {
                    date: [
                        {
                            start: setDate,
                        }
                    ]
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
                Person: {
                    relation: [
                        {
                            id: user,
                        },
                    ],
                },
                Hours: {
                    number: hours,
                },
                Project: {
                    relation: [
                        {
                            id: project,
                        },
                    ],
                },
            },
        });
        console.log(response);
    }))();
}
