import {CHANGE_VIEW_MODE, CUSTOMERS_LIST} from '../main.constants';

export const viewReducer = (state: string = CUSTOMERS_LIST, action: {type: string; payload: any;}) => {
  switch(action.type) {
    case CHANGE_VIEW_MODE: return action.payload;
    default: return state;
  }
}
