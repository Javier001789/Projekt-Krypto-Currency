import Calculator from "../components/Calculator";
import Hero from "../components/Hero";
import Rates from "../components/Rates";
import Contact from "../components/Contact";

export default function MainPage({
  rates,
  crypto,
  error,
  loadRates,
  onToast,
}) {
  return (
    <main>
      <div className="top">
        <Calculator
          rates={rates}
          error={error}
          loadRates={loadRates}
          onToast={onToast}
        />

        <Hero />
      </div>

      <Rates rates={rates} crypto={crypto} />

      <Contact />
    </main>
  );
}