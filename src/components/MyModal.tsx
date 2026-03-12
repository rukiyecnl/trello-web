import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, desc: string) => void;
}

export default function MyModal({ isOpen, onClose, onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit(title.trim(), desc.trim());
    setDesc("");
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
      <DialogPanel className="bg-white p-6 rounded shadow-xl w-[420px] z-50 relative">
        <DialogTitle className="text-lg font-semibold mb-4">
          Yeni Kart
        </DialogTitle>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Kart başlığı..."
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Görev açıklaması..."
          className="w-full border p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
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