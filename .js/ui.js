import {addController, editController, deleteController, addBalanceController, loadBalanceController, editBalanceController, deleteBalanceController } from "./main.mjs";
import { loadBalance, loadTransactions, saveBalance } from "./storage.mjs";
import { dataTransactions } from "./data.mjs";

const transactionsData = loadTransactions();

const balanceWrapper = document.getElementById("balance-wrapper");
const balanceInputSection = document.getElementById("balance-section");
const balanceInput = document.getElementById("balance-input");
const balanceButton = document.getElementById("balance-button");
const toBalance = document.getElementById("to-balance")
const idInput = document.getElementById("id-input");
const transactionInput = document.getElementById("trans-input");
const typeInput = document.getElementById("type-input");
const categoryInput = document.getElementById("category-input");
const nominalInput = document.getElementById("nominal-input");
const dateInput = document.getElementById("date-input");
const saveButton = document.getElementById("save-button");
const wrapperRenderTransaction = document.getElementById("list-data-wrapper");
const inputSection = document.getElementById("input-data");
const inputForm = document.getElementById("input-form");
const listDataButton = document.getElementById("to-list");
const addButton = document.getElementById("to-add");
const balanceDataThumb = document.getElementById("balance-data-thumb");
let editingId = null;

listDataButton.addEventListener("click",(e) => {
    e.preventDefault();
    wrapperRenderTransaction.classList.remove("hidden");
})

let currentBalance = null;
function newBalanceHandle(e) {
    e.preventDefault();
    const balanceValue = balanceInput.value.trim();
    addBalanceController(balanceValue);
    currentBalance = balanceValue;
    balanceInputSection.classList.add("invisible");
    balanceButton.classList.add("invisible");
    // balanceWrapper.classList.remove("hidden");
    renderBalance();
}

document.addEventListener("DOMContentLoaded", () => {
    let getBalance = loadBalanceController();
    if (getBalance) {
        currentBalance = getBalance;
        balanceDataThumb.remove();
        renderBalance();
    }
})

function renderBalance() {
    balanceWrapper.innerHTML = "";
    if (!currentBalance) {
        return;
    }
    const balanceOutputWrap = document.createElement("section");
    balanceOutputWrap.className = "balance-out rounded-2xl w-sm max-w-lg shadow-2xl shadow-gray-400 hover:bg-emerald-600 hover:text-white";
    balanceOutputWrap.id = "balance-out-section";
    balanceWrapper.appendChild(balanceOutputWrap);
    const balanceOutputData = document.createElement("p");
    balanceOutputData.className = "p-6";
    balanceOutputData.id = "balance-out-data";
    balanceOutputData.textContent = `Your Balance : ${currentBalance.toLocaleString(`id-ID`)}`;
    balanceOutputWrap.appendChild(balanceOutputData);
    const editBalanceButton = document.createElement("button");
    editBalanceButton.type = "button";
    editBalanceButton.id = "edit-balance";
    editBalanceButton.className = "pl-6 hover:bg-emerald-400";
    editBalanceButton.textContent = "Edit balance";
    const deleteBalanceButton = document.createElement("button");
    deleteBalanceButton.type = "button";
    deleteBalanceButton.id = "delete-balance";
    deleteBalanceButton.className = "delete-balance pl-6 hover:bg-emerald-400";
    deleteBalanceButton.textContent = "Delete balance";
    balanceOutputWrap.appendChild(editBalanceButton);
    balanceOutputWrap.appendChild(deleteBalanceButton);
    const balanceEdit = document.getElementById("edit-balance");
    const balanceDelete = document.getElementById("delete-balance");
    balanceEdit.addEventListener("click",(e) => {
        e.preventDefault();
        balanceOutputWrap.classList.add("invisible");
        balanceInputSection.classList.remove("hidden");
        balanceButton.classList.remove("invisible");
        balanceButton.textContent = "Update";
        // fix bug edit button ketika di klik 2 kali form nya hilang
    });
    balanceDelete.addEventListener("click",(e) => {
        balanceOutputWrap.remove();
        deleteBalanceController();
    })
    // besok buat auto summarize dan design UI kalau sempat
} 

balanceButton.addEventListener("click",(e) => {
    newBalanceHandle(e);
})

toBalance.addEventListener("click",(e) => {
    e.preventDefault();
    balanceInputSection.classList.remove("hidden");
})

function handleSave(e) {
    e.preventDefault();
    const id = idInput.value.trim();
    const transactionName = transactionInput.value.trim();
    const typeTransactions = typeInput.value.trim();
    const category = categoryInput.value.trim();
    const nominal = nominalInput.value.trim();
    const date = dateInput.value.trim();
    const data = {
        ID:id,
        transactionName:transactionName,
        type:typeTransactions,
        category:category,
        nominal:Number(nominal),
        date:date
    }
    if (editingId === null) {
        addController(data);
    }
    else {
        editController(editingId,data);
    }
    window.location.reload();
}

saveButton.addEventListener("click",handleSave);

addButton.addEventListener("click",(e) => {
    e.preventDefault();
    inputSection.classList.remove("hidden");
    inputForm.classList.remove("hidden");
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
        addEditButton.dataset.id = `${idResult}`;
        addEditButton.type = "button";
        addEditButton.className = "edit-button hover:bg-emerald-400";
        addEditButton.textContent = "Edit data";
        const addDeleteButton = document.createElement("button");
        addDeleteButton.dataset.id = `${idResult}`;
        addDeleteButton.type = "button";
        addDeleteButton.className = `delete-button hover:bg-emerald-400`;
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

function deleteEditConfiguration() {
    wrapperRenderTransaction.addEventListener("click",(e) => {
        e.preventDefault();
        const id = e.target.dataset.id;
        if (e.target.classList.contains(`delete-button`)) {
            deleteController(id);
            alert("Transaksi berhasil dihapus");
            window.location.reload();
        }
        if (e.target.classList.contains("edit-button")) {
            saveButton.textContent = "Edit Transactions";
            inputSection.classList.remove("hidden");
            inputForm.classList.remove("hidden");
            editingId = id;
        }

    })
}

deleteEditConfiguration();

let summarizeElement = [];
function autoSummarizeOperation() {
    for (const transactions of dataTransactions) {
        summarizeElement.push({
            id:transactions.ID,
            name:transactions.transactionName,
            type:transactions.type,
            category:transactions.category,
            date:transactions.date,
            nominal:transactions.nominal,
        });
    }
    return summarizeElement;
}

const summaryWrapper = document.getElementById("summary-wrapper");
function summaryOutput() {
    const output = autoSummarizeOperation();
    const summaryContent = document.createElement("section");
    summaryContent.id = "summary-content";
    summaryWrapper.appendChild(summaryContent);
    const getSummaryContent = document.getElementById("summary-content");
    getSummaryContent.className = "rounded-2xl w-sm max-w-lg shadow-2xl shadow-gray-400 hover:bg-emerald-600 hover:text-white";
    let total = 0;
    for (let i = 0; i < output.length; i++) {
        const id = output[i].id;
        const nameContent = output[i].name;
        const typeContent = output[i].type;
        const categoryContent = output[i].category;
        const dateContent = output[i].date;
        const totalNomContent = Number(output[i].nominal);
        total += totalNomContent;

        const nameValue = document.createElement("p");
        nameValue.id = "name-value";
        // fix kenapa undefined
        // besok lanjut auto summary, dan coba buat fitur filter type income or outcome
        nameValue.textContent = `Transaksi ${output.id} : ${nameContent}`;
        const typeValue = document.createElement("p");
        typeValue.id = "type-value";
        typeValue.textContent = `Type : ${typeContent}`;
        const categoryValue = document.createElement("p");
        categoryValue.id = "category-value";
        categoryValue.textContent = `Kategori : ${categoryContent}`;
        const dateValue = document.createElement("p");
        dateValue.id = "date-value";
        dateValue.textContent = `Tanggal : ${dateContent}`;
        const nominal = document.createElement("p");
        nominal.id = "nominal-value";
        nominal.textContent = `Uang yang diterima/dibayar : ${totalNomContent}`;
        getSummaryContent.appendChild(nameValue);
        getSummaryContent.appendChild(typeValue);
        getSummaryContent.appendChild(categoryValue);
        getSummaryContent.appendChild(dateValue);
        getSummaryContent.appendChild(nominal);
        
    }
    const totalNominal = document.createElement("p");
    totalNominal.id = "total-value";
    totalNominal.textContent = `Total pengeluaran : ${total}`;
    const totalTranscation = document.createElement("p");
    totalTranscation.id = "total-trans-value";
    totalTranscation.textContent = `Total transaksi : ${output.length}`;
    getSummaryContent.appendChild(totalNominal);
    getSummaryContent.appendChild(totalTranscation);
}

summaryOutput();