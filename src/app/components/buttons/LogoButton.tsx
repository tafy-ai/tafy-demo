import clsx from "clsx";

interface LogoButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function LogoButton({ children, onClick, disabled }: LogoButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-7 h-7 border border-white rounded-md flex justify-center items-center",
        "focus:outline-none",
        disabled
          ? "opacity-40 cursor-not-allowed"
          : "hover:bg-white hover:text-black"
      )}
    >
      {children}
    </button>
  );
}
