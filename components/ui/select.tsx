'use client'

import * as React from "react";
import * as Select from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

interface SelectProps {
  options: { value: string, label: string }[];
  defaultValue?: string;
  onChange: (value: string) => void;
}

export const SelectComponent = ({ options, defaultValue, onChange }: SelectProps) => (
  <Select.Root defaultValue={defaultValue} onValueChange={onChange}>
    <Select.Trigger className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
      <Select.Value placeholder="Select an option" />
      <Select.Icon className="ml-2 text-gray-500">
        <span>&#9662;</span>
      </Select.Icon>
    </Select.Trigger>
    <Select.Content className="mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full max-h-60 overflow-y-auto">
      <Select.ScrollUpButton />
      <Select.Viewport>
        {options.map((option) => (
          <Select.Item key={option.value} value={option.value} className="p-2 hover:bg-gray-100 cursor-pointer">
            <Select.ItemText>{option.label}</Select.ItemText>
          </Select.Item>
        ))}
      </Select.Viewport>
      <Select.ScrollDownButton />
    </Select.Content>
  </Select.Root>
);
