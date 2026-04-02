import React from 'react';

interface ButtonPrimaryProps {
  title: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  title,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-xl font-semibold text-white
        bg-linear-to-r from-blue-600 to-indigo-600
        hover:from-blue-700 hover:to-indigo-700
        active:scale-95 transition-all duration-200
        shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40
        disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${className}
      `}
    >
      {title}
    </button>
  );
};

export default ButtonPrimary;
