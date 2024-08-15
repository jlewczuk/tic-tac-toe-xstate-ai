import React from "react";

import { RadioButton, RadioLabel } from "@/styles/styles";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export const RadioGroup = ({
  name,
  options,
  selectedValue,
  onChange,
}: RadioGroupProps) => {
  return (
    <div>
      {options.map((option) => (
        <RadioButton key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={name}
            value={option.value}
            onChange={(e) => onChange(e.target.value)}
            checked={selectedValue === option.value}
          />
          <RadioLabel htmlFor={option.value}>{option.label}</RadioLabel>
        </RadioButton>
      ))}
    </div>
  );
};
