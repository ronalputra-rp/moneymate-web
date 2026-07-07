import {replaceData, dataTransactions, addTransactions,editTransactions, deleteTransactions, 
    getTransactions, addBalance, editBalance } from "./data.mjs";

import { saveTransactions, loadTransactions, clearTransactions, saveBalance, loadBalance, clearBalance,saveViewBalance,loadView } from "./storage.mjs";

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

export function addBalanceController(nominal) {
    addBalance(nominal);
    saveBalance(nominal);
}

export function loadBalanceController() {
    return loadBalance();
}

export function editBalanceController(newValue) {
    editBalance(newValue);
    saveBalance(newValue);
}

export function deleteBalanceController() {
    clearBalance();
}

export function setStateView(data) {
    saveViewBalance(data);
}

export function loadState() {
    return loadView();
}

init();
// console.log(dataTransactions);

