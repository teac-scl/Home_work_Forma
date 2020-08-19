var studentNuber;
(function () {
  const appState = {
    userDatabase: [
      {
        id: 1,
        name: "Dewey Frank",
        age: 23,
        details: {
          picUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT2lgDguQcZmHjor0eEKenJYpNn69G7-dKxSQ&usqp=CAU",
        },
      },
      {
        id: 2,
        name: "Harrison Tomas",
        age: 44,
        details: {
          picUrl:
            "https://cdn.iconscout.com/icon/free/png-256/avatar-367-456319.png",
        },
      },
      {
        id: 3,
        name: "Joel Lukas",
        age: 12,
        details: {
          picUrl:
            "https://cdn.iconscout.com/icon/free/png-256/avatar-368-456320.png",
        },
      },
      {
        id: 4,
        name: "Marc Ciaran ",
        age: 47,
        details: {
          picUrl:
            "https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/1_avatar-512.png",
        },
      },
      {
        id: 5,
        name: "Solomon Conner",
        age: 33,
        details: {
          picUrl:
            "https://cdn.iconscout.com/icon/free/png-256/astonishes-boy-1129046.png",
        },
      },
    ],
    selectors: {
      userWrapper: document.querySelector("#user-display-wrapper"),
      userForm: document.forms["creteUserForm"],
    },
    formEditState: false,
  };

  displayWithNewElements(appState);
  //displayWithStringElements(appState)
  activateForm(appState);
})();

function displayWithNewElements(mainAppObject) {
  const displayTarget = mainAppObject.selectors.userWrapper;
  const userDatabase = mainAppObject.userDatabase;

  var outerClass = "outer-calss-1";
  var outerClassSecond = "outer-calss-2";
  var outerClassThird = "outer-calss-3";
  if (!userDatabase || !displayTarget)
    return console.error("Something go wrong with Data");

  displayTarget.innerHTML = "";
  if (userDatabase.length < 1) displayTarget.innerHTML = `No user Yet!!!`;

  for (let userItem of userDatabase) {
    let ineerDocumentHtml = `
            <span>${userItem.id}</span>
            <h4>${userItem.name}</h4>
            <img src="${userItem.details.picUrl} " class="${
      userItem.age < 20
        ? outerClass
        : userItem.age >= 20 && userItem.age < 40
        ? outerClassSecond
        : outerClassThird
    }" alt="">
            <p style="margin:0 10px;">age : ${userItem.age}</p>
        `;
    let newUserCard = newDomElementCreator(
      "li",
      "user-list-card",
      ineerDocumentHtml,
      function (event) {
        console.log(userItem, userItem.name);
      }
    );
    let delateButton = newDomElementCreator(
      "button",
      "delete-button",
      "<span>Delete X</span>",
      function (event) {
        //console.log("delete X",  userItem.name)
        if (confirm(`You about to delet User: ${userItem.name}?`)) {
          userDeleter(mainAppObject, userItem.id);
        }
      }
    );
    //add
    let editButton = newDomElementCreator(
      "button",
      "edit-button",
      "<span>Edit user</span>",
      function (event) {
        console.log("edit user", userItem.name);
        if (confirm(`You about to edit  User: ${userItem.name}?`)) {
          userEditer(mainAppObject, userItem.id);
          console.log(userItem.id);
        }
      }
    );

    //end add
    newUserCard.appendChild(delateButton);
    //add
    newUserCard.appendChild(editButton);
    displayTarget.appendChild(newUserCard);
  }
}

function newDomElementCreator(
  tagName,
  styleClass,
  ineerDocumentHtml,
  eventCallback
) {
  let newElement = document.createElement(tagName);
  newElement.className = styleClass ? styleClass : false;
  newElement.innerHTML = ineerDocumentHtml ? ineerDocumentHtml : false;

  if (eventCallback)
    newElement.addEventListener("click", (event) => {
      eventCallback(event);
    });
  return newElement;
}

function userDeleter(mainAppObject, userId) {
  const userDatabase = mainAppObject.userDatabase;
  let userDbIndex = userDatabase.indexOf(
    userDatabase.find((userInfo) => {
      return userInfo.id == userId;
    })
  );

  if (!userDbIndex && userDbIndex != 0) return console.error("cant find user");
  userDatabase.splice(userDbIndex, 1);
  displayWithNewElements(mainAppObject);
}

function addNewUser(mainAppObject, newUserData) {
  console.log("new", newUserData);
  mainAppObject.userDatabase = mainAppObject.userDatabase.concat(newUserData);
  displayWithNewElements(mainAppObject);
}

//  Form logic
function activateForm(mainAppObject) {
  const form = mainAppObject.selectors.userForm;
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!mainAppObject.formEditState) {
      let newUserData = createUserObject(this);
      addNewUser(mainAppObject, newUserData);
    }
    if (mainAppObject.formEditState) {
      let changeUserData = editUserObject(this);
      changeUsers(mainAppObject, changeUserData);
      mainAppObject.formEditState = !mainAppObject.formEditState;
      form.sub.value = "Create";
    }
    form.reset();
  });
}

//add із форми зчитує нового usera, id йому змінюємо перед заміною
function changeUsers(mainAppObject, changeUserData) {
  const userDatabase = mainAppObject.userDatabase;
  let userDbIndex = userDatabase.id;
  const changeUser = changeUserData;
  changeUser.id = studentNuber;
  const userDatabase1 = mainAppObject.userDatabase;
  let userDbIndexPoz = userDatabase1.indexOf(
    userDatabase1.find((userInfo) => {
      return userInfo.id == studentNuber;
    })
  );

  console.log("Deleter ind=", userDbIndexPoz);
  userDatabase.splice(userDbIndexPoz, 1, changeUser);
  displayWithNewElements(mainAppObject);
}

function createUserObject(userForm) {
  let userResult = {
    details: {},
  };
  for (let formInput of userForm) {
    console.log(formInput);
    if (formInput.name && formInput.value) {
      if (formInput.type == "url") {
        userResult.details[formInput.name] = formInput.value;
      } else userResult[formInput.name] = formInput.value;
    }
  }

  userResult.id = new Date().getTime();
  console.log(userResult);

  return userResult;
}

// add Створює  редагованого юзера без Id
function editUserObject(userForm) {
  let userResult = {
    details: {},
  };
  for (let formInput of userForm) {
    if (formInput.name && formInput.value) {
      if (formInput.type == "url") {
        userResult.details[formInput.name] = formInput.value;
      } else userResult[formInput.name] = formInput.value;
    }
  }
  userResult.id = studentNuber;
  console.log(userResult);

  return userResult;
}
//End editUserObj

//add Заносить у форму дані юсера, що редагується, змінює напис на кнопці в формі, змінює статус форми
function userEditer(mainAppObject, userId) {
  const userDatabase = mainAppObject.userDatabase;
  const form = mainAppObject.selectors.userForm;
  let userDbIndex = userDatabase.find((userInfo) => {
    return userInfo.id == userId;
  });
  if (!userDbIndex && userDbIndex != 0) {
    alert("cant find user");
    return console.error("cant find user");
  }
  for (let userItem of userDatabase) {
    if (userItem.id == userDbIndex.id) {
      //add
      studentNuber = userDbIndex.id;
      mainAppObject.formEditState = !mainAppObject.formEditState;
      form.name.value = userItem.name;
      form.age.value = userItem.age;
      form.picUrl.value = userItem.details.picUrl;
      form.sub.value = "Change";
      return userDatabase;
    }
  }
}
//End userEditer
