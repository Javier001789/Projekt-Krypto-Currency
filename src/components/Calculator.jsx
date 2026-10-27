import { useState } from "react";
import { CURRENCIES, FEE } from "../constants";
import ExchangeModal from "./ExchangeModal";

export default function Calculator({
  rates,
  error,
  loadRates,
  onToast,
}) {
  const [from, setFrom] = useState("PLN");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [modal, setModal] = useState(false);

  const numericAmount = Number(amount);

  const result =
    rates && Number.isFinite(numericAmount)
      ? (numericAmount / rates[from]) *
        rates[to] *
        (1 - FEE)
      : 0;

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function confirm() {
    setModal(false);
    onToast("Wymiana wykonana (to tylko demo)");
  }

  return (
    <>
      <section id="kalkulator" className="calc-box">
        <h2>Kalkulator wymiany</h2>

        {error && (
          <p className="error">
            {error}{" "}
            <button onClick={loadRates}>Ponów</button>
          </p>
        )}

        <div className="row">
          <select
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <button onClick={swap}>⇄</button>

          <select
            value={to}
            onChange={(event) => setTo(event.target.value)}
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <input
          type="number"
          min="0"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        <p className="result">
          {result.toFixed(2)} {to}
        </p>

        <br />

        <small>W cenie prowizja {FEE * 100}%</small>

        <br />
        <br />

        <button
          className="btn"
          onClick={() => setModal(true)}
          disabled={
            !rates ||
            amount === "" ||
            !Number.isFinite(numericAmount) ||
            numericAmount <= 0
          }
        >
          Wymień
        </button>
      </section>

      {modal && (
        <ExchangeModal
          amount={amount}
          from={from}
          result={result}
          to={to}
          onConfirm={confirm}
          onClose={() => setModal(false)}
        />
      )}
    </>
  );
}