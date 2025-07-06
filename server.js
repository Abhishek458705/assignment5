/********************************************************************************
*  WEB322 – Assignment 4
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
*  Name: Abishek Adhikari Student ID: 119205235
*  Date: 2025-06-01
*
********************************************************************************/

const express = require("express");
const path = require("path");
const http = require("http");

const app = express();
const projectData = require("./modules/projects");
const HTTP_PORT = process.env.PORT || 8080;

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// Serve static files
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.render("home", { page: "/" });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", { page: "/about" });
});

// Projects list route
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  const send404 = (msg) => res.status(404).render("404", { message: msg });

  if (sector) {
    projectData.getProjectsBySector(sector)
      .then(data => {
        if (data.length === 0) return send404(`No projects found for sector: ${sector}`);
        res.render("projects", { projects: data, page: "/solutions/projects", sector });
      })
      .catch(() => send404(`Error retrieving projects for sector: ${sector}`));
  } else {
    projectData.getAllProjects()
      .then(data => {
        res.render("projects", { projects: data, page: "/solutions/projects", sector: null });
      })
      .catch(() => res.status(500).render("404", { message: "Unable to fetch projects." }));
  }
});

// Project details route
app.get("/solutions/projects/:id", (req, res) => {
  projectData.getProjectById(req.params.id)
    .then(data => {
      res.render("project", { project: data, page: "" });
    })
    .catch(() => {
      res.status(404).render("404", { message: `No project found with ID: ${req.params.id}` });
    });
});

// 404 fallback for undefined routes
app.use((req, res) => {
  res.status(404).render("404", { message: "Page not found." });
});

// Start server
projectData.initialize()
  .then(() => {
    http.createServer(app).listen(HTTP_PORT, () => {
      console.log(`Server listening on port ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error("Initialization error:", err);
  });
