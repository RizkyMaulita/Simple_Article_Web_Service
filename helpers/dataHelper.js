const sortData = (data, key, method = 'ASC') => {
  switch (method) {
    case 'ASC' : 
      return data.sort((a, b) => a[key] - b[key])
    case 'DESC' :
      return data.sort((a, b) => b[key] - a[key])
    default:
      return data.sort((a, b) => a[key] - b[key])
  }
}

module.exports = {
  sortData
}