import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-4 text-gray-400 group-focus-within:text-black transition-colors">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full h-14 bg-gray-50 border border-gray-100 rounded-2xl px-4 text-sm font-semibold placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all",
            icon && "pl-12",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
