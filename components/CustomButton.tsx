import React from 'react';

interface CustomButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text: string;
}
function CustomButton({ text, onClick }: CustomButtonProps) {
  return (
    <button
      className="bg-red-500 opacity-90 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-32 h-12 text-lg"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default CustomButton;
