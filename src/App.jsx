import { useEffect, useState } from "react";
import "./App.css";

const CURRENCIES = ["PLN", "EUR", "USD", "GBP", "CHF"];
const COINS = { bitcoin: "BTC", ethereum: "ETH", tether: "USDT", solana: "SOL" };
const FEE = 0.015; // prowizja 1,5%

export default function App() {
  const [rates, setRates] = useState(null);
  const [crypto, setCrypto] = useState(null);
  const [error, setError] = useState("");
  const [from, setFrom] = useState("PLN");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(100);
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [page, setPage] = useState(window.location.hash === "#onas" ? "onas" : "main");

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

  // przełączanie stron po zmianie adresu (#onas = strona "O nas")
  useEffect(() => {
    function onHash() {
      setPage(window.location.hash === "#onas" ? "onas" : "main");
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // po zmianie strony: "O nas" od góry, główna przewija do sekcji
  useEffect(() => {
    const h = window.location.hash;
    if (page === "onas") window.scrollTo(0, 0);
    else if (h) document.querySelector(h)?.scrollIntoView();
  }, [page]);

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

      {page === "onas" ? (
        <main>
          <section className="about">
            <h1>O nas</h1>
            <p className="lead">
              Krypto-Currency to kantor, w którym wymienisz złotówki, euro, dolary
              i kryptowaluty w jednym miejscu. Kursy aktualizujemy na żywo, a prowizja
              jest stała i widoczna przed wymianą.
            </p>

            <div className="stats">
              <div className="stat"><b>5 lat</b><span>na rynku</span></div>
              <div className="stat"><b>12 000+</b><span>wymian miesięcznie</span></div>
              <div className="stat"><b>1,5%</b><span>stała prowizja</span></div>
            </div>

            <div className="info-grid">
              <div className="info-card">
                <h3>Godziny pracy</h3>
                <div className="hours-row"><span>Poniedziałek – piątek</span><b>9:00 – 19:00</b></div>
                <div className="hours-row"><span>Sobota</span><b>10:00 – 15:00</b></div>
                <div className="hours-row"><span>Niedziela</span><b>zamknięte</b></div>
              </div>

              <div className="info-card">
                <h3>Dlaczego my?</h3>
                <ul>
                  <li>Aktualne kursy co 30 sekund</li>
                  <li>Brak ukrytych opłat</li>
                  <li>Waluty i kryptowaluty w jednym kalkulatorze</li>
                  <li>Szybka obsługa, bez kolejek</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>Adres</h3>
                <p>ul. Długa 1, 80-827 Gdańsk</p>
                <p>kontakt@krypto-currency.demo</p>
              </div>

              <div className="info-card">
                <h3>Nasza misja</h3>
                <p>
                  Chcemy, żeby wymiana walut była prosta i przejrzysta. Wpisujesz kwotę,
                  widzisz wynik i wiesz, ile dokładnie dostaniesz.
                </p>
              </div>
            </div>

            <a className="btn" href="#kalkulator">Przejdź do kalkulatora</a>
            <p className="demo-note">To strona demonstracyjna, dane na niej są przykładowe.</p>
          </section>
        </main>
      ) : (
        <main>
          <div className="top">
            <section id="kalkulator" className="calc-box">
              <h2>Kalkulator wymiany</h2>
              {error && (
                <p className="error">
                  {error} <button onClick={loadRates}>Ponów</button>
                </p>
              )}
              <div className="row">
                <select value={from} onChange={(e) => setFrom(e.target.value)}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <button onClick={swap}>⇄</button>
                <select value={to} onChange={(e) => setTo(e.target.value)}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="result">{result.toFixed(2)} {to}</p>
              <br />
              <small>W cenie prowizja {FEE * 100}%</small>
              <br /><br />
              <button
                className="btn"
                onClick={() => setModal(true)}
                disabled={!rates || amount <= 0}
              >
                Wymień
              </button>
            </section>

            <section id="home">
              <h1>Kantor online</h1>
              <p>Aktualne kursy walut i kryptowalut. Wersja demo.</p>
              <a className="btn" href="#kursy">Sprawdź kurs</a>
            </section>
          </div>

          <section id="kursy">
            <h2>Kursy walut</h2>
            <div className="row">
              {rates &&
                CURRENCIES.filter((c) => c !== "PLN").map((c) => (
                  <div className="card" key={c}>
                    <b>{c}</b>
                    <p>{(1 / rates[c]).toFixed(4)} zł</p>
                  </div>
                ))}
            </div>

            <h2>Kursy kryptowalut</h2>
            <div className="row">
              {crypto &&
                Object.entries(COINS).map(([id, name]) => (
                  <div className="card" key={id}>
                    <b>{name}</b>
                    <p>{crypto[id].pln.toLocaleString("pl-PL")} zł</p>
                  </div>
                ))}
            </div>
          </section>

          <section id="kontakt">
            <h2>Kontakt</h2>
            <p>kontakt@krypto-currency.demo</p>
          </section>
        </main>
      )}

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