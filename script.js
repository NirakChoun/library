const myLibrary = [
    { 
        title: "Programming",
        author: "Nirak",
        pages: 392,
        status: "Not Started"
    },
    { 
        title: "Cooking",
        author: "Nancy",
        pages: 395,
        status: "Finished"
    }
];

console.log(Object.setPrototypeOf(myLibrary[0], Book.prototype));
console.log(Object.getPrototypeOf(myLibrary[0]));

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.status}`;
}

Book.prototype.setReadStatus = function(status) {
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

const table = document.querySelector("tbody");
function displayBook(book) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<td class="title">
                            ${book.title}
                            <div> 
                                <button class="edit-btn">
                                <img
                                src="images/edit.svg"
                                alt="Close Icon"
                                style="height: 24px; width: 24px"
                                class="edit-icon"
                                />
                                </button>
                                <button class="delete-btn">
                                <img
                                src="images/delete.svg"
                                alt="Close Icon"
                                style="height: 24px; width: 24px"
                                class="delete-icon"
                                />
                                </button>
                            </div>
                        </td>
                        <td>${book.author}</td>
                        <td>${book.pages}</td>
                        <td>${book.status}</td>`
    table.appendChild(newRow);
}


for (let book = 0; book < myLibrary.length; book++) {
    displayBook(myLibrary[book]);
}

const btn = document.querySelector(".btn");
const dialog = document.querySelector("#main-dialog");
const editDialog = document.querySelector("#edit-dialog");
const form = document.querySelector("form");
const editForm = document.querySelector("#edit-dialog>form");
const submitBtn = document.querySelector(".submit-btn");
const newSubmitBtn = document.querySelector(".new-submit-btn");
const allEditBtn = document.querySelectorAll(".edit-btn");
const allDeleteBtn = document.querySelectorAll(".delete-btn");

const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const bookStatus = document.querySelector("#status");
const newStatus = document.querySelector("#newStatus");

btn.addEventListener("click", () => {
    dialog.showModal();
});

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    addBookToLibrary(title.value, author.value, pages.value, bookStatus.value);
    newBook = myLibrary.length - 1;
    displayBook(myLibrary[newBook]);
    form.reset();
    dialog.close();
});

for (let i = 0; i < myLibrary.length; i++) {
    Object.setPrototypeOf(myLibrary[i], Book.prototype);
}

for (let index = 0; index < myLibrary.length; index++) {
    allDeleteBtn[index].setAttribute("data-index", index);
    allEditBtn[index].setAttribute("data-index", index);
    allDeleteBtn[index].addEventListener("click", () => {
        let deleteIndex = allDeleteBtn[index].dataset.index;
        myLibrary.splice(deleteIndex, 1);
        table.removeChild(allDeleteBtn[index].parentNode.parentNode.parentNode)
        console.log(myLibrary);
    });
}

for (let index = 0; index < allEditBtn.length; index++) {
    allEditBtn[index].addEventListener("click", () => {
        editDialog.showModal();
        newSubmitBtn.addEventListener("click", (event) => {
            event.preventDefault();
            let editIndex = allEditBtn[index].dataset.index;
            myLibrary[editIndex].setReadStatus(newStatus.value);
            allEditBtn[index].parentNode.parentNode.parentNode.children[3].textContent = newStatus.value;
            form.reset();
            editDialog.close();
        });
    });
}