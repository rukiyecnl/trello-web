type AddButtonProps = {
  onClick: () => void;
  label?: string;
};

export default function AddButton({ onClick, label = "ADD" }: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "4px 8px",
        borderRadius: 8,
        border: "1px solid #d1d5db",
        background: "#ffffff",
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {label}
    </button>
  );
}
