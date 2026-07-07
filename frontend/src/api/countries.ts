import type { Country } from "@/types/country";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export class CountryNotFoundError extends Error {
  constructor(slug: string) {
    super(`Country not found: ${slug}`);
    this.name = "CountryNotFoundError";
  }
}

export async function fetchCountries(): Promise<Country[]> {
  const res = await fetch(`${API_BASE_URL}/api/countries`);
  if (!res.ok) {
    throw new Error(`Failed to fetch countries (status ${res.status})`);
  }
  return res.json();
}

export async function fetchCountryBySlug(slug: string): Promise<Country> {
  const res = await fetch(`${API_BASE_URL}/api/countries/${slug}`);
  if (res.status === 404) {
    throw new CountryNotFoundError(slug);
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch country (status ${res.status})`);
  }
  return res.json();
}
