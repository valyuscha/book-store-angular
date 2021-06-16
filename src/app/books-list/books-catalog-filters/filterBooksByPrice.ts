import {IDefaultBook} from 'interfaces';

export const filterBooksByPrice = (value: string, books: IDefaultBook[]) => {
  let filteredBooks: IDefaultBook[] = []

  if (value === 'No filters') {
    return books
  } else if (value === '0 < price < 25') {
    filteredBooks = []
    books.filter(book => {
      if (book.price > 0 && book.price <= 25) {
        filteredBooks.push(book)
      }
    })
  } else if (value === '25 < price < 50') {
    filteredBooks = []
    books.filter(book => {
      if (book.price > 25 && book.price <= 50) {
        filteredBooks.push(book)
      }
    })
  } else if (value === 'price > 50') {
    filteredBooks = []
    books.filter(book => {
      if (book.price > 50) {
        filteredBooks.push(book)
      }
    })
  }

  return filteredBooks
}
