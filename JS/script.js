const URL_BASE = 'https://627448703d2b5100742a6b67.mockapi.io/jobs'
const queryId = (id) => document.getElementById(id)

const getJobs = () => {
  fetch(`${URL_BASE}`)
    .then((res) => res.json())
    .then((data) => showJobs(data))
    .catch((err) => console.log(err));
};
getJobs()

const showJobs = (jobs) => {
    for (const job of jobs){
        const {name, description, category, knowledge, location, seniority} = job

        queryId('container').innerHTML += `
        <div class="card">
        <h3>${name}</h3>
        <p>${description}</p>
        <button id="details"> See details </button>
        
        <span>${location}</span>
        <span>${category}</span>
        <span>${seniority}</span>
      </div>`
    }
    queryId('loader').style.display = "none"
}