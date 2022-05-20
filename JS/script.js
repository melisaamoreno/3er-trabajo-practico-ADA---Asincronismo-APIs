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
  .catch(err => console.log(err))
}

const getDataJobs = (id) => {
  fetch(`${URL_BASE}/${id}`)
      .then(response => response.json())
      .then(data => populateCardJob(data))
      .catch(err => console.log(err))
}

const editJob = (id) => {
 console.log(fetch(`${URL_BASE}/${id}`), {
    method: 'PUT',
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(saveData())
  })
  .then(res => console.log(res.json()))
  .catch(err => console.log(err))
}

const deleteJob = (id) => {
  fetch(`${URL_BASE}/${id}`, {
      method: "DELETE",
  })
  .catch(err => console.log(err))
  swal("Correctly delete", "", "success")
}

const showJobs = (jobs) => {
  for (const job of jobs) {
    const { id, name, description, category, location, seniority } = job
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
  const { id,name, description, category, location, seniority, knowledge } = jobs;
  queryId("container").innerHTML = `
  <div class="card-detail">
        <h3>${name}</h3>
        <p><b>Description:</b> ${description}</p>
        <p><b>Knowledge:</b> ${knowledge}</p>
        <div class="span-card">
           <span>${location}</span><span>${category}</span><span>${seniority}</span>
        </div>
        <div class="btn-card_detail">
        <button class="btn_card" id="edit" onclick="editForm(${id})">Edit job</button>
        <button class="btn_card delete" id="delete" onclick="showAlert(${id})">Delete job</button>
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
    seniority: queryId("seniority-form").value,
  }
};

const showAlert = (id) => {
  queryId("container").innerHTML = `
  <div class="alert-container">
  <div class="alert">
      Are you sure?
      <div class="btn-form">
      <button class="btn-delete" onclick="deleteJob(${id})">Delete</button>
      <a href="index.html" class="btn-delete">Cancel</a>
      </div>
  </div>
  </div>
`
}

const populateCardJob = (job) => {
  const { name, description, location, category, seniority } = job
  queryId("name").value = name
  queryId("description").value = description
  queryId("location-form").value = location
  queryId("category-form").value = category
  queryId("seniority-form").value = seniority 
}

const editForm = (id) => {
  getDataJobs(id)
  queryId('container').innerHTML = `
  <form id=form>   
  <label>Job title:</label>
  <input type="text" id="name">
  <label>Description:</label>
  <textarea id="description"> </textarea>
  
    <label>Tags:</label>
    <input type="text" id="location-form" placeholder="Location">
    <input type="text" id="seniority-form" placeholder="Seniority">
    <input type="text" id="category-form" placeholder="Category">
  </div>
  <div class="btn-form">
  <button type="submit" id="edit-form" onclick="editJob(${id})">Edit</button>
   <button><a href="index.html">Cancel</a></button>
  </div>
</form>`

queryId('form').style.display = "block"
}


queryId('createJob-form').addEventListener('click', (e) => {
  e.preventDefault()
  queryId('container').innerHTML = ""
  queryId('form').style.display = 'block'
  queryId('select__search').style.display = 'none'
})


queryId('submit').addEventListener('click', (e) => {
  e.preventDefault()
  newJob()
  swal("A new job!", "", "success");
})
