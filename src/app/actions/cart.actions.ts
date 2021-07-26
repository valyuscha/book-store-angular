import {ICartBook} from 'interfaces';
import {AddRemoveBookFromCartAction} from 'globalTypes';

export class Add {
  static readonly type = '[CART] add';

  constructor(public payload: ICartBook) {
  }
}

export class Edit {
  static readonly type = '[CART] edit';

  constructor(public payload: {bookId: string, action: AddRemoveBookFromCartAction}) {
  }
}

export class Remove {
  static readonly type = '[CART] remove';

  constructor(public payload: string) {
  }
}

export class Clear {
  static readonly type = '[CART] clear';
}

export class Purchase {
  static readonly type = '[CART] purchase';

  constructor(public payload: ICartBook[]) {
  }
}
