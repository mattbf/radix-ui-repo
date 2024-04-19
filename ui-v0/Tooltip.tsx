'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const tooltipVariants = cva(
  'z-50 overflow-hidden rounded-md border bg-graphite-900 text-white shadow-sm animate-in fade-in-0 zoom-in-95 data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade will-change-[transform,opacity]',
  {
    variants: {
      size: {
        sm: 'px-[0.5rem] py-[0.25rem] text-xs tracking-[0.00563rem] leading-[1.0875rem] font-[450]',
        md: 'px-[0.75rem] py-[0.5rem] text-sm  tracking-[0.00656rem] leading-[1.26875rem] font-[450]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

type TooltipProps = {
  size?: string;
} & React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> &
  VariantProps<typeof tooltipVariants>;

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipProps
>(({ size, className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(tooltipVariants({ size, className }))}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
