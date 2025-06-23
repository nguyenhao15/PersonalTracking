
export function formatDate(date, options, locale = "vi-VN") {
    if (!date) return "N/A";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid date";

    return d.toLocaleDateString(locale, options || {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function formatThousands(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const getTotal = (dataArray, valueColName) => {
    return dataArray.reduce((sum, item) => sum + Number(item[valueColName] || 0), 0)
}

export const createAmountHandler = (setState, key) => (e) => {
    const raw = e.target.value.replace(/\./g, "");
    if (!/^\d*$/.test(raw)) return;
    setState((prev) => ({
        ...prev,
        [key]: raw,
    }));
};

export const prepareExpenseBarChartData = (data = []) => {
    const chartData = data.map((item) => ({
        date: item?.date,
        amount: item?.amount,
    }));

    return chartData;
};


export const groupTransactionsByDate = (transactions, groupBy = 'day') => {
    const grouped = {};
    transactions.forEach((tx) => {
        const date = new Date(tx.date); // đã là yyyy-mm-dd hoặc ISO
        let key;

        switch (groupBy) {
            case "month":
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-01`;
                break;
            case "year":
                key = `${date.getFullYear()}-01-01`;
                break;
            case "day":
            default:
                key = tx.date;
                break;
        }

        const keyResult = formatDate(key)

        if (!grouped[keyResult]) {
            grouped[keyResult] = 0;
        }
        grouped[keyResult] += tx.amount;
    });

    // Chuyển về dạng array để dùng trong BarChart
    return Object.entries(grouped).map(([date, amount]) => ({
        date,
        amount,
    }));
};



export const sortByDate = (arr, asc = true) =>
    [...arr].sort((a, b) =>
        asc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );


export const formatToMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${year}`;
}

export const prepareIncomeBarChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedDate = groupTransactionsByDate(sortedData, "month");

    const chartData = groupedDate.map((item) => ({
        date: item?.date,
        month: item?.date,
        amount: item?.amount,
    }));

    return chartData;
};


export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = sortedData.map((item) => ({
        date: item?.date,
        amount: item?.amount,
    }));

    return chartData;
}