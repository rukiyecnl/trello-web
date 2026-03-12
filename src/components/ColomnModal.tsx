import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export default function ColumnModal({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit(title.trim());
    setTitle("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* overlay */}
      <Dialog.Panel
        as="div"
        className="fixed inset-0 bg-black/30"
        aria-hidden="true"
      />

      {/* modal content */}
      <DialogPanel className="bg-white p-6 rounded shadow-xl w-[320px] z-50 relative">
        <DialogTitle className="text-lg font-semibold mb-4">
          Yeni Kolon
        </DialogTitle>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Kart başlığı..."
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Ekle
          </button>

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded hover:bg-gray-100 transition"
          >
            Kapat
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
}