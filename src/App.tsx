import { useState } from "react";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent
} from "@dnd-kit/core";

import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

import ColumnList from "./components/ColumnList";
import MyModal from "./components/MyModal";
import { useBoard } from "./hooks/useBoard";
import Header from "./components/Header";
import ColumnModal from "./components/ColomnModal";

export default function App() {
 const { columns, addColumn, addCard, deleteCard, updateCard, deleteColumn, setColumns } = useBoard();

  const [modalOpen, setModalOpen] = useState(false);
  const [columnModalOpen, setColumnModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string | null>(null);

  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const activeCard = columns
    .flatMap((col) => col.cards)
    .find((card) => card.id === activeCardId);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function openModal(columnId: string) {
    setSelectedColumn(columnId);
    setModalOpen(true);
  }

  function onDragStart(event: DragStartEvent) {
    setActiveCardId(event.active.id as number);
  }

function onDragEnd(event: DragEndEvent) {
  setActiveCardId(null);

  const { active, over } = event;
  if (!over) return;

  const activeId = active.id as number;

  const overType = over.data.current?.type as "card" | "column" | undefined;

  setColumns((prev) => {
    const next = prev.map((c) => ({ ...c, cards: [...c.cards] }));

    const sourceColIndex = next.findIndex((col) =>
      col.cards.some((card) => card.id === activeId)
    );

    if (sourceColIndex === -1) return prev;

    const sourceCardIndex = next[sourceColIndex].cards.findIndex(
      (card) => card.id === activeId
    );

    if (sourceCardIndex === -1) return prev;

    const [movedCard] = next[sourceColIndex].cards.splice(sourceCardIndex, 1);

    const destColIndex =
      overType === "column"
        ? next.findIndex((col) => col.id === over.id)
        : next.findIndex((col) =>
            col.cards.some((card) => card.id === over.id)
          );

    if (destColIndex === -1) return prev;

    if (overType === "card") {
      const overCardIndex = next[destColIndex].cards.findIndex(
        (card) => card.id === over.id
      );

      next[destColIndex].cards.splice(overCardIndex, 0, movedCard);
    } else {
      next[destColIndex].cards.push(movedCard);
    }

    return next;
  });
}

  return (
    <>
    <div className="mx-auto px-50 ">
      <Header />
      <div className="py-10 px-4 mb-4 rounded-2xl bg-[#582d3363] text-center text-xl text-[#fbe6e6]">
        Görev verileri localstorage üzerinde tutularak kullanıcıya sunuluyor.
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <ColumnList
          columns={columns}
          openModal={openModal}
          onDeleteCard={deleteCard}
          onUpdateCard={updateCard}
          onDeleteColumn={deleteColumn}
          openColumnModal={() => setColumnModalOpen(true)}
        />
        <DragOverlay>
        {activeCard ? (
          <div className="bg-white p-3 rounded shadow border w-60">
            {activeCard.title}
          </div>
        ) : null}
      </DragOverlay>
      </DndContext>
    </div>

      <MyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(title, desc) => selectedColumn && addCard(selectedColumn, title, desc)}
      />

      <ColumnModal
        isOpen={columnModalOpen}
        onClose={() => setColumnModalOpen(false)}
        onSubmit={addColumn}
      />
    </>
  );
}