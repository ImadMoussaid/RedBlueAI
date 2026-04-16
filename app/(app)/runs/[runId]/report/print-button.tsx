'use client';

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="btn btn-primary"
      style={{ fontSize: 13, gap: 6 }}
    >
      ⬇ Download PDF
    </button>
  );
}
