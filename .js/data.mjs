export let dataTransactions = [];
let id = 1;
let balance = 0;

export function addBalance (nominal) {
    balance = nominal;
    return balance;
}

export function editBalance (newValue) {
    balance = newValue;
    return balance;
}

export function addTransactions (transactions) {
    dataTransactions.push(transactions);
}

export function editTransactions (id, newData) {
    dataTransactions = dataTransactions.map((n) => {
        if (n.ID === id) {
            return {
                ...n,
                ...newData
            }
        }
        return n
    });
}

export function deleteTransactions (id) {
    dataTransactions = dataTransactions.filter((n) => n.ID !== id);
    return dataTransactions;
}

export function getTransactions (id) {
    const getData = dataTransactions.find((x) => x.ID === id);
    return getData;
}

export function replaceData(saved) {
    dataTransactions = saved;
    return saved;
}
