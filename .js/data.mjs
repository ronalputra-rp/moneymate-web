export let dataTransactions = [];
let id = 1;
export let balance = 0;

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
        if (n.id === id) {
            return {
                ...n,
                ...newData
            }
        }
        return n
    });
}

export function deleteTransactions (id) {
    const index = dataTransactions.findIndex(n => String(n.id) === String(id));
    if (index !== -1) {
        dataTransactions.splice(index,1)
    }
    return dataTransactions;
}

export function getTransactions (id) {
    const getData = dataTransactions.find((x) => x.id === id);
    return getData;
}

export function replaceData(saved) {
    dataTransactions = saved;
    return saved;
}
