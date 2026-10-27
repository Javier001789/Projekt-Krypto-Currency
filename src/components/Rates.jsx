import { CURRENCIES, COINS } from "../constants";

export default function Rates({ rates, crypto }) {
  return (
    <section id="kursy">
      <h2>Kursy walut</h2>

      <div className="row">
        {rates &&
          CURRENCIES.filter((currency) => currency !== "PLN").map(
            (currency) => (
              <div className="card" key={currency}>
                <b>{currency}</b>
                <p>{(1 / rates[currency]).toFixed(4)} zł</p>
              </div>
            )
          )}
      </div>

      <h2>Kursy kryptowalut</h2>

      <div className="row">
        {crypto &&
          Object.entries(COINS).map(([id, name]) => (
            <div className="card" key={id}>
              <b>{name}</b>

              <p>
                {crypto[id]?.pln != null
                  ? crypto[id].pln.toLocaleString("pl-PL")
                  : "Brak danych"}{" "}
                zł
              </p>
            </div>
          ))}
      </div>
    </section>
  );
}