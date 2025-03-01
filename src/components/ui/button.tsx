import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] text-xs font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-primary-50 disabled:!text-primary-300 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ',
  {
    variants: {
      variant: {
        default: 'bg-black !text-gray-50',
        outline: 'border border-primary-100 bg-white hover:bg-neutral-100 hover:text-neutral-900',
        ghost: 'bg-primary-50 hover:bg-primary-200 hover:text-primary-400',
        muted:
          'bg-primary-50 !text-primary-300 web:hover:bg-primary-200 web:hover:text-primary-400',
        transparent: 'bg-transparent',
      },
      fullRounded: {
        true: 'rounded-[60px]',
      },
      size: {
        xl: 'h-12 px-6 py-[14px] font-semibold text-text-sm',
        l: 'h-[42px] px-4 py-[11px] text-text-sm',
        m: 'h-9 px-4 py-2 text-text-sm',
        s: 'h-7 px-[15px] py-1 text-text-xs',
        xs: 'h-6 px-2 py-[2px] text-text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'l',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullRounded?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, fullRounded, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, fullRounded, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
