import { ReactNode } from "react";

type GlassButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
};

export function GlassButton({
  onClick,
  children,
  className = "",
  size = "medium",
  disabled,
}: GlassButtonProps) {
  const sizeStyles = {
    small: "h-[36px] px-[1.2rem] text-body-sm rounded-full",
    medium: "h-[50px] px-6 text-body-md rounded-full",
    large: "h-[56px] px-[2.5rem] text-body-lg rounded-full",
  };

  const responsiveWidth = size === "small" ? "w-auto" : "max-md:w-full";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative isolation-auto flex items-center justify-center font-medium 
        text-white cursor-pointer transition-all duration-200 ease-in-out
        border-none outline-none
        
        bg-gradient-to-br from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.05)]
        backdrop-blur-[16px] [-webkit-backdrop-filter:blur(16px)]
        shadow-[0_8px_24px_0_rgba(0,0,0,0.15)]
        
        hover:bg-gradient-to-br hover:from-[rgba(255,255,255,0.2)] hover:to-[rgba(255,255,255,0.1)]
        hover:shadow-[0_12px_28px_0_rgba(0,0,0,0.2)]
        
        active:scale-[0.98]
        
        disabled:bg-[rgba(136,136,136,0.2)] disabled:cursor-not-allowed disabled:opacity-50
        disabled:transform-none disabled:shadow-none
        
        ${sizeStyles[size]}
        ${responsiveWidth}
        
        ${className}
      `}
    >
      <span
        className={`
          absolute inset-0 -z-10 p-[1px] pointer-events-none rounded-full
          bg-gradient-to-br from-[rgba(255,255,255,0.4)] via-transparent to-[rgba(255,255,255,0.4)]
          
          [mask-image:linear-gradient(#fff_0_0),linear-gradient(#fff_0_0)]
          [mask-clip:content-box,border-box]
          
          [-webkit-mask-composite:xor] 
          
          [mask-composite:exclude]

          b
        `}
      />
      {children}
    </button>
  );
}
