import {chooseBooksAmount} from 'utils';
import {AddRemoveBookFromCartAction} from 'globalTypes';
import {ICartBook, IDefaultBook} from 'interfaces';

export const getChangedBooksCount = (
  currentBookInCart: [string, ICartBook][],
  booksCount: number,
  currentBookInfo: IDefaultBook,
  setCanIncreaseBooksCount: (canIncrease: boolean) => void,
  action: AddRemoveBookFromCartAction
) => {
  let changedBooksCount

  if (currentBookInCart.length) {
    const alreadyAddedCount = currentBookInCart[0][1].addedCount

    changedBooksCount = chooseBooksAmount(
      booksCount,
      currentBookInfo.count - alreadyAddedCount,
      action
    )

    if (changedBooksCount === currentBookInfo.count - alreadyAddedCount) {
      setCanIncreaseBooksCount(false)
    } else if (changedBooksCount < currentBookInfo.count - alreadyAddedCount) {
      setCanIncreaseBooksCount(true)
    }
  } else {
    changedBooksCount = chooseBooksAmount(
      booksCount,
      currentBookInfo.count,
      action
    )

    if (changedBooksCount === currentBookInfo.count) {
      setCanIncreaseBooksCount(false)
    } else if (changedBooksCount < currentBookInfo.count) {
      setCanIncreaseBooksCount(true)
    }
  }

  return changedBooksCount
}
