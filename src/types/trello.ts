export type CardId = number;
export type ColumnId = string;

export interface CardItem {
  id: CardId;
  title: string;
  desc: string;
}

export interface ColumnItem {
  id: ColumnId;
  title: string;
  cards: CardItem[];
}