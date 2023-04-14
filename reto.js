// que es una API? --(Aplication Programming Interface)
// data --> json
// api no devueve información

/**
 * en js existe una funcion la cual se encarga de poder hacer la petiicon a una url
 * FETCH()
 * es una funcion nativa
 * existen varios tipos de peticiones
 * GET --> sirve para obtener info
 * POST --> sirve para crear datos
 * PUT --> sirve para actualizar datos
 * DELETE --> sirve para eliminar datos
 *
 * */

/**
 * funcion async
 * las funciones async fueron creadas para poder ejecutar algo
 *
 */

/**
 * https://api.github.com/users/jdanymc
 *
 * hay un tiempo de espera, no sabemos cuanto demorara entonces usamos el async await
 *
 */

//atrapamos todos los elementos que utilizaremos
const imageProfile = document.querySelector("#img-profile");
const githubName = document.querySelector("#github-name");
const githubUsername = document.querySelector("#github-username");
const githubJoined = document.querySelector("#github-joined");
const githubRepos = document.querySelector("#github-repos");
const githubFollowers = document.querySelector("#github-followers");
const githubFollowing = document.querySelector("#github-following");

const githubBio = document.querySelector("#github-bio");
const githubInst = document.querySelector("#github-inst");
const githubLocate = document.querySelector("#github-location");

//acciones

const githubActionSearch = document.querySelector("#github-action-search");
const githubInputSearch = document.querySelector("#github-search");
const githubProfile = document.querySelector("#github-profile");

const linkFollowing = document.querySelector("#link-following");
const linkFollowers = document.querySelector("#link-followers");

const navPageFollowing = document.querySelector("#nav-page-following");
const navPageFollowers = document.querySelector("#nav-page-followers");
const navPageRepos = document.querySelector("#nav-page-repos");

const tabContent = document.querySelector("#table-action");
const divContainer = document.querySelector("#div-container");



let urlRepos = "";
let urlFollowers = "";
let urlFollowing = "";

linkFollowing.onclick = (e) => {
  navPageFollowers.classList.remove("active");
  navPageFollowing.classList.add("active");
  navPageRepos.classList.remove("active");
  
  setDatatable(urlFollowing,2);
};

linkFollowers.onclick = (e) => {
  navPageFollowers.classList.add("active");
  navPageFollowing.classList.remove("active");
  navPageRepos.classList.remove("active");

  setDatatable(urlFollowers,2);
};

navPageFollowing.onclick = (e) => {
  navPageFollowers.classList.remove("active");
  navPageFollowing.classList.add("active");
  navPageRepos.classList.remove("active");
  setDatatable(urlFollowing,2);
};

navPageFollowers.onclick = (e) => {
  navPageFollowers.classList.add("active");
  navPageFollowing.classList.remove("active");
  navPageRepos.classList.remove("active");

  setDatatable(urlFollowers,2);
};

navPageRepos.onclick = (e) => {
  navPageFollowers.classList.remove("active");
  navPageFollowing.classList.remove("active");
  navPageRepos.classList.add("active");
  setDatatable(urlRepos);
};

githubActionSearch.onclick = (e) => {
  const usuario = githubInputSearch.value;
  if (usuario === "") {
    Swal.fire({
      title: "Error",
      text: "Debes de llenar el usuario!!!",
      icon: "error",
    });
    return;
  }
  obtenerDatosGithub(usuario).then((data) => {
    setDataUser(data);
  });
};
// evento al presionar enter
githubInputSearch.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const usuario = e.target.value;
    if (usuario === "") {
      Swal.fire({
        title: "Error",
        text: "Debes de llenar el usuario!!!",
        icon: "error",
      });
      return;
    }

    obtenerDatosGithub(usuario).then((data) => {
      setDataUser(data);
    });
  }
});

const obtenerDatosGithub = async (username = "jdanymc") => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

  if (!response.ok) {
    // podria ser (data.message=="Not Found")
    Swal.fire({
      title: "Error",
      text: "No existe Usuario!!!",
      icon: "error",
    });
    return;
  }
  divContainer.classList.remove("blur");
  return data;
};

const obtenerDatosTabla = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  if (response.ok) {
    return data;
  }
};

//funcion que asigna los datos
const setDataUser = (data) => {
  imageProfile.src = data.avatar_url;
  githubName.textContent = data.name;
  githubUsername.textContent = data.login;
  githubFollowers.textContent = data.followers;
  githubFollowing.textContent = data.following;
  githubBio.textContent = data.bio;
  githubInst.textContent = data.company;
  githubLocate.textContent = data.location;
  githubProfile.href = data.html_url;

  urlRepos = data.repos_url;
  urlFollowers = data.followers_url;

  urlFollowing = data.following_url;
  urlFollowing = urlFollowing.replace('{/other_user}','');
  
  setDatatable(urlRepos);
  navPageFollowers.classList.remove("active");
  navPageFollowing.classList.remove("active");
  navPageRepos.classList.add("active");
};

const setDatatable = (url, tipo = 1) => {
  //elimina items
  while (tabContent.hasChildNodes()) {
    tabContent.removeChild(tabContent.lastChild);
  }

  obtenerDatosTabla(url).then((data) => {
    
    const body = document.createElement("tbody");
    data.forEach((element, index) => {
      const columna = document.createElement("tr");
      const fila1 = document.createElement("td");
      const fila2 = document.createElement("td");
      if (tipo == 1) {
        fila1.innerHTML = index + 1;
        fila2.innerHTML = `<a href="${element.html_url}" target="_blank">${
          element.name
        }</a><p>${element.description === null ? "" : element.description}</p>`;

        columna.appendChild(fila1);
        columna.appendChild(fila2);
        body.appendChild(columna);
      } else {
        fila1.innerHTML = `<div class="row"><div class="col-md-2"><img src="${element.avatar_url}" height="50" width="50" class="rounded-circle"/></div><div class="col-md-10"><a href="${element.html_url}" target="_blank"><h5>${element.login}</h5></a> </div></div>`;

        columna.appendChild(fila1);
        body.appendChild(columna);
      }
    });
    tabContent.appendChild(body);
  });
};
