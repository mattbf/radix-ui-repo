'use client';

import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const switchVariants = cva(
  'peer px-[0.125rem] inline-flex  shrink-0 cursor-pointer items-center rounded-full border-[0.5px] border-stroke-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-text-primary data-[state=unchecked]:bg-graphite-75',
  {
    variants: {
      size: {
        sm: 'h-[1.25rem] w-[2.25rem]',
        md: 'h-[1.5rem] w-[2.625rem]',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);
const switchThumbVariants = cva(
  'pointer-events-none block rounded-full bg-white border-[0.25px] border-stroke-primary shadow-lg ring-0 transition-transform',
  {
    variants: {
      size: {
        sm: 'h-[1rem] w-[1rem] data-[state=checked]:animate-switchOn data-[state=unchecked]:animate-switchOff data-[state=checked]:translate-x-[1rem] data-[state=unchecked]:translate-x-0',
        md: 'h-[1.25rem] w-[1.25rem] data-[state=checked]:animate-switchOnMd data-[state=unchecked]:animate-switchOffMd data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'sm',
    },
  },
);

type SwitchProps = { size?: string } & VariantProps<typeof switchVariants> &
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ size, className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(switchThumbVariants({ size, className }))}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
