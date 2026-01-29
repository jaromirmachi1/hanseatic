import { useEffect } from "react";

export default function Footer() {
  useEffect(() => {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }, []);

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="muted">
          © <span id="year" /> Hanseatic
        </p>
        <p className="muted">UITherapy</p>
      </div>
    </footer>
  );
}
