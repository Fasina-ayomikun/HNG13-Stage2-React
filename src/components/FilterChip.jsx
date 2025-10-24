import React from "react";

function FilterChip({ label, active, onClick }) {
  return (
    <button
      className={`chip ${active ? "chip--active" : ""}`}
      type='button'
      onClick={onClick}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}

export default FilterChip;
