import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCombobox } from 'downshift';
import cx from "classnames";

import { fetchCountries } from '@/api/countries';
import type { Country } from '@/types/country';

type CountryOption = Pick<Country, 'name' | 'slug'>;

const AutocompleteCountryBar: React.FC = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<CountryOption[]>([]);
  const [items, setItems] = useState<CountryOption[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetchCountries()
      .then((data) => {
        if (cancelled) return;
        const options = data.map(({ name, slug }) => ({ name, slug }));
        setCountries(options);
        setItems(options);
      })
      .catch(() => {
        // Silently ignore — bar degrades to an empty suggestion list.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const goToCountry = (option: CountryOption | null | undefined) => {
    if (option) {
      navigate(`/countries/${option.slug}`);
    }
  };

  // destructure necessary props for the combobox
  const {
    getInputProps,
    getMenuProps,
    getItemProps,
    isOpen,
    highlightedIndex,
    selectedItem,
  } = useCombobox({
    onInputValueChange: ({ inputValue }) => {
      const lowercasedInput = (inputValue || "").toLowerCase();
      setItems(
        countries.filter(({ name }) =>
          name.toLowerCase().includes(lowercasedInput)
        )
      );
    },
    items: items,
    itemToString: (item) => item?.name || "",
    onSelectedItemChange: ({ selectedItem }) => {
      goToCountry(selectedItem);
    },
  });

  const onSubmitHandler = () => {
    goToCountry(selectedItem);
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div
        className={cx(
          "group flex items-center glass rounded-2xl h-14 pr-1.5 transition-all duration-200 focus-within:border-brick-red/60 focus-within:glow-red"
        )}
      >
        <input
          placeholder="Take me to..."
          className="flex-1 px-5 bg-transparent placeholder-grey/60 text-smoke text-base sm:text-lg outline-none"
          {...getInputProps()}
        />
        <button
          className="h-11 px-6 sm:px-8 rounded-xl bg-brick-red text-smoke font-semibold text-lg sm:text-xl transition-all duration-200 hover:bg-brick-red/90 hover:shadow-lg hover:shadow-brick-red/25 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brick-red/70"
          onClick={onSubmitHandler}
        >
          Go!
        </button>
      </div>

      {/* dropdown menu, items are updated based on input */}
      <ul
        className={cx(
          "z-20 absolute top-full mt-2 inset-x-0 glass-strong rounded-2xl shadow-2xl shadow-black/40 max-h-64 overflow-auto scrollbar-hide py-2 transition-all duration-200",
          { "opacity-0 invisible -translate-y-2 pointer-events-none": !isOpen }
        )}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={item.slug}
              className={cx(
                "px-5 py-2.5 text-smoke/90 text-base cursor-pointer transition-colors duration-150",
                {
                  "bg-brick-red/20 text-smoke": highlightedIndex === index,
                  "text-dark-lime font-medium": selectedItem === item,
                }
              )}
              {...getItemProps({ item, index })}
            >
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AutocompleteCountryBar;
