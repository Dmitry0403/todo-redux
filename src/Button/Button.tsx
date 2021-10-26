interface ButtonType {
  text: string;
  type: "button" | "submit";
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  text,
  type,
  className,
  onClick,
}: ButtonType) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
    >
      {text}
    </button>
  );
};
