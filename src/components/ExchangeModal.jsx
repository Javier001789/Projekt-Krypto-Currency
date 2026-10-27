export default function ExchangeModal({
  amount,
  from,
  result,
  to,
  onConfirm,
  onClose,
}) {
  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h3>Potwierdź wymianę</h3>

        <p>
          {amount} {from} → {result.toFixed(2)} {to}
        </p>

        <button className="btn" onClick={onConfirm}>
          Potwierdzam
        </button>{" "}

        <button onClick={onClose}>Anuluj</button>
      </div>
    </div>
  );
}