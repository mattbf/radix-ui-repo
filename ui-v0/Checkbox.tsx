'use client';

import { Check } from '@phosphor-icons/react/dist/ssr';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const checkboxVariants = cva(
  'peer shrink-0 shadow-md rounded-md border border-stroke-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-evergreen-700 data-[state=checked]:text-white',
  {
    variants: {
      size: {
        sm: 'h-[1rem] w-[1rem]',
        md: 'h-[1.25rem] w-[1.25rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

type CheckboxProps = {
  size?: string;
};

type DefaultComponentProps = React.PropsWithChildren<CheckboxProps> &
  VariantProps<typeof checkboxVariants> &
  Omit<
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    keyof CheckboxProps
  >;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  DefaultComponentProps
>(({ size, className, ...props }, ref) => {
  const iconSize = size === 'sm' ? 12 : 14;
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        checkboxVariants({
          size,
          className,
        }),
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <Check size={iconSize} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
