import {AddRemoveBookFromCartAction} from 'globalTypes';

export const chooseBooksAmount = (
  chosenAmountOfBooks: number,
  availableAmountOfBooks: number,
  action: AddRemoveBookFromCartAction,
) => {
  switch (action) {
    case 'add':
      if (chosenAmountOfBooks < availableAmountOfBooks) {
        return chosenAmountOfBooks + 1
      } else {
        return chosenAmountOfBooks
      }
    case 'remove':
      if (chosenAmountOfBooks > 1) {
        return chosenAmountOfBooks - 1
      } else {
        return chosenAmountOfBooks
      }
    default:
      return chosenAmountOfBooks
  }
}
