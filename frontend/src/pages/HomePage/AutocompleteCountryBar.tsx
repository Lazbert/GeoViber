import { useState } from 'react';
import { useCombobox } from 'downshift';
import cx from "classnames";

import { COUNTRIES } from '@/const';

const countryNames = COUNTRIES.map((item) => item.name);

const AutocompleteCountryBar: React.FC = () => {
  const [items, setItems] = useState(countryNames);
  
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
      const lowercasedInput = inputValue.toLowerCase();
      setItems(
        countryNames.filter(name =>
          name.toLowerCase().includes(lowercasedInput)
        )
      );
    },
    items: items,
    itemToString: (item) => item || "",
    onSelectedItemChange: ({ selectedItem }) => {
      console.log("Selected:", selectedItem);
    },
  });

  const onSubmitHandler = () => {
    console.log(selectedItem);
  }

  return (
    <div className="relative w-[700px]">
      <div className="flex items-center bg-smoke border-2 border-brick-red rounded-lg h-fit">
        <input
          placeholder="Take me to..."
          className="flex-1 px-4 bg-transparent placeholder-gray-400 text-gunmetal text-[16px] outline-none"
          {...getInputProps()}
        />
        <button
          className="py-1 bg-brick-red text-smoke outline-2 outline-brick-red rounded-r-md px-5 font-medium text-3xl cursor-pointer hover:bg-opacity-80"
          onClick={onSubmitHandler}
        >
          Go!
        </button>
      </div>
      
      {/* dropdown menu, items are updated based on input */}
      <ul
        className={cx("z-10 absolute top-full mt-1 inset-x-0 bg-white border border-grey rounded-lg shadow-lg max-h-50 overflow-auto scrollbar-hide", { hidden: !isOpen })}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              key={item}
              className={cx("text-black px-4 py-2 cursor-pointer hover:bg-smoke", {
                'bg-smoke': highlightedIndex === index,
                'text-brick-red font-medium': selectedItem === item,
              })}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default AutocompleteCountryBar;