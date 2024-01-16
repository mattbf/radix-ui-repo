'use client';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/lib/utils';

const popoverVariants = cva(
  'z-[9999] overflow-hidden rounded-lg shadow-xl bg-surface-primary border-[0.5px] border-stroke-primary outline-none will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade',
  {
    variants: {
      variant: {
        default: '',
        tooltip:
          'z-[9999] overflow-hidden rounded-md border bg-graphite-900 text-white shadow-sm animate-in fade-in-0 zoom-in-95',
      },
      size: {
        sm: '',
        md: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
    compoundVariants: [
      {
        variant: 'tooltip',
        size: 'sm',
        className:
          'px-[0.5rem] py-[0.25rem] text-xs tracking-[0.00563rem] leading-[1.0875rem] font-[450]',
      },
      {
        variant: 'tooltip',
        size: 'md',
        className:
          'px-[0.75rem] py-[0.5rem] text-sm  tracking-[0.00656rem] leading-[1.26875rem] font-[450]',
      },
    ],
  },
);

type PopoverProps = {
  size?: string;
} & React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> &
  VariantProps<typeof popoverVariants>;

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverProps
>(
  (
    {
      className,
      variant,
      size = 'md',
      align = 'center',
      side = 'bottom',
      sideOffset = 4,
      ...props
    },
    ref,
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(popoverVariants({ variant, size, className }))}
        {...props}
      />
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
