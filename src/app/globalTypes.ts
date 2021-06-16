import {ICartBook} from 'interfaces';

export type AddRemoveBookFromCartAction = 'add' | 'remove'

export type BookInfo = {
  [key: string]: ICartBook
}
