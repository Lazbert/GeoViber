import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { fetchCountries } from "@/api/countries";
import type { Country } from "@/types/country";

function countryCodeToFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [status, setStatus] = useState<"loading" | "error" | "ready">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    fetchCountries()
      .then((data) => {
        if (cancelled) return;
        setCountries(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="relative flex-1 w-full px-6 sm:px-10 py-10 max-w-6xl mx-auto animate-fade-in-up">
      <h1 className="text-3xl sm:text-4xl font-semibold text-smoke mb-8">
        Countries
      </h1>

      {status === "loading" && (
        <p className="text-muted-lilac text-lg">Loading countries…</p>
      )}

      {status === "error" && (
        <p className="text-brick-red text-lg">
          Something went wrong loading countries. Please try again later.
        </p>
      )}

      {status === "ready" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {countries.map((country) => (
            <Link
              key={country.slug}
              to={`/countries/${country.slug}`}
              className="glass rounded-2xl px-5 py-4 flex items-center gap-3 transition-all duration-200 hover:border-brick-red/60 hover:bg-brick-red/10 hover:-translate-y-0.5"
            >
              <span className="text-2xl">
                {countryCodeToFlagEmoji(country.countryCode)}
              </span>
              <span className="text-smoke text-base sm:text-lg font-medium">
                {country.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default CountriesPage;
