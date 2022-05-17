const URL_BASE = "https://627448703d2b5100742a6b67.mockapi.io/jobs";
const queryId = (id) => document.getElementById(id);

const getJobs = () => {
  fetch(`${URL_BASE}`)
    .then((res) => res.json())
    .then((data) => showJobs(data))
    .catch((err) => console.log(err));
};
getJobs();

const getOneJob = (id) => {
  fetch(`${URL_BASE}/${id}`)
    .then((response) => response.json())
    .then((data) => showOneJob(data))
    .catch((error) => console.log(error));
};

const newJob = () => {
  fetch (`${URL_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveData()) //capturar los imputs
  })
  .finally(() => console.log("termine de ejecutar el POST"))
}


const deleteJob = (id) => {
  fetch(`${URL_BASE}/${id}`, {
      method: "DELETE",
  })
  .finally(() => console.log("termine de ejecutar el DELETE"))
}


const showJobs = (jobs) => {
  for (const job of jobs) {
    const { id, name, description, category, location, seniority } = job;

    queryId("container").innerHTML += `
        <div class="card">
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="span-card"><span>${location}</span><span>${category}</span><span>${seniority}</span></div>
        <button id="details" class="btn-details" onclick="getOneJob(${id})"> See details </button>
        
      </div>`;
  }
  queryId("loader").style.display = "none";
};

const showOneJob = (jobs) => {
  const { name, description, category, location, seniority, knowledge } = jobs;
  queryId("container").innerHTML = `
  <div class="card-detail">
        <h3>${name}</h3>
        <p><b>Description:</b> ${description}</p>
        <p><b>Knowledge:</b> ${knowledge}</p>
        <div class="span-card">
           <span>${location}</span><span>${category}</span><span>${seniority}</span>
        </div>
        <div class="btn-card_detail">
        <button class="btn_card">Edit job</button> <button class="btn_card delete" id="delete">Delete job</button>
        </div>
   </div>
  `;
};


const saveData = () => {
  return {
    name: queryId("name").value,
    description: queryId("description").value,
    location: queryId("location-form").value,
    category: queryId("category-form").value,
    seniority: queryId("seniority-form").value
  }
};


queryId('createJob-form').addEventListener('click', (e) => {
  e.preventDefault()
  queryId('container').innerHTML = ""
  queryId('form').style.display = 'block'
  queryId('select__search').style.display = 'none'
})

queryId('submit').addEventListener('click', (e) => {
  e.preventDefault()
  newJob()
  queryId('container').innerHTML = "Se cargó correctamente"
})
