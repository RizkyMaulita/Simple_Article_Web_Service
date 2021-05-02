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

const searchAndFilterData = (data, query, author) => {
  let searchByKeyword = []
  if (query) {
    const queryRegex = new RegExp(query, 'i')
    data.forEach(article => {
      if (queryRegex.test(article.title) || queryRegex.test(article.body)) {
        searchByKeyword.push(article)
      }
    })
  } else {
    searchByKeyword = data
  }
  let searchByAuthor = []
  if (author) {
    const authorRegex = new RegExp(author, 'i')
    searchByAuthor = searchByKeyword.filter(article => authorRegex.test(article.author))
  } else {
    searchByAuthor = searchByKeyword
  }
  return searchByAuthor
}

module.exports = {
  sortData,
  searchAndFilterData
}