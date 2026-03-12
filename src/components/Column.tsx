import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Card from "./Card";
import AddButton from "./Button";
import type { ColumnItem, ColumnId, CardId, CardItem } from "../types/trello";
import { FaTrash } from "react-icons/fa";

interface Props {
  column: ColumnItem;
  openModal: (id: ColumnId) => void;
  onDeleteCard: (id: CardId) => void;
  onUpdateCard: (id: CardId, updatedCard: Partial<CardItem>) => void;
  onDeleteColumn: (id: ColumnId) => void;
}

export default function Column({ column, openModal, onDeleteCard, onUpdateCard, onDeleteColumn }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
    data: { type: "column" },
  });

  return (
      <div
        ref={setNodeRef}
        className={`w-[320px] p-3 rounded-xl shadow-md border border-gray-300 bg-[#f1f2f4] ${
          isOver ? "bg-blue-50" : ""
        }`}
      >
      <div className="w-55 bg-[#f1f2f4] rounded p-3 flex justify-between items-end">
        <h2 className="font-semibold mb-3">{column.title}</h2>
        <div className="flex items-center justify-center gap-1">
          <AddButton
            label="+"
            onClick={() => openModal(column.id)}
          />
          <button
            className=" text-white px-2 py-2 rounded hover:bg-red-300 cursor-pointer "
            onClick={() => onDeleteColumn(column.id)}
          >
            <FaTrash className="text-gray-800 hover:text-red-600" />
          </button>
        </div>
      </div>

      <SortableContext
        items={column.cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {column.cards.map((card) => (
            <Card key={card.id} card={card} onDelete={onDeleteCard}  onUpdate={onUpdateCard}/>
          ))}
        </div>
      </SortableContext>
    </div>
  );
}