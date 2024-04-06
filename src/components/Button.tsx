interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  // variant: "default" | "matched" | "selected" | "win";
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
  className,
  // variant = "default",
}) => {
  // const variantClasses = {
  //   default: "bg-gray-500",
  //   matched: "bg-green-500",
  //   selected: "bg-gray-700",
  //   win: "text-green-500 bg-transparent border border-green-500",
  // };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        `
        px-4 py-2 rounded font-bold text-white bg-gray-500
        ${disabled && "cursor-not-allowed"} ` + className
      }
    >
      {children}
    </button>
  );
};
export default Button;
