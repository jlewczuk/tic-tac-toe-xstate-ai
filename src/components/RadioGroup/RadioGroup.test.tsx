import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import { RadioGroup } from "./RadioGroup";
import "@testing-library/jest-dom";

const mockOnChange = jest.fn();

describe("RadioGroup Component", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  test("renders radio buttons with given options", () => {
    render(
      <RadioGroup
        name="testRadioGroup"
        options={options}
        selectedValue="option1"
        onChange={mockOnChange}
      />,
    );

    options.forEach((option) => {
      expect(screen.getByLabelText(option.label)).toBeInTheDocument();
    });
  });

  test("selects the correct radio button based on selectedValue", () => {
    render(
      <RadioGroup
        name="testRadioGroup"
        options={options}
        selectedValue="option2"
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByLabelText("Option 2")).toBeChecked();
  });

  test("calls onChange handler when a radio button is selected", () => {
    render(
      <RadioGroup
        name="testRadioGroup"
        options={options}
        selectedValue="option1"
        onChange={mockOnChange}
      />,
    );

    fireEvent.click(screen.getByLabelText("Option 3"));
    expect(mockOnChange).toHaveBeenCalledWith("option3");
  });
});
