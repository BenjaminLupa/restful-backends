const contacts = document.querySelector("#contacts");
const showPending = document.querySelector("#show-pending");

const profiles = [];
let pendings = 0;

function loadContact() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      profiles.push(...data);
      renderProfileContact();
    });
}

function renderProfileContact() {
  profiles.forEach((el, index) => {
    renderContact(el, index);
  });
}

function renderContact(el, index) {
  const newDiv = document.createElement("div");
  newDiv.classList = "container";
  const newFullname = document.createElement("h2");
  const newJob = document.createElement("p");
  newJob.classList = "color";
  newDiv.dataset.index = index;

  const newConnections = document.createElement("p");
  const newConnectionsValue = document.createTextNode(
    el.mutualConnections + " mutual connections"
  );
  newConnections.appendChild(newConnectionsValue);
  newConnections.classList = "mutual";

  const picture = document.createElement("img");
  picture.src = el.picture;
  picture.classList = "pic";

  const connectBtn = document.createElement("button");
  const connectBtnValue = document.createTextNode("Connect");
  connectBtn.appendChild(connectBtnValue);
  connectBtn.classList = "con-btn";

  const backgroundPic = document.createElement("div");
  backgroundPic.classList = "background";

  const delBtn = document.createElement("button");
  const delBtnVal = document.createTextNode("X");
  delBtn.appendChild(delBtnVal);
  delBtn.classList = "del-btn";

  delBtn.addEventListener("click", (el) => {
    contacts.innerText = "";
    profiles.splice(index, 1);

    if (el.target.parentNode.lastChild.innerText === "Pending") {
      pendings--;
    }
    if (pendings === 0) {
      showPending.innerText = "No pending invitations";
    } else {
      showPending.innerText = pendings + " pending invitations";
    }
    fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        profiles.push(...data);
        renderProfileContact();
      });
  });
  const name = document.createTextNode(el.name.first + " " + el.name.last);
  const jobName = document.createTextNode(el.title);
  newJob.appendChild(jobName);
  newFullname.appendChild(name);
  newDiv.append(
    backgroundPic,
    picture,
    delBtn,
    newFullname,
    newJob,
    newConnections,
    connectBtn
  );
  newDiv.style.setProperty("--background-img", "url(" + el.backgroundImage) +
    ")";
  contacts.appendChild(newDiv);

  connectBtn.addEventListener("click", (element) => {
    if (element.target.innerText === "Connect") {
      element.target.innerText = "Pending";
      pendings++;
    } else {
      element.target.innerText = "Connect";
      pendings--;
      // showPending.innerText = pendings;
    }
    if (pendings === 0) {
      showPending.innerText = "No pending invitations";
    } else {
      showPending.innerText = pendings + " pending invitations";
    }
  });
}

loadContact();
