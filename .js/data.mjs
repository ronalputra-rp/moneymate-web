export let dataTransactions = [];
let id = 1;

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
    dataTransactions = dataTransactions.filter((n) => n.id !== id);
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
