import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaTrash, FaEdit } from "react-icons/fa";
import type { CardItem, CardId } from "../types/trello";

interface Props {
  card: CardItem;
  onDelete: (id: CardId) => void;
  onUpdate: (id: CardId, updatedCard: Partial<CardItem>) => void;
}

export default function Card({ card, onDelete, onUpdate }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id, data: { type: "card" } });

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [desc, setDesc] = useState(card.desc);

  const handleUpdate = () => {
    onUpdate(card.id, { title, desc }); // parent hook + localStorage güncelleme
    setIsEditing(false); // inputları kapat
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className="p-3 rounded-lg border-0 bg-white flex flex-col gap-2"
      {...attributes}
      {...listeners}
    >
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 rounded w-full"
          />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border p-1 rounded w-full"
            rows={4}
          />
        </>
      ) : (
        <>
          <span className="font-semibold">{card.title}</span>
          <span className="text-gray-600">{card.desc}</span>
        </>
      )}

      <div className="flex justify-between items-center mt-2">
        <button
          className="bg-red-400 text-white px-3 py-1 rounded-2xl text-[12px] hover:bg-red-600 flex items-center gap-1"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
        >
          <FaTrash /> Sil
        </button>

        {isEditing ? (
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-2xl text-[12px] hover:bg-blue-600"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-green-300 text-white px-3 py-1 rounded-2xl text-[12px] hover:bg-green-600 flex items-center gap-1"
            onClick={() => setIsEditing(true)}
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>
    </div>
  );
}