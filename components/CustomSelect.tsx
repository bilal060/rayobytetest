import { countries } from "@/utils/countries";
import React, { useState, useRef } from "react";
import { ReactCountryFlag } from "react-country-flag";

function CustomSelect({
  value,
  onChange,
  options,
}: {
  value: any;
  onChange: (arg0: any) => void;
  options: any;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (selectedOption: any) => {
    onChange(selectedOption);
    setIsDropdownOpen(false);
  };

  const handleOutsideClick = (event: { target: any }) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const selectedOption = options.find(
    (option: { value: any }) => option === value
  );

  const dropdownOptions = options.map((option: any) => (
    <li key={option} onClick={() => handleOptionSelect(option)}>
      <ReactCountryFlag
        svg
        countryCode={option}
        style={{
          fontSize: "2em",
        }}
      />
      {countries[option]}
    </li>
  ));

  return (
    <div className="select" ref={dropdownRef} onClick={handleDropdownToggle}>
      <div className="select-toggle">
        <div>
          <ReactCountryFlag
            svg
            countryCode={selectedOption}
            style={{
              fontSize: "2em",
            }}
          />
          {countries[selectedOption]}
        </div>
      </div>
      {isDropdownOpen && (
        <ul className="select-options" onClick={handleOutsideClick}>
          {dropdownOptions}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
