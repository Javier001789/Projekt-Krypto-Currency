import { useEffect, useState } from "react";
import "./App.css";

const CURRENCIES = ["PLN", "EUR", "USD", "GBP", "CHF"];
const COINS = { bitcoin: "BTC", ethereum: "ETH", tether: "USDT", solana: "SOL" };
const FEE = 0.015; // prowizja 1,5%

export default function App() {
  const [rates, setRates] = useState(null);   // kursy walut (ile X za 1 PLN)
  const [crypto, setCrypto] = useState(null); // ceny krypto w PLN
  const [error, setError] = useState("");
  const [from, setFrom] = useState("PLN");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");

  // pobieranie kursów z API
  async function loadRates() {
    try {
      const fiat = await fetch("https://open.er-api.com/v6/latest/PLN").then((r) => r.json());
      const coins = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=" + Object.keys(COINS) + "&vs_currencies=pln"
      ).then((r) => r.json());
      setRates(fiat.rates);
      setCrypto(coins);
      setError("");
    } catch {
      setError("Nie udało się pobrać kursów. Spróbuj ponownie.");
    }
  }

  // automatyczna aktualizacja co 30 sekund
  useEffect(() => {
    loadRates();
    const timer = setInterval(loadRates, 30000);
    return () => clearInterval(timer);
  }, []);

  // przeliczanie + prowizja
  const result = rates ? (amount / rates[from]) * rates[to] * (1 - FEE) : 0;

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function confirm() {
    setModal(false);
    setToast("Wymiana wykonana (to tylko demo)");
    setTimeout(() => setToast(""), 3000);
  }

  return (
    <div>
 
      <header>
        <b>Krypto-Currency</b>
        <nav>
          <a href="#home">Home</a>
          <a href="#kalkulator">Kalkulator</a>
          <a href="#kursy">Kursy</a>
          <a href="#onas">O nas</a>
          <a href="#kontakt">Kontakt</a>
        </nav>
      </header>

      <main>
        <section id="home">
          <h1>Kantor online</h1>
          <p>Aktualne kursy walut i kryptowalut. Wersja demo.</p>
          <a className="btn" href="#kursy">Sprawdź kurs</a>
        </section>

        <section id="kalkulator">
          <h2>Kalkulator wymiany</h2>
          {error && <p className="error">{error} <button onClick={loadRates}>Ponów</button></p>}
          <div className="row">
            <select value={from} onChange={(e) => setFrom(e.target.value)}>
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <button onClick={swap}>⇄</button>
            <select value={to} onChange={(e) => setTo(e.target.value)}>
              {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <input type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <p className="result">{result.toFixed(2)} {to}</p>
          <small>W cenie prowizja {FEE * 100}%</small><br />
          <button className="btn" onClick={() => setModal(true)} disabled={!rates || amount <= 0}>Wymień</button>
        </section>

        <section id="kursy">
          <h2>Kursy kryptowalut</h2>
          <div className="row">
            {crypto && Object.entries(COINS).map(([id, name]) => (
              <div className="card" key={id}>
                <b>{name}</b>
                <p>{crypto[id].pln.toLocaleString("pl-PL")} zł</p>
              </div>
            ))}
          </div>
        </section>

        <section id="onas">
          <h2>O nas</h2>
          <p>Aktualne i korzystne kursy walut.</p>
          <p>Wysoki poziom poufności.</p>
          <p>Wsparcie przy dużych transakcjach.</p>
        </section>

        <section id="kontakt">
          <h2>Kontakt</h2>
          <p>kontakt@krypto-currency.demo</p>
        </section>
      </main>

      <footer>© 2026 Krypto-Currency (demo)</footer>

      {modal && (
        <div className="overlay" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Potwierdź wymianę</h3>
            <p>{amount} {from} → {result.toFixed(2)} {to}</p>
            <button className="btn" onClick={confirm}>Potwierdzam</button>{" "}
            <button onClick={() => setModal(false)}>Anuluj</button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
