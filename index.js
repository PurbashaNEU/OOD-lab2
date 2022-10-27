const list = document.getElementById('list'); // get list container
const addtoDoItemForm = document.getElementById('addForm'); // form area
let toDoList = [];  // array to hold json data

// method to create list elements
const createTODoItem = () => {
    toDoList.forEach((List,index) =>addList(List, index));
}

// load data from json after request is sent
const load = (event)=> {
    const target = event.target;
    if(target.status ===200){
    const responseText = target.responseText;
    toDoList = JSON.parse(responseText);
    createTODoItem();
    }
}

const markComplete = (index) => {
    toDoList[index].status = 'Complete';
    const text = document.getElementById(index);
    text.innerHTML = `<del>${toDoList[index].title}</del>`;

}
const addList = (List, index) => {
    const item = document.createElement('li');
   // item.textContent = List.title;
    item.id = index;
    const textSpan = document.createElement('div');
    if (List.status === 'Complete') {
        textSpan.innerHTML = `<del>${List.title}</del>`;
    } else {
        textSpan.innerHTML = List.title;
    }
    
    textSpan.id = index;
    item.appendChild(textSpan);
    const checkbox = document.createElement('span');
    checkbox.innerHTML = `<input type="checkbox" onchange="markComplete(${index})">Completed`;
    if (List.status === 'Complete') {
        checkbox.style.visibility = 'hidden';
    }
    item.appendChild(checkbox);
    const deleteBtn = document.createElement('span');
    deleteBtn.innerHTML = `<button class="delete-btn" onClick="deleteItem(${index})">X</button>`;
    item.appendChild(deleteBtn);
    list.appendChild(item);
}

document.querySelector('ul').addEventListener('click', function(event) {
    if (event.target && ((event.target.matches('li')) || (event.target.matches('div')))) {
        const index = parseInt(event.target.id);
        closeForm();   
        cancelForm();
         const List = toDoList[index];
        const detailsContainer = document.getElementById('detailsContainer');
        detailsContainer.style.display = 'block';
        const title = document.getElementById('detailTitle');
        title.innerHTML = List.title;
        const desc = document.getElementById('detailDescription');
        desc.innerHTML = List.description;
        const date = document.getElementById('detailDate');
        date.innerHTML = List.due_date;
        const time = document.getElementById('detailTime');
        time.innerHTML = List.due_time;   
        const status = document.getElementById('detailStatus');
        status.innerHTML = List.status;
    }
  });

  // make xhr call to fetch data from file
const xhr = new XMLHttpRequest();
xhr.open('GET', 'data/List.json');
xhr.addEventListener('load',load);
xhr.send();

// close the form
const closeForm = () => {
    const detailsContainer = document.getElementById('detailsContainer');
    if (detailsContainer) {
        detailsContainer.style.display = 'none';
    }
}


// add the form
const addForm = () => {
    closeForm();
    const formContainer = document.getElementById('formContainer');
    const dueDate = document.getElementById('dueDate');
    dueDate.min = new Date().toISOString().split("T")[0];
    formContainer.style.display = 'block';
}


// close the descriptiopn area
 const closebutton = document.getElementById('Close-button');
 closebutton.addEventListener('click', () =>  {
    const DetCont = document.getElementById('detailsContainer');
    DetCont.style.display = 'none';
 });

 // remove and empty form and form fields
 const cancelForm = () => {
    const formContainer = document.getElementById('formContainer');
    if (formContainer) {
        document.getElementById('title').value = null;
        document.getElementById('description').value = null;
        document.getElementById('dueDate').value = null;
        document.getElementById('dueTime').value = null;
        formContainer.style.display = 'none';
    }  
 }

 addtoDoItemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const toDoItemListLength = toDoList.length; 
    const item = {
        id: toDoItemListLength,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        due_date: document.getElementById('dueDate').value,
        due_time: document.getElementById('dueTime').value,
        status: "Open"
    }
    toDoList.push(item);
    addList(item,toDoItemListLength);
    cancelForm();
});

const deleteItem = (index) => {
    toDoList.splice(index,1);
    list.innerHTML = null;
    createTODoItem();
}
