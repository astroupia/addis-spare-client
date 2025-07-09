// components/ui/textarea.tsx

import React from 'react';

interface TextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  disabled = false,
  required = false,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        disabled={disabled}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-white"
      />
    </div>
  );
};
