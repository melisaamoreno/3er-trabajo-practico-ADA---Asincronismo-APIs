const countries = [
  "United States",
  "Argentina",
  "Germany",
  "Spain",
  "New Zealand",
  "Australia",
  "Colombia",
  "Switzerland",
  "Netherlands",
  "Brasil",
  "England",
  "Canada",
];

const selectCountry = () => {
  for (const country of countries) {
    const count = document.createElement("option");
    count.innerHTML = country;
    queryId("location").appendChild(count);
  }
};
selectCountry();

const categories = [
  "Development",
  "Software Engineers",
  "Engineer",
  "service",
  "Designer",
  "Support",
];

const selectCategory = () => {
  for (const category of categories) {
    const cat = document.createElement("option");
    cat.innerHTML = category;
    queryId("category").appendChild(cat);
  }
};
selectCategory();

const seniority = ["Junior", "Ssr", "Senior"];

const selectSeniority = () => {
  for (const cat of seniority) {
    const job = document.createElement("option");
    job.innerHTML = cat;
    queryId("seniority").appendChild(job);
  }
};
selectSeniority();
