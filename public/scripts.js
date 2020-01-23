const inp = document.getElementById("myInput");

var currentFocus;
inp.addEventListener("input", function(e) {
  fetch("/searchVal", {
    method: "POST",
    body: inp.value
  })
    .then(response => response.json())
    .then(data => {
      createList(data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
function createList(arr) {
  var divElement,
    divItem,
    searchValue = inp.value;
  closeAllLists();
  if (!searchValue) {
    return false;
  }
  currentFocus = -1;
  divElement = document.createElement("DIV");
  divElement.setAttribute("id", inp.id + "autocomplete-list");
  divElement.setAttribute("class", "autocomplete-items");
  inp.parentNode.parentNode.appendChild(divElement);
  for (var i = 0; i < arr.length; i++) {
    divItem = document.createElement("DIV");
    var strong = document.createElement("STRONG");
    var textNode1 = document.createTextNode(searchValue);
    strong.appendChild(textNode1);
    divItem.appendChild(strong);
    var textNode2 = document.createTextNode(arr[i].substr(searchValue.length));
    divItem.appendChild(textNode2);
    divItem.addEventListener("click", function(e) {
      selectBook(textNode1.textContent + textNode2.textContent);
    });
    divElement.appendChild(divItem);
  }
}

inp.addEventListener("keydown", function(e) {
  var selectList = document.getElementById(inp.id + "autocomplete-list");
  if (selectList) selectList = selectList.getElementsByTagName("div");

  if (e.keyCode == 40) {
    currentFocus++;
    addActive(selectList);
  } else if (e.keyCode == 38) {
    currentFocus--;
    addActive(selectList);
  } else if (e.keyCode == 13) {
    e.preventDefault();
    if (currentFocus > -1) {
      if (selectList) selectBook(selectList[currentFocus].innerText);
    }
  }
});

function selectBook(bookName) {
  bookName =
    bookName.substr(0, 1).toUpperCase() + bookName.substr(1, bookName.length);
  inp.value = bookName;
  closeAllLists();
}

function addActive(selectList) {
  if (!selectList) return false;
  removeActive(selectList);
  if (currentFocus >= selectList.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = selectList.length - 1;
  selectList[currentFocus].classList.add("autocomplete-active");
}
function removeActive(selectList) {
  for (var i = 0; i < selectList.length; i++) {
    selectList[i].classList.remove("autocomplete-active");
  }
}
function closeAllLists() {
  var selectList = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < selectList.length; i++) {
    selectList[i].parentNode.removeChild(selectList[i]);
  }
}

// const link={
//   domin1:"https://www.googleapis.com/books/v1/volumes?q=isbn:",
//   ISBN:"1933988673"
// }
//     fetch(link.domin1+link.ISBN)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//      console.log(data)
//       })
//     .catch(err => {
//       console.log(err);
//     });

function fetcher(url, method_, callback) {
  fetch(url, {
    method: method_
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      callback(data);
    })
    .catch(function(error) {
      console.log(error);
    });
}
