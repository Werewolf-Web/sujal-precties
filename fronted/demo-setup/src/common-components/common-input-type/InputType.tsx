import React, { type InputHTMLAttributes } from 'react';

interface InputTypeProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

const InputType: React.FC<InputTypeProps> = ({
  label,
  error,
  icon,
  className = '',
  containerClassName = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  // Simple class merger helper
  const cn = (...classes: (string | undefined | boolean)[]) => classes.filter(Boolean).join(' ');

  return (
    <div className={cn("flex flex-col w-full gap-1.5 transition-all duration-300", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 ml-1 select-none"
        >
          {label}
        </label>
      )}
      
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none z-10">
            {icon}
          </div>
        )}
        
        <input
          id={inputId}
          className={cn(
            "w-full px-4 py-2.5 rounded-xl border transition-all duration-300 outline-none placeholder:text-slate-400 text-slate-700",
            !className.includes('bg-') && "bg-white/50 backdrop-blur-sm",
            icon ? 'pl-10' : '',
            error 
              ? 'border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100' 
              : 'border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10',
            className
          )}
          {...props}
        />
        
        {/* Subtle glassmorphism effect on hover */}
        <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 bg-slate-500/5 transition-opacity duration-300" />
      </div>

      {error && (
        <span className="text-xs font-medium text-red-500 ml-1 animate-in fade-in slide-in-from-top-1 duration-300">
          {error}
        </span>
      )}
    </div>
  );
};

export default InputType;
