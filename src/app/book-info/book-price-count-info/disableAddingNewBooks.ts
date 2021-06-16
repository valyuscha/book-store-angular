import {BookInfo} from 'globalTypes';
import {IDefaultBook} from 'interfaces';

export const disableAddingNewBooksIfThereISNoCurrentBooks = (
  addedToCartBooks: BookInfo,
  currentBookInfo: IDefaultBook,
  setBooksCount: (count: number) => void,
  setCanIncreaseBooksCount: (canIncrease: boolean) => void,
  setTotalPrice: (price: number) => void
) => {
  const currentBookInCart = Object.entries(addedToCartBooks).filter(book => {
    if (book[0] === currentBookInfo.id) return book
    return
  })

  if (currentBookInCart.length) {
    const alreadyAddedCount = currentBookInCart[0][1].addedCount
    if (currentBookInfo.count - alreadyAddedCount === 0) {
      setBooksCount(0)
      setCanIncreaseBooksCount(false)
      setTotalPrice(0)
    }

    if (currentBookInfo.count - alreadyAddedCount === 1) {
      setCanIncreaseBooksCount(false)
      setTotalPrice(currentBookInfo.price)
    }
  }
}
