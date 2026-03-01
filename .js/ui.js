import {init, addController, editController, deleteController } from "./main.mjs";
import { loadTransactions } from "./storage.mjs";

const transactionsData = loadTransactions();

const idInput = document.getElementById("id-input");
const transactionInput = document.getElementById("trans-input");
const typeInput = document.getElementById("type-input");
const categoryInput = document.getElementById("category-input");
const nominalInput = document.getElementById("nominal-input");
const dateInput = document.getElementById("date-input");
const saveButton = document.getElementById("save-button");
const wrapperRenderTransaction = document.getElementById("list-data-wrapper");

saveButton.addEventListener("click", (e) => {
    e.preventDefault();
    init();
    const id = idInput.value.trim();
    const transactionName = transactionInput.value.trim();
    const typeTransactions = typeInput.value.trim();
    const category = categoryInput.value.trim();
    const nominal = nominalInput.value.trim();
    const date = dateInput.value.trim();
    addController({
        ID:id,
        transactionName:transactionName,
        type:typeTransactions,
        category:category,
        nominal:nominal,
        date:date
    })
    window.location.reload();

})

function addRenderResult() {
    let options = {
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    }
    for (let i = 0; i < transactionsData.length; i++ ) {
        const idResult = transactionsData[i].ID;
        const nameResult = transactionsData[i].transactionName;
        const typeResult = transactionsData[i].type;
        const categoryResult = transactionsData[i].category;
        const nominalResult = Number(transactionsData[i].nominal);
        const nominalDisplay = nominalResult.toLocaleString(`id-ID`);
        const dateResult = transactionsData[i].date;
        const dateParse = new Date(dateResult);
        const dateDisplay = dateParse.toLocaleDateString(`id-ID`,options);

        const createResultSection = document.createElement("section");
        createResultSection.id = `transaction`;
        createResultSection.className = "data-trans rounded-2xl w-sm max-w-lg shadow-2xl shadow-gray-400 hover:bg-emerald-600 hover:text-white";
        wrapperRenderTransaction.appendChild(createResultSection);
        const createRenderSection = document.createElement("section");
        createRenderSection.id = `transaction-${idResult}`
        createRenderSection.className = "p-6";
        createResultSection.appendChild(createRenderSection);
        const getResultSection = document.getElementById(`transaction-${idResult}`);
        const idRenderSection = document.createElement("p");
        idRenderSection.textContent = `ID : ${idResult}`;
        const nameSection = document.createElement("p");
        nameSection.textContent = `Transcations Name : ${nameResult}`;
        const typeSection = document.createElement("p");
        typeSection.textContent = `Type : ${typeResult}`;
        const categorySection = document.createElement("p");
        categorySection.textContent = `Category : ${categoryResult}`;
        const nominalSection = document.createElement("p");
        nominalSection.textContent = `Nominal : ${nominalDisplay}`;
        const dateSection = document.createElement("p");
        dateSection.textContent = `Date : ${dateDisplay}`;
        const addEditButton = document.createElement("button");
        addEditButton.dataset.id = `edit-${idResult}`;
        addEditButton.type = "button";
        addEditButton.className = "edit-button hover:bg-emerald-400";
        addEditButton.textContent = "Edit data";
        const addDeleteButton = document.createElement("button");
        addDeleteButton.dataset.id = `delete-${idResult}`;
        addDeleteButton.type = "button";
        addDeleteButton.className = "delete-button hover:bg-emerald-400"
        addDeleteButton.textContent = "Delete Data";

        getResultSection.appendChild(idRenderSection);
        getResultSection.appendChild(nameSection);
        getResultSection.appendChild(typeSection);
        getResultSection.appendChild(categorySection);
        getResultSection.appendChild(nominalSection);
        getResultSection.appendChild(dateSection);
        getResultSection.appendChild(addEditButton);
        getResultSection.appendChild(addDeleteButton);
    }
}

addRenderResult();
const editButton = document.querySelectorAll(".edit-button");
const deleteButton = document.querySelectorAll(".delete-button");

console.log(editButton);
console.log(deleteButton);


function editConfiguration() {
    wrapperRenderTransaction.addEventListener("click",(e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        init();
        if (e.target.classList.contains("delete-button")) {
            try {
                deleteController(id);
                console.log("Ini jalan");
            }
            catch {
                console.log("Ini gak jalan");
            }

        }
    })
}

editConfiguration();