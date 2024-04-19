'use client';

import { Circle } from '@phosphor-icons/react/dist/ssr';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

const radioItemVariants = cva('flex items-center space-x-3 w-full', {
  variants: {
    variant: {
      default: '',
      card: 'p-[1.5rem] border border-stroke-secondary rounded-md',
    },
    size: {
      sm: '',
      md: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});
const radioCircleVariants = cva(
  'peer aspect-square rounded-full border-2 border-evergreen-700 text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        card: '',
      },
      size: {
        sm: 'h-[1.25rem] w-[1.25rem]',
        md: 'h-[1.5rem] w-[1.5rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

type RadioGroupProps = React.ComponentPropsWithoutRef<
  typeof RadioGroupPrimitive.Root
>;
type RadioGroupItemProps = {
  id: string;
  label?: string;
  checked?: boolean;
} & React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> &
  VariantProps<typeof radioItemVariants>;

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    className={cn('grid gap-2', className)}
    {...props}
    ref={ref}
  />
));
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(
  (
    { id, checked, variant, label, size, className, children, ...props },
    ref,
  ) => (
    <div
      className={cn(radioItemVariants({ variant, className }), {
        'shadow-[0_0px_0px_1px_#3E7B52] border-evergreen-700': checked,
      })}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioCircleVariants({ variant, className }))}
        {...props}
        id={id}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center text-evergreen-700 fill-evergreen-700">
          <Circle size={16.25} weight="fill" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <Text htmlFor={props.value} as="label" variant="body" size={size}>
          {label}
        </Text>
      )}
    </div>
  ),
);
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
