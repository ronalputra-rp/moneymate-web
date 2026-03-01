import {replaceData ,dataTransactions, addTransactions, editTransactions, deleteTransactions, getTransactions } from "./data.mjs";
    
const STORAGE_KEY = "transactions"

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
