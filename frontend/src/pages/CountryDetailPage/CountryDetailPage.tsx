import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CountryNotFoundError, fetchCountryBySlug } from "@/api/countries";
import type { Country } from "@/types/country";

type Status = "loading" | "notFound" | "error" | "ready";

const CountryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setStatus("loading");
    fetchCountryBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setCountry(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        if (err instanceof CountryNotFoundError) {
          setStatus("notFound");
        } else {
          setStatus("error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="relative flex-1 w-full px-6 sm:px-10 py-10 max-w-3xl mx-auto animate-fade-in-up">
      <Link
        to="/countries"
        className="text-muted-lilac hover:text-smoke transition-colors duration-150 text-sm mb-6 inline-block"
      >
        ← Back to Countries
      </Link>

      {status === "loading" && (
        <p className="text-muted-lilac text-lg">Loading country…</p>
      )}

      {status === "notFound" && (
        <div className="glass rounded-2xl px-6 py-8">
          <h1 className="text-2xl font-semibold text-smoke mb-2">
            Country not found
          </h1>
          <p className="text-muted-lilac">
            We couldn't find a country matching "{slug}".
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="glass rounded-2xl px-6 py-8">
          <p className="text-brick-red text-lg">
            Something went wrong loading this country. Please try again later.
          </p>
        </div>
      )}

      {status === "ready" && country && (
        <div className="glass rounded-2xl px-6 py-8">
          <h1 className="text-3xl sm:text-4xl font-semibold text-smoke mb-2">
            {country.name}
          </h1>
          <p className="text-muted-lilac text-sm mb-6 uppercase tracking-wide">
            {country.countryCode}
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-medium text-smoke mb-2">Summary</h2>
            <p className="text-smoke/80">
              {country.summary || "Content coming soon."}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-medium text-smoke mb-2">
              Meta Notes
            </h2>
            <p className="text-smoke/80">
              {country.metaNotes || "Content coming soon."}
            </p>
          </section>
        </div>
      )}
    </main>
  );
};

export default CountryDetailPage;
