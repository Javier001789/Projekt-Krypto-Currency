import { useEffect, useState } from "react";
import "./App.css";

import useRates from "./hooks/useRates";
import usePage from "./hooks/usePage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Toast from "./components/Toast";

import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  const { rates, crypto, error, loadRates } = useRates();
  const page = usePage();

  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div>
      <Header />

      {page === "onas" ? (
        <AboutPage />
      ) : (
        <MainPage
          rates={rates}
          crypto={crypto}
          error={error}
          loadRates={loadRates}
          onToast={setToast}
        />
      )}

      <Footer />

      <Toast message={toast} />
    </div>
  );
}