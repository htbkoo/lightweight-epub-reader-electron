import { BookAction } from './bookActions';

export type RootActions = BookAction[keyof BookAction];
