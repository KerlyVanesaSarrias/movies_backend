const toCamelCase = (str) => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
}
  
const mapToDTO = (entity) => {
    const dto = {};
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const camelCaseKey = toCamelCase(key);
            dto[camelCaseKey] = entity[key];
        }
    }
    return dto;
}

module.exports = mapToDTO;