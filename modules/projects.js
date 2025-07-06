//load raw data
const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

//add sector name
function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = [];

      projectData.forEach((p) => {
        const sector = sectorData.find((s) => s.id === p.sector_id);
        projects.push({
          ...p,
          sector: sector ? sector.sector_name : "Unknown",
        });
      });

      resolve();
    } catch (err) {
      reject(`Initialization failed: ${err}`);
    }
  });
}

//return all projects //wrapped in a Promise
function getAllProjects() {
  return new Promise((resolve, reject) => {
    projects.length
      ? resolve(projects)
      : reject("No project data available – did you call initialize() first?");
  });
}

//return one by id
function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const id = Number(projectId);
    const proj = projects.find((p) => p.id === id);
    proj
      ? resolve(proj)
      : reject(`Unable to find project with id ${projectId}`);
  });
}

//return many by sector
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const needle = sector.toLowerCase();
    const matches = projects.filter((p) =>
      p.sector.toLowerCase().includes(needle)
    );

    matches.length
      ? resolve(matches)
      : reject(`No projects found for sector that includes “${sector}”`);
  });
}

// export as a module
module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector,
};
