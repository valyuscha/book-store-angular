import {ICartBook} from 'interfaces';

export const countTotalPriceOfSameBooks = (bookPrice: number, booksAmount: number) => {
  return Math.round((bookPrice * booksAmount) * 100) / 100
}

export const countTotalPriceOfAllBooks = (books: ICartBook[]) => {
  return books.reduce((totalPrice, book) => {
    return Math.round((totalPrice + book.currentBookTotalPrice) * 100) / 100
  }, 0)
}
