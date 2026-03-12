import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import initialData from "../data/initialData";
import { getLocalStorage, setLocalStorage } from "../Localstorage/manageLocal";
import type { ColumnItem, ColumnId, CardItem, CardId } from "../types/trello";

export function useBoard() {
  const [columns, setColumns] = useState<ColumnItem[]>(() => {
    const stored = getLocalStorage("missions");
    return stored.length ? stored : initialData;
  });

  useEffect(() => {
    setLocalStorage("missions", columns);
  }, [columns]);

  function addColumn(title: string) {
    const newColumn: ColumnItem = {
      id: uuid(),
      title,
      cards: [],
    };

    setColumns((prev) => [...prev, newColumn]);
  }

  function addCard(columnId: ColumnId, title: string, desc:string) {
    const newCard: CardItem = {
      id: Date.now(),
      title,
      desc,
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: [...col.cards, newCard] }
          : col
      )
    );
  }

  function deleteCard(id: CardId) {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.filter((card) => card.id !== id),
      }))
    );
  }

  function updateCard(id: CardId, updatedCard: Partial<CardItem>) {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        cards: col.cards.map((card) =>
          card.id === id ? { ...card, ...updatedCard } : card
        ),
      }))
    );
  }

  function deleteColumn(id: ColumnId) {
    setColumns((prev) => prev.filter((col) => col.id !== id));
  }

    return {
        columns,
        addColumn,
        addCard,
        deleteCard,
        setColumns,
        updateCard,
        deleteColumn
    };
}