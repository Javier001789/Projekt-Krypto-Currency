import { useCallback, useEffect, useState } from "react";
import { COINS, REFRESH_MS } from "../constants";

export default function useRates() {
  const [rates, setRates] = useState(null);
  const [crypto, setCrypto] = useState(null);
  const [error, setError] = useState("");

  const loadRates = useCallback(async () => {
    try {
      const [fiatResponse, cryptoResponse] = await Promise.all([
        fetch("https://open.er-api.com/v6/latest/PLN"),
        fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=" +
            Object.keys(COINS).join(",") +
            "&vs_currencies=pln"
        ),
      ]);

      if (!fiatResponse.ok || !cryptoResponse.ok) {
        throw new Error("Nie udało się pobrać kursów.");
      }

      const fiat = await fiatResponse.json();
      const coins = await cryptoResponse.json();

      if (fiat.result === "error" || !fiat.rates) {
        throw new Error("Nie udało się pobrać kursów.");
      }

      setRates(fiat.rates);
      setCrypto(coins);
      setError("");
    } catch {
      setError("Nie udało się pobrać kursów. Spróbuj ponownie.");
    }
  }, []);

  useEffect(() => {
    loadRates();

    const timer = setInterval(loadRates, REFRESH_MS);

    return () => clearInterval(timer);
  }, [loadRates]);

  return { rates, crypto, error, loadRates };
}