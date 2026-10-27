export default function AboutPage() {
  return (
    <main>
      <section className="about">
        <h1>O nas</h1>

        <p className="lead">
          Krypto-Currency to kantor, w którym wymienisz złotówki,
          euro, dolary i kryptowaluty w jednym miejscu. Kursy
          aktualizujemy na żywo, a prowizja jest stała i widoczna
          przed wymianą.
        </p>

        <div className="stats">
          <div className="stat">
            <b>5 lat</b>
            <span>na rynku</span>
          </div>

          <div className="stat">
            <b>12 000+</b>
            <span>wymian miesięcznie</span>
          </div>

          <div className="stat">
            <b>1,5%</b>
            <span>stała prowizja</span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-card">
            <h3>Godziny pracy</h3>

            <div className="hours-row">
              <span>Poniedziałek – piątek</span>
              <b>9:00 – 19:00</b>
            </div>

            <div className="hours-row">
              <span>Sobota</span>
              <b>10:00 – 15:00</b>
            </div>

            <div className="hours-row">
              <span>Niedziela</span>
              <b>zamknięte</b>
            </div>
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
              Chcemy, żeby wymiana walut była prosta i przejrzysta.
              Wpisujesz kwotę, widzisz wynik i wiesz, ile dokładnie
              dostaniesz.
            </p>
          </div>
        </div>

        <a className="btn" href="#kalkulator">
          Przejdź do kalkulatora
        </a>

        <p className="demo-note">
          To strona demonstracyjna, dane na niej są przykładowe.
        </p>
      </section>
    </main>
  );
}