module.exports = {
    format_date: date => {
        const formattedDate = new Date(date);
        return `${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${formattedDate.getFullYear()}`;
    },

    format_plural: (word, amount) => {
        return amount !== 1 ? `${word}s` : word;
    }
};