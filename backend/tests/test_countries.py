from seed import COUNTRIES

EXPECTED_COUNT = len(COUNTRIES)
KNOWN_SLUG = "japan"


def test_list_countries_returns_all(client):
    response = client.get("/api/countries")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) == EXPECTED_COUNT


def test_get_known_country(client):
    response = client.get(f"/api/countries/{KNOWN_SLUG}")
    assert response.status_code == 200
    data = response.json()
    assert data["slug"] == KNOWN_SLUG
    assert data["name"] == "Japan"
    assert data["countryCode"] == "JP"
    assert "summary" in data
    assert "metaNotes" in data


def test_get_unknown_country_returns_404(client):
    response = client.get("/api/countries/nonexistent-slug")
    assert response.status_code == 404
    assert response.json() == {"detail": "Country not found"}
