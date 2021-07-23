import {BookInfo} from 'globalTypes';
import {ICartBook, IDefaultBook} from 'interfaces';

export const disableAddingNewBooksIfThereISNoCurrentBooks = (
  addedToCartBooks: ICartBook[],
  currentBookInfo: IDefaultBook,
  setBooksCount: (count: number) => void,
  setCanIncreaseBooksCount: (canIncrease: boolean) => void,
  setTotalPrice: (price: number) => void
) => {
  // const currentBookInCart = addedToCartBooks ? Object.entries(addedToCartBooks).filter(book => {
  //   if (book[0] === currentBookInfo.id) return book;
  //   return;
  // }) : [];

  console.log(addedToCartBooks);

  // const currentBookInCart: ICartBook[] = addedToCartBooks.filter((item: ICartBook) => +item.id === +currentBookInfo.id);
  // console.log(currentBookInCart);

  // if (currentBookInCart.length) {
  //   const alreadyAddedCount = currentBookInCart[0][1].addedCount;
  //   if (currentBookInfo.count - alreadyAddedCount === 0) {
  //     setBooksCount(0);
  //     setCanIncreaseBooksCount(false);
  //     setTotalPrice(0);
  //   }
  //
  //   if (currentBookInfo.count - alreadyAddedCount === 1) {
  //     setCanIncreaseBooksCount(false);
  //     setTotalPrice(currentBookInfo.price);
  //   }
  // }
};
