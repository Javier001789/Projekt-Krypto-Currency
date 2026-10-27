import { useEffect, useState } from "react";

export default function usePage() {
  const [page, setPage] = useState(
    window.location.hash === "#onas" ? "onas" : "main"
  );

  useEffect(() => {
    function onHashChange() {
      setPage(
        window.location.hash === "#onas" ? "onas" : "main"
      );
    }

    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  useEffect(() => {
    if (page === "onas") {
      window.scrollTo(0, 0);
    } else {
      const hash = window.location.hash;

      if (hash) {
        requestAnimationFrame(() => {
          document.querySelector(hash)?.scrollIntoView();
        });
      }
    }
  }, [page]);

  return page;
}