const URL_BASE = "https://627448703d2b5100742a6b67.mockapi.io/jobs";
const queryId = (id) => document.getElementById(id);
let editId = 0

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


const deleteJob = (id) => {
  fetch(`${URL_BASE}/${id}`, {
      method: "DELETE",
  })
  .catch(err => console.log(err))
  swal("Correctly delete", "", "success")
}

const showJobs = (jobs) => {
  for (const job of jobs) {
    const { id, name, description, category, location, seniority } = job;
    queryId("container").innerHTML += `
        <div class="card">
        <h3>${name}</h3>
        <p>${description}</p>
        <div class="span-card">
           <span>${location}</span><span>${category}</span><span>${seniority}</span>
        </div>
        <div class="details-button">
        <button id="details" class="btn-details" onclick="getOneJob(${id})"> See details </button>
        </div>
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
        <button class="btn_card" onclick="editForm(${id})">Edit job</button>
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
      <button onclick="deleteJob(${id})">Delete</button>
      <button><a href="index.html">Cancel</a></button>
      </div>
  </div>
  </div>
`
}

const editForm = (id) => {
getDataJobs(id)
queryId('form').style.display='block'
queryId('submit').style.display='none'
queryId('edit').style.display='block'
editId = id
}

queryId('edit').addEventListener('click', (e) => {
  e.preventDefault()
    fetch(`${URL_BASE}/${editId}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(saveData())
    })
    .then(res => console.log(res.json()))
    .catch(err => console.log(err))
  }
)

const populateCardJob = (job) => {
  const { name, description, location, category, seniority } = job
  queryId("name").value = name
  queryId("description").value = description
  queryId("location-form").value = location
  queryId("category-form").value = category
  queryId("seniority-form").value = seniority 
}


queryId('createJob-form').addEventListener('click', (e) => {
  e.preventDefault()
  queryId('container').innerHTML = ""
  queryId('form').style.display = 'block'
  queryId('select__search').style.display = 'none'
  queryId('welcome').style.display='none'
})


queryId('submit').addEventListener('click', (e) => {
  e.preventDefault()
  newJob()
  swal("A new job!", "", "success");
})



queryId('btn-clean').addEventListener('click', () => {
      queryId('location').value = ""
       queryId('seniority').value = ""
      queryId('category').value = ""
      queryId('container').innerHTML = ""
      getJobs()
})

const filterResults = () => {
  let searching = {
    location: queryId("location").value,
    seniority: queryId("seniority").value,
    category: queryId("category").value,
  };
  console.log(searching);
  fetch(`${URL_BASE}`)
    .then((res) => res.json())
    .then((data) => {
      showJobs(
        data.filter(
          ({ location, seniority, category }) =>
            location === searching.location ||
            seniority === searching.seniority ||
            category === searching.category
        )
      );
    })

    .catch((err) => console.log(err));
};

queryId("btn-search").addEventListener("click", (e) => {
  e.preventDefault();
  queryId("container").innerHTML = "";
  filterResults(
    queryId("location").value,
    queryId("seniority").value,
    queryId("category").value
  );
});