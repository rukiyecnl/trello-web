import Column from "./Column";
import type { ColumnItem, ColumnId, CardId, CardItem } from "../types/trello";

interface Props {
  columns: ColumnItem[];
  openModal: (id: ColumnId) => void;
  onDeleteCard: (id: CardId) => void;
  onUpdateCard: (id: CardId, updatedCard: Partial<CardItem>) => void;
  openColumnModal: () => void;
  onDeleteColumn: (id: ColumnId) => void;
}

export default function ColumnList({
  columns,
  openModal,
  onDeleteCard,
  onUpdateCard,
  openColumnModal,
  onDeleteColumn,
}: Props) {
  return (
    <div className="flex gap-4 items-start overflow-x-auto">
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          openModal={openModal}
          onDeleteCard={onDeleteCard}
          onUpdateCard={onUpdateCard}
          onDeleteColumn={onDeleteColumn}
        />
      ))}

      <button
        onClick={openColumnModal}
        className="bg-white border border-dashed border-gray-400 rounded-lg p-4 w-[320px]"
      >
        + Kolon Ekle
      </button>
    </div>
  );
}