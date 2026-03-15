import type { ColumnItem } from "../types/trello";
const initialData: ColumnItem[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: 1, title: "React Framework", desc: "React dilinde bir MVP proje çalışması" },
      { id: 5, title: "Nextjs Framework", desc: "nextjs dilinde bir MVP proje çalışması" }
    ],
  },
  {
    id: "doing",
    title: "Doing",
    cards: [{ id: 2, title: "Javascript Geliştirme", desc: "Js dilinde algoritma çalışmaları" }],
  },
  {
    id: "review",
    title: "Review",
    cards: [
      { id: 3, title: "Drag and Drop", desc: "Kullanım yapısının araştırılması ve projeye eklenmesi" },
      { id: 6, title: "Risk kontrolü", desc: "Risk ve Bütçe kontrolü" }
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: 4, title: "Web Projesi", desc: "Web proje dosya yapısı ve mimarisinin kurulması." }],
  },
];

export default initialData;