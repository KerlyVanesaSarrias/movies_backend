const formatBirthday = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${day} ${month}`;
}

module.exports = formatBirthday;