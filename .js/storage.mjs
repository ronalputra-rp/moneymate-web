import {replaceData ,dataTransactions, addTransactions, editTransactions, deleteTransactions, getTransactions } from "./data.mjs";
    
const STORAGE_KEY = "transactions";
const STORAGE_BALANCE = "balance";

export function saveTransactions (data) {
    localStorage.setItem(STORAGE_KEY,JSON.stringify(data));
}

export function loadTransactions() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return [];
    }
    return JSON.parse(data)
}

export function clearTransactions() {
    localStorage.removeItem(STORAGE_KEY);
}

export function saveBalance (nominal) {
    localStorage.setItem(STORAGE_BALANCE,Number(nominal));
}

export function loadBalance () {
    const data = localStorage.getItem(STORAGE_BALANCE);
    // if (!data) {
    //     return "Belum ada data yang dimasukkan";
    // }
    return JSON.parse(data);
}

export function clearBalance () {
    localStorage.removeItem(STORAGE_BALANCE);
}
