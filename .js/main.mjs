import {replaceData, dataTransactions, addTransactions,editTransactions, deleteTransactions, getTransactions } from "./data.mjs";

import { saveTransactions, loadTransactions, clearTransactions } from "./storage.mjs";

export function init() { 
    const savedData = loadTransactions();
    replaceData(savedData);
}

export function addController(transaction) {
    addTransactions(transaction);
    saveTransactions(dataTransactions);
}

export function editController(id,data) {
    editTransactions(id,data);
    saveTransactions(dataTransactions);
}

export function deleteController(id) {
    deleteTransactions(id);
    saveTransactions(dataTransactions);
}

