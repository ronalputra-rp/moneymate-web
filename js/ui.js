import {
    addController,
    editController,
    deleteController,
    addBalanceController,
    loadBalanceController,
    editBalanceController,
    deleteBalanceController,
} from "./main.mjs";
import { loadBalance, loadTransactions, saveBalance } from "./storage.mjs";
import { balance, dataTransactions, editBalance } from "./data.mjs";

let stateData = dataTransactions;
let finalData = stateData.sort((a, b) => {
    return a.id - b.id;
});
console.log(stateData);
const balanceState = loadBalanceController();
const transactionsData = loadTransactions();


const balanceWrapper = document.getElementById("balance-wrapper");
const balanceInputSection = document.getElementById("balance-section");
const balanceInput = document.getElementById("balance-input");
const balanceButton = document.getElementById("balance-button");
const toBalance = document.getElementById("to-balance");
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
const closeForm = document.getElementById("close-form");
const listDataButton = document.getElementById("to-list");
const addButton = document.getElementById("add-button");
const balanceDataThumb = document.getElementById("balance-data-thumb");
const buttonExpanded = document.getElementById("button-expanded");
let editingId = null;

let currentBalance = null;

function newBalanceHandle(e) {
    e.preventDefault();
    const balanceValue = balanceInput.value.trim();
    const beforeFormat = Number(balanceValue);
    const formatBalance = beforeFormat.toLocaleString("id-ID");
    addBalanceController(balanceValue);

    currentBalance = formatBalance;
    balanceInputSection.classList.add("hidden");
    balanceButton.classList.add("hidden");
    // balanceWrapper.classList.remove("hidden");
    renderBalance();
}

document.addEventListener("DOMContentLoaded", () => {
    let getBalance = loadBalanceController();
    if (getBalance) {
        const formatGet = getBalance.toLocaleString("id-ID");
        console.log(formatGet);
        currentBalance = formatGet;
        // balanceDataThumb.remove();
        renderBalance();
    }
    if (!document.getElementById("balance-out-section")) {
        balanceInputSection.classList.remove("hidden");
    }
});

function renderBalance() {
    balanceWrapper.innerHTML = "";
    if (!currentBalance) {
        return;
    }
    const balanceOutputWrap = document.createElement("section");
    balanceOutputWrap.className = "balance-out relative rounded-2xl px-4 sm:max-w-sm lg:max-w-lg";
    balanceOutputWrap.id = "balance-out-section";
    balanceWrapper.appendChild(balanceOutputWrap);
    const balanceOutputData = document.createElement("p");
    balanceOutputData.className = "pl-2 mt-6 text-sm text-gray-300 font-semibold font-1";
    balanceOutputData.id = "balance-out-data";
    balanceOutputData.textContent = `Wallet Balance`;
    balanceOutputWrap.appendChild(balanceOutputData);
    let hideButton = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
    `;
    const balanceOutputNominal = document.createElement("p");
    balanceOutputNominal.className = "pl-2 text-3xl lg:text-4xl mt-1 mb-4 font-3";
    balanceOutputNominal.id = "balance-out-nominal";
    balanceOutputNominal.textContent = `Rp. ${currentBalance.toLocaleString(`id-ID`)}`;
    balanceOutputWrap.appendChild(balanceOutputNominal);
    const hideNominal = document.createElement("button");
    hideNominal.id = "hide-nominal";
    hideNominal.type = "button";
    hideNominal.className =
        "ml-2 bg-linear-to-bl from-green-600 to-emerald-900 border-t border-l border-white/40 border-b border-r border-black/60 shadow-[inset_1px_1px_2px_rgba(255,255,255,0.1),_inset_-1px_-1px_2px_rgba(0,0,0,0.4)] rounded-xl p-1 absolute top-6 -translate-y-0.5 right-1/12 md:right-1/2 lg:right-1/2 translate-x-2";
    hideNominal.innerHTML = `${hideButton}`;
    balanceOutputWrap.appendChild(hideNominal);
    let isToggle = false;
    hideNominal.addEventListener("click", (e) => {
        isToggle = !isToggle;
        e.preventDefault();
        const nominalOutput = document.getElementById("balance-out-nominal");
        if (isToggle) {
            nominalOutput.textContent = "Rp. -------";
            hideButton = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
            `;
            hideNominal.innerHTML = `${hideButton}`;
        } else {
            nominalOutput.textContent = `Rp. ${currentBalance.toLocaleString(`id-ID`)}`;
            hideButton = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>`;
            hideNominal.innerHTML = `${hideButton}`;
        }
    });
    const buttonSection = document.createElement("section");
    buttonSection.className = "flex ml-1";
    balanceOutputWrap.appendChild(buttonSection);
    const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
    `;
    const editBalanceButton = document.createElement("button");
    editBalanceButton.type = "button";
    editBalanceButton.id = "edit-balance";
    editBalanceButton.className =
        "p-3 gap-2 flex items-center justify-center w-sm bg-green-700 transition-colors duration-150 ease-in-out hover:bg-linear-to-r hover:from-green-700 hover:to-emerald-900 rounded-2xl text-slate-100 text-sm font-3 font-medium uppercase cursor-pointer ring-1 ring-white";
    editBalanceButton.innerHTML = `Edit ${editIcon}`;
    const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
    `;
    const deleteBalanceButton = document.createElement("button");
    deleteBalanceButton.type = "button";
    deleteBalanceButton.id = "delete-balance";
    deleteBalanceButton.className =
        "delete-balance p-3 gap-2 w-sm flex items-center transition-colors duration-150 ease-in-out justify-center ml-4 bg-red-500 hover:bg-linear-to-l hover:from-red-500 hover:to-red-800 font-3 font-medium text-sm uppercase rounded-2xl cursor-pointer ring-1 ring-white";
    deleteBalanceButton.innerHTML = `Delete ${deleteIcon}`;
    buttonSection.appendChild(editBalanceButton);
    buttonSection.appendChild(deleteBalanceButton);
    const balanceEdit = document.getElementById("edit-balance");
    const balanceDelete = document.getElementById("delete-balance");
    balanceEdit.addEventListener("click", (e) => {
        e.preventDefault();
        balanceOutputWrap.classList.add("invisible");
        balanceInputSection.classList.remove("hidden");
        balanceButton.classList.remove("invisible");
        balanceButton.textContent = "Update";
        // fix bug edit button ketika di klik 2 kali form nya hilang
    });
    balanceDelete.addEventListener("click", (e) => {
        balanceOutputWrap.remove();
        deleteBalanceController();
        balanceInputSection.classList.remove("hidden");
        balanceButton.classList.remove("hidden");
    });
}

balanceButton.addEventListener("click", (e) => {
    newBalanceHandle(e);
});

function categoryConfiguration() {
    const categoryButton = document.getElementById("category");
    let arrowIcons = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-6 h-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    `;
    categoryButton.innerHTML = `${arrowIcons}`;
    const selectCategory = document.getElementById("select-category");
    const closeWrapper = document.getElementById("close-wrapper");
    categoryButton.addEventListener("click", (e) => {
        e.preventDefault();
        selectCategory.classList.remove("hidden");
        selectCategory.classList.add("flex");
        closeWrapper.classList.remove("invisible");
    });
    let categoryContent = [
        "Food & Beverage",
        "Housing & Rent",
        "Bills & Utilites",
        "Transportation",
        "Shopping",
        "Healthcare",
        "Entertainment",
        "Personal Care",
        "Education",
        "Gifts & Donation",
        "Others",
    ];
    for (let i = 0; i < categoryContent.length; i++) {
        const option = document.createElement("section");
        option.className = "category-option p-2 hover:bg-emerald-600 cursor-pointer";
        selectCategory.appendChild(option);
    }
    const categoryOption = document.getElementsByClassName("category-option");
    const closeOption = document.getElementById("close-option");
    const closeLogo = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" w-5 h-5 viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
`;
    closeOption.innerHTML = `${closeLogo}`;
    closeOption.addEventListener("click", (e) => {
        e.preventDefault();
        selectCategory.classList.add("hidden");
        selectCategory.classList.remove("flex");
    });
    for (let i = 0; i < categoryOption.length; i++) {
        categoryOption[i].textContent = categoryContent[i];
    }
    // const categorySection = document.getElementById("category-section");
    let editOptionLogo = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" class="w-5 h-5" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
`;
    const outputSection = document.getElementById("output-section");
    const outputOption = document.getElementById("output-option");
    const editOption = document.getElementById("edit-option");
    for (let i = 0; i < categoryOption.length; i++) {
        categoryOption[i].addEventListener("click", (e) => {
            const target = e.target.textContent.trim();
            outputOption.textContent = `${target}`;
            editOption.innerHTML = `${editOptionLogo}`;
            selectCategory.classList.remove("flex");
            selectCategory.classList.add("hidden");
            categoryButton.classList.add("hidden");
            outputSection.classList.remove("hidden");
            outputSection.classList.add("flex");
            editOption.addEventListener("click", (e) => {
                e.preventDefault();
                outputSection.classList.add("hidden");
                outputSection.classList.remove("flex");
                selectCategory.classList.remove("hidden");
                selectCategory.classList.add("flex");
            });
        });
    }
}

categoryConfiguration();

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    // wrapperRenderTransaction.innerHTML = "";
    inputSection.classList.toggle("hidden");
    inputForm.classList.remove("hidden");
    buttonExpanded.classList.add("invisible");
    document.body.classList.add("overflow-y-hidden");
});

closeForm.addEventListener("click", (e) => {
    e.preventDefault();
    inputSection.classList.toggle("hidden");
    document.body.classList.remove("overflow-y-hidden");
    buttonExpanded.classList.add("invisible");
});

const selectCategory = document.getElementById("select-category");
const outputSection = document.getElementById("output-section");
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        // inputSection.classList.add("invisible");
        searchWrapper.classList.add("invisible");
        document.body.classList.remove("overflow-y-hidden");
        selectCategory.classList.remove("flex");
        selectCategory.classList.add("hidden");
    }
});

function viewALlConfiguration() {
    const viewAllButton = document.getElementById("view-all-button");
    const arrowRight = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 4.5 15 15m0 0V8.25m0 11.25H8.25" />
</svg>
`;
    viewAllButton.innerHTML = `View All ${arrowRight}`;
}

viewALlConfiguration();

function addRenderResult() {
    wrapperRenderTransaction.innerHTML = "";
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    // let dataTrial = stateData;
    let dataRender = stateData.sort((a, b) => {
        return a.id - b.id;
    });
    // console.log('Data asli', dataTrial);
    console.log('Ini data buat render', dataRender);
    for (let i = 0; i < dataRender.length; i++) {
        const idResult = Number(dataRender[i].id);
        const nameResult = dataRender[i].transactionName;
        const typeResult = dataRender[i].type;
        const categoryResult = dataRender[i].category;
        const nominalResult = Number(dataRender[i].nominal);
        const nominalDisplay = nominalResult.toLocaleString(`id-ID`);
        const dateResult = dataRender[i].date;
        const dateParse = new Date(dateResult);
        const dateDisplay = dateParse.toLocaleDateString(`id-ID`, options);

        const createResultSection = document.createElement("section");
        createResultSection.className =
            "data-trans bg-linear-to-bl my-2 from-green-600 to-neutral-900 shadow-sm inset-shadow-sm inset-shadow-lime-500 shadow-emerald-500/100 rounded-2xl sm:max-w-sm lg:max-w-xl hover:bg-emerald-600 hover:text-white";
        wrapperRenderTransaction.appendChild(createResultSection);
        const createRenderSection = document.createElement("section");
        createRenderSection.id = `transaction-${idResult}`;
        createRenderSection.className = "p-6";
        createResultSection.appendChild(createRenderSection);
        const getResultSection = document.getElementById(`transaction-${idResult}`);
        const numberTransaction = document.createElement("p");
        numberTransaction.id = "number-transaction";
        numberTransaction.className = "font-1 text-xl";
        numberTransaction.textContent = `${[i + 1]}. ${nameResult}`;
        const nominalSection = document.createElement("p");
        nominalSection.className = "px-4 py-1 mt-2 font-2 text-xl font-bold";
        nominalSection.id = "nominal-result";
        nominalSection.textContent = `Rp. ${nominalDisplay}`;
        const dateSection = document.createElement("p");
        dateSection.className = "px-4 pt-1 mt-2 font-3 font-light text-sm text-white italic";
        dateSection.id = "date-result";
        dateSection.textContent = `${dateDisplay} `;

        const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        `;
        const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        `;
        const transButtonSection = document.createElement("section");
        transButtonSection.className = "flex justify-center gap-4";
        const addEditButton = document.createElement("button");
        addEditButton.dataset.id = `${idResult}`;
        addEditButton.type = "button";
        addEditButton.className =
            "edit-button p-3 mt-4 flex items-center gap-2 bg-green-700 hover:bg-linear-to-r hover:from-green-700 hover:to-emerald-900 transition-colors duration-150 ease-in-out rounded-2xl font-3 font-medium uppercase text-sm rounded-2xl ring-1 ring-white";
        addEditButton.innerHTML = `${editIcon} Edit`;
        const addDeleteButton = document.createElement("button");
        addDeleteButton.dataset.id = `${idResult}`;
        addDeleteButton.type = "button";
        addDeleteButton.className = `delete-button p-3 mt-4 flex items-center gap-2 transition-colors duration-150 ease-in-out justify-center ml-4 bg-red-500 hover:bg-linear-to-l hover:from-red-500 hover:to-red-800  font-3 font-medium uppercase text-sm rounded-2xl ring-1 ring-white`;
        addDeleteButton.innerHTML = `${deleteIcon} Delete`;

        getResultSection.appendChild(numberTransaction);
        getResultSection.appendChild(dateSection);
        getResultSection.appendChild(nominalSection);
        getResultSection.appendChild(transButtonSection);
        transButtonSection.appendChild(addEditButton);
        transButtonSection.appendChild(addDeleteButton);
    }
}

let buttonDisabled = false;
function handleSave(e) {
    e.preventDefault();
    const outputOption = document.getElementById("output-option");
    const id = Number(idInput.value.trim());
    if (stateData.some((data) => data.id === id) === true) {
        alert('ID sudah pernah disimpan, coba berikan ID unik lain');
        return;
    }
    const transactionName = transactionInput.value.trim();
    const typeTransactions = typeInput.value.trim();
    const category = outputOption.textContent.trim();
    const nominal = nominalInput.value.trim();
    const date = dateInput.value.trim();
    const data = {
        id: Number(id),
        transactionName: transactionName,
        type: typeTransactions,
        category: category,
        nominal: Number(nominal),
        date: date,
    };
    buttonDisabled = true;
    if (buttonDisabled === true) {
        const loading = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="shape-rendering: auto; display: block; background: transparent;" width="200" height="200" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="10" stroke="#ffffff" fill="none" cy="50" cx="50">
            <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="2.941176470588235s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
            </circle><g></g></g></svg>`;
        saveButton.innerHTML = `${loading} Loading`
    }
    if (stateData.includes(id) === true) {
        alert('Sudah terdapat data dengan ID yang sama !!');
        inputSection.classList.add("hidden");
        inputForm.classList.add("hidden");
        return;
    }
    if (editingId === null) {
        addController(data);
    } else {
        editController(editingId, data);
    }
    // wrapperRenderTransaction.innerHTML = "";
    setTimeout(() => {
        buttonDisabled = false;
        if (buttonDisabled === false) {
            saveButton.innerHTML = "Save Transactions";
        }
        inputSection.classList.add("hidden");
        inputForm.classList.add("hidden");
        alert("Data berhasil disimpan");
    }, 2000)
    addRenderResult();
    buttonExpanded.classList.add("invisible");
    document.body.classList.remove("overflow-y-hidden");
}

let deleteClicked = false;
function deleteEditConfiguration() {
    wrapperRenderTransaction.addEventListener("click", (e) => {
        e.preventDefault();
        const deleteBtn = e.target.closest(".delete-button");
        const id = parseInt(e.target.dataset.id);
        const loading = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" style="shape-rendering: auto; display: block; background: transparent;" width="200" height="200" xmlns:xlink="http://www.w3.org/1999/xlink"><g><circle stroke-dasharray="164.93361431346415 56.97787143782138" r="35" stroke-width="10" stroke="#ffffff" fill="none" cy="50" cx="50">
            <animateTransform keyTimes="0;1" values="0 50 50;360 50 50" dur="2.941176470588235s" repeatCount="indefinite" type="rotate" attributeName="transform"></animateTransform>
        </circle><g></g></g></svg>`;
        if (deleteBtn) {
            const id = parseInt(e.target.dataset.id);
            const delay = (ms) => new Promise(resolve => setTimeout(resolve,ms));
            console.log('Clicked in outside');
            const handleDelete = async() => {
                deleteClicked = true;
                deleteBtn.innerHTML = `${loading} Loading`;
                try {
                    await Promise.all([
                        deleteController(id),
                        delay(800)
                    ])
                    const index = stateData.findIndex(n => String(n.id) === String(id));
                    if (index !== -1) {
                        stateData.splice(index,1);
                    }
                    console.log("After delete : ", stateData)
                    alert("Transaksi berhasil dihapus");
                    addRenderResult();
                }
                catch (error) {
                    console.error('Terjadi Error' +  error.message)
                }
                finally {
                    deleteClicked = false;
                }
                
            }
            handleDelete();
        }
        if (e.target.classList.contains("edit-button")) {
            // wrapperRenderTransaction.innerHTML = "";
            saveButton.textContent = "Edit Transactions";
            inputSection.classList.toggle("hidden");
            inputForm.classList.remove("hidden");
            buttonExpanded.classList.add("invisible");
            editingId = id;
        }
    });
}

deleteEditConfiguration();

addRenderResult();

saveButton.addEventListener("click", handleSave);

function filterOutput() {
    const dataTrans = document.getElementsByClassName("type-result");
    console.log(dataTrans);
}

function filterOperation() {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const filteringIncome = finalData.filter((x) => x.type === "Income");
    const filteringOutcome = finalData.filter((x) => x.type === "Outcome");
    const filterIncome = document.getElementById("filter-content-1");
    const filterOutcome = document.getElementById("filter-content-2");
    const filterButton = document.getElementById("filter-button");
    const filterSection = document.getElementById("filter-section");
    filterButton.addEventListener("click", (e) => {
        e.preventDefault();
        // if (processFilterIncome === false && processFilterOutcome === false) {
        //     wrapperRenderTransaction.innerHTML = "";
        // }
        filterSection.classList.toggle("invisible");
    });
    filterIncome.addEventListener("click", (e) => {
        e.preventDefault();
        wrapperRenderTransaction.innerHTML = "";
        if (filteringIncome.length === 0) {
            const warningMessage = document.createElement("p");
            warningMessage.textContent = "Tidak ada data pemasukan";
            processFilterIncome = false;
            wrapperRenderTransaction.appendChild(warningMessage);
        }
        for (let i = 0; i < filteringIncome.length; i++) {
            const idResult = filteringIncome[i].id;
            const nameResult = filteringIncome[i].transactionName;
            const typeResult = filteringIncome[i].type;
            const categoryResult = filteringIncome[i].category;
            const nominalResult = Number(filteringIncome[i].nominal);
            const nominalDisplay = nominalResult.toLocaleString(`id-ID`);
            const dateResult = filteringIncome[i].date;
            const dateParse = new Date(dateResult);
            const dateDisplay = dateParse.toLocaleDateString(`id-ID`, options);

            const createResultSection = document.createElement("section");
            createResultSection.className =
                "data-trans rounded-2xl w-sm max-w-lg shadow-2xl shadow-gray-400 hover:bg-emerald-600 hover:text-white";
            wrapperRenderTransaction.appendChild(createResultSection);
            const createRenderSection = document.createElement("section");
            createRenderSection.className = "p-6";
            createRenderSection.id = `transaction-${idResult}`;
            createResultSection.appendChild(createRenderSection);
            const getResultSection = document.getElementById(`transaction-${idResult}`);

            const idRenderSection = document.createElement("p");
            idRenderSection.textContent = `ID : ${idResult}`;
            const nameSection = document.createElement("p");
            nameSection.textContent = `Transactions Name : ${nameResult}`;
            const typeSection = document.createElement("p");
            typeSection.textContent = `Type : ${typeResult}`;
            const categorySection = document.createElement("p");
            categorySection.textContent = `Category : ${categoryResult}`;
            const nominalSection = document.createElement("p");
            nominalSection.textContent = `Nominal : ${nominalDisplay}`;
            const dateSection = document.createElement("p");
            dateSection.textContent = `Date : ${dateDisplay}`;
            getResultSection.appendChild(idRenderSection);
            getResultSection.appendChild(nameSection);
            getResultSection.appendChild(typeSection);
            getResultSection.appendChild(categorySection);
            getResultSection.appendChild(nominalSection);
            getResultSection.appendChild(dateSection);
        }
    });
    filterOutcome.addEventListener("click", (e) => {
        e.preventDefault();
        wrapperRenderTransaction.innerHTML = "";
        if (filteringOutcome.length === 0) {
            const warningMessage = document.createElement("p");
            warningMessage.textContent = "Tidak ada data pengeluaran";
            wrapperRenderTransaction.appendChild(warningMessage);
        }
        for (let i = 0; i < filteringOutcome.length; i++) {
            const idResult = filteringOutcome[i].id;
            const nameResult = filteringOutcome[i].transactionName;
            const typeResult = filteringOutcome[i].type;
            const categoryResult = filteringOutcome[i].category;
            const nominalResult = Number(filteringOutcome[i].nominal);
            const nominalDisplay = nominalResult.toLocaleString(`id-ID`);
            const dateResult = filteringOutcome[i].date;
            const dateParse = new Date(dateResult);
            const dateDisplay = dateParse.toLocaleDateString(`id-ID`, options);

            const createResultSection = document.createElement("section");
            createResultSection.className =
                "data-trans rounded-2xl w-sm max-w-lg shadow-2xl shadow-gray-400 hover:bg-emerald-600 hover:text-white";
            wrapperRenderTransaction.appendChild(createResultSection);
            const createRenderSection = document.createElement("section");
            createRenderSection.className = "p-6";
            createRenderSection.id = `transaction-${idResult}`;
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
            getResultSection.appendChild(idRenderSection);
            getResultSection.appendChild(nameSection);
            getResultSection.appendChild(typeSection);
            getResultSection.appendChild(categorySection);
            getResultSection.appendChild(nominalSection);
            getResultSection.appendChild(dateSection);
        }
    });
    return {
        filteringIncome: filteringIncome,
        filteringOutcome: filteringOutcome,
    };
}

filterOperation();
filterOutput();

function autoSummarizeOperation() {
    const filterData = filterOperation();
    let summarizeElement = [];
    for (const transactions of filterData.filteringOutcome) {
        summarizeElement.push({
            id: transactions.ID,
            name: transactions.transactionName,
            type: transactions.type,
            category: transactions.category,
            date: transactions.date,
            nominal: transactions.nominal,
        });
    }
    return summarizeElement;
}

const summarySection = document.getElementById("summary-section");
const summaryWrapper = document.getElementById("summary-wrapper");
const summaryButton = document.getElementById("summary-button");
const toSummarize = document.getElementById("to-summarize");
const filterButton = document.getElementById("filter-button");
const toSpend = document.getElementById("to-spend");
const percentage = document.getElementById("percentage");
summaryButton.addEventListener("click", (e) => {
    e.preventDefault();
    wrapperRenderTransaction.innerHTML = "";
    summarySection.classList.remove("hidden");
    filterButton.classList.add("hidden");
});

function summaryCalculation() {
    let total = 0;
    let summaryData = autoSummarizeOperation();
    if (summaryData.length < 0) {
        total = 0;
    } else {
        for (let i = 0; i < summaryData.length; i++) {
            const totalNomContent = Number(summaryData[i].nominal);
            total += totalNomContent;
        }
    }
    return total;
}

function graphSolution() {
    let available = 0;
    const balanceValue = balanceState;
    const total = summaryCalculation();
    const getCanvas = document.getElementById("graph-canvas");
    const ctx = getCanvas.getContext("2d");
    const ratio = total / balanceValue;
    const percent = Math.round(ratio * 100);
    const percentDisplay = percent.toLocaleString("id-ID", { style: "decimal" });
    if (total === 0) {
        available = 0;
    } else {
        available = balanceValue - total;
    }
    const availableDisplay = available.toLocaleString("id-ID");
    console.log(`Balance nya : ${balanceValue}`);
    console.log(`Total nya : ${total}`);
    console.log(`Persenan nya : ${percent}`);
    const angle = ratio * 2 * Math.PI;
    const centerX = 110,
        centerY = 110,
        radius = 85;
    // ctx.clearRect(0,0,200,200);

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "pink";

    ctx.lineWidth = 35;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, angle - 0.5 * Math.PI);
    ctx.strokeStyle = "red";
    // ctx.lineCap = "round";
    ctx.stroke();

    percentage.textContent = `${percentDisplay} % used`;
    toSpend.textContent = `Rp. ${availableDisplay}`;
}

graphSolution();

const totalExpenses = document.getElementById("total-expenses");
const spendDetails = document.getElementById("details");
const totalIncome = document.getElementById("total-income");
function summaryDetails() {
    let income = 0;
    const total = summaryCalculation();
    const filterData = filterOperation();
    const formatOutcome = total.toLocaleString("id-ID");
    totalExpenses.textContent = `Rp. ${formatOutcome}`;
    if (filterData.filteringIncome.length > 0) {
        for (const data of filterData.filteringIncome) {
            income += data.nominal;
        }
        const formatIncome = income.toLocaleString("id-ID");
        totalIncome.textContent = `Rp. ${formatIncome}`;
    } else {
        totalIncome.textContent = `Rp. 0`;
    }
}

const filteringOutcome = finalData.filter((x) => x.type === "Outcome");
const categoryGrouping = filteringOutcome.map((x) => {
    return {
        category: x.category,
        nominal: x.nominal,
    };
});
function spendingField() {
    for (let i = 0; i < categoryGrouping.length; i++) {
        const spendingCategory = document.createElement("section");
        spendingCategory.className = "flex justify-between";
        spendingCategory.id = `category-${i + 1}`;
        spendDetails.appendChild(spendingCategory);
        const spendingName = document.createElement("p");
        spendingName.id = `name-${i + 1}`;
        spendingCategory.appendChild(spendingName);
        spendingName.className = "px-4 py-2";
        spendingName.textContent = categoryGrouping[i].category;
        const spendingValue = document.createElement("p");
        spendingValue.id = `value-${i}`;
        spendingValue.textContent = `Rp. ${categoryGrouping[i].nominal.toLocaleString(`id-ID`)}`;
        spendingValue.className = "px-4 py-2";
        spendingCategory.appendChild(spendingValue);
    }
}

const filteringIncome = finalData.filter((x) => x.type === "Income");
const incomeGrouping = filteringIncome.map((x) => {
    return {
        category: x.category,
        nominal: x.nominal,
    };
});
const incomeDetails = document.getElementById("details-income");
function incomeField() {
    for (let i = 0; i < incomeGrouping.length; i++) {
        const incomeCategory = document.createElement("section");
        incomeCategory.className = "flex justify-between";
        incomeCategory.id = `income-${i + 1}`;
        incomeDetails.appendChild(incomeCategory);
        const incomeName = document.createElement("p");
        incomeName.id = `income-name-${i + 1}`;
        incomeCategory.appendChild(incomeName);
        incomeName.className = "px-4 py-2";
        incomeName.textContent = incomeGrouping[i].category;
        const incomeValue = document.createElement("p");
        incomeValue.id = `income-value-${i}`;
        incomeValue.textContent = `Rp. ${incomeGrouping[i].nominal.toLocaleString(`id-ID`)}`;
        incomeValue.className = "px-4 py-2";
        incomeCategory.appendChild(incomeValue);
    }
}

summaryDetails();
spendingField();
incomeField();

const searchButton = document.getElementById("search");
const searchWrapper = document.getElementById("search-wrapper");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const inputData = searchInput.value.trim();
    searchWrapper.classList.toggle("invisible");
    document.body.classList.add("overflow-y-hidden");
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

document.addEventListener("keydown", (e) => {
    let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    if (e.key === "Enter") {
        // document.body.classList.remove("overflow-y-hidden");
        wrapperRenderTransaction.innerHTML = "";
        const inputData = searchInput.value.trim();
        const searchData = finalData.find((x) => x.transactionName === inputData);
        searchWrapper.classList.add("invisible");

        const idSearch = searchData.id;
        const nameSearch = searchData.transactionName;
        const nominalSearch = Number(searchData.nominal);
        const dateSearch = searchData.date;
        const dateParse = new Date(dateSearch);
        const dateDisplay = dateParse.toLocaleDateString(`id-ID`, options);
        const nominalDisplay = nominalSearch.toLocaleString(`id-ID`);

        const searchResultSection = document.createElement("section");
        searchResultSection.className =
            "data-trans bg-linear-to-bl my-2 from-green-600 to-neutral-900 shadow-sm inset-shadow-sm inset-shadow-lime-500 shadow-emerald-500/100 rounded-2xl sm:max-w-sm lg:max-w-xl hover:bg-emerald-600 hover:text-white";
        wrapperRenderTransaction.appendChild(searchResultSection);
        const resultSection = document.createElement("section");
        resultSection.id = `transaction-${idSearch}`;
        resultSection.className = "p-6";
        searchResultSection.appendChild(resultSection);
        const getResultSection = document.getElementById(`transaction-${idSearch}`);
        const idRenderSection = document.createElement("p");
        idRenderSection.id = "id-result";
        idRenderSection.className = "font-1 text-xl";
        idRenderSection.textContent = `${idSearch}. ${nameSearch}`;
        const nominalSection = document.createElement("p");
        nominalSection.className = "px-4 py-1 mt-2 font-2 text-xl font-bold";
        nominalSection.id = "nominal-result";
        nominalSection.textContent = `Rp. ${nominalDisplay}`;
        const dateSection = document.createElement("p");
        dateSection.className = "px-4 pt-1 mt-2 font-3 font-light text-sm text-white italic";
        dateSection.id = "date-result";
        dateSection.textContent = `${dateDisplay} `;

        const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        `;
        const deleteIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        `;
        const transButtonSection = document.createElement("section");
        transButtonSection.className = "flex justify-center gap-4";
        const addEditButton = document.createElement("button");
        addEditButton.dataset.id = `${idSearch}`;
        addEditButton.type = "button";
        addEditButton.className =
            "edit-button p-3 mt-4 flex items-center gap-2 bg-green-600 lg:hover:bg-emerald-400 font-3 font-medium uppercase text-sm rounded-2xl ring-1 ring-white";
        addEditButton.innerHTML = `${editIcon} Edit`;
        const addDeleteButton = document.createElement("button");
        addDeleteButton.dataset.id = `${idSearch}`;
        addDeleteButton.type = "button";
        addDeleteButton.className = `delete-button p-3 mt-4 flex items-center gap-2 bg-red-500 hover:bg-emerald-400 font-3 font-medium uppercase text-sm rounded-2xl ring-1 ring-white`;
        addDeleteButton.innerHTML = `${deleteIcon} Delete`;

        getResultSection.appendChild(idRenderSection);
        getResultSection.appendChild(dateSection);
        getResultSection.appendChild(nominalSection);
        getResultSection.appendChild(transButtonSection);
        transButtonSection.appendChild(addEditButton);
        transButtonSection.appendChild(addDeleteButton);
    }
});

const expandButton = document.getElementById("expand-button");
const expandIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
</svg>
`;
expandButton.innerHTML = `${expandIcon}`;
expandButton.addEventListener("click", (e) => {
    e.preventDefault();
    buttonExpanded.classList.toggle("invisible");
});

console.log(finalData);