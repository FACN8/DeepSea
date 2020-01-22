function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
    var divElement, divItem, searchValue = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!searchValue) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    divElement = document.createElement("DIV");
    divElement.setAttribute("id", this.id + "autocomplete-list");
    divElement.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.parentNode.appendChild(divElement);
    var counter = 0;
    /*for each item in the array...*/
    for (var i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, searchValue.length).toUpperCase() == searchValue.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        if(counter <5){
        counter++;
        divItem = document.createElement("DIV");
        /*make the matching letters bold:*/
       var strong = document.createElement("STRONG")
        var textNode1 = document.createTextNode(searchValue)
        strong.appendChild(textNode1)
        divItem.appendChild(strong)

        var textNode2 = document.createTextNode(arr[i].substr(searchValue.length))
        divItem.appendChild(textNode2)
        divItem.addEventListener('click',function(e){
          selectBook(textNode1.textContent+textNode2.textContent)
        })

    
        divElement.appendChild(divItem);
      }
    }
    }
  });

  inp.addEventListener("keydown", function(e) {
    
    var selectList = document.getElementById(this.id + "autocomplete-list");
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

  function selectBook(bookName){
    bookName = bookName.substr(0,1).toUpperCase() + bookName.substr(1,bookName.length);
    inp.value = bookName;
    closeAllLists();
  }

  function addActive(selectList) {
    /*a function to classify an item as "active":*/
    if (!selectList) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(selectList);
    if (currentFocus >= selectList.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = selectList.length - 1;
    /*add class "autocomplete-active":*/
    selectList[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(selectList) {
    /*a function to remove the "active" class from all autocomplete items:*/
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
}

fetch("/dictionary")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var dataTitle = data.map(function(obj) {
      return obj.title
    })
    autocomplete(document.getElementById("myInput"), dataTitle);
  })
  .catch(function(error) {
    console.log(error);
  });

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
