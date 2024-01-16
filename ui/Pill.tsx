'use client';
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

const pillGroupVariants = cva(
  'inline-flex items-center justify-center rounded-md gap-1 p-1 bg-surface-hover shrink-0',
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        sm: 'h-[2rem]', // NOT IN DS - scaled similarly
        md: 'h-[2.5rem]',
        lg: 'h-[3rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const pillItemVariants = cva(
  'outline-none flex px-3 rounded-md items-center justify-center self-stretch bg-surface-transparent data-[state=on]:bg-white',
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        sm: 'h-[1.5rem]', // NOT IN DS - scaled similarly
        md: 'h-[2rem]',
        lg: 'h-[2.5rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type GroupProps = Omit<ToggleGroupPrimitive.ToggleGroupSingleProps, 'type'> &
  React.RefAttributes<HTMLDivElement>;

interface PillGroupProps
  extends GroupProps,
    VariantProps<typeof pillGroupVariants> {}

interface PillItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof pillItemVariants> {
  value: string;
}

const PillGroup = React.forwardRef<React.ElementRef<'div'>, PillGroupProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      type="single"
      className={cn(
        pillGroupVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
  ),
);
PillGroup.displayName = 'PillGroup';

const PillItem: React.FC<PillItemProps> = ({
  className,
  value,
  variant,
  size,
  ...props
}) => (
  <ToggleGroupPrimitive.Item
    className={cn(
      pillItemVariants({
        variant,
        size,
        className,
      }),
    )}
    value={value}
    {...props}
  >
    <Text variant="label">{value}</Text>
  </ToggleGroupPrimitive.Item>
);
PillItem.displayName = 'PillItem';

export { PillGroup, PillItem };
