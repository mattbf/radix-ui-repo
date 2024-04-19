import { cva, type VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const tagVariants = cva(
  'inline-flex items-center justify-center rounded-md font-light',
  {
    variants: {
      variant: {
        default: 'text-foreground text-lime-700',
        outline: 'shadow-none border border-gray-300',
      },
      size: {
        default: 'h-[1.375rem] py-[0.625rem] px-[0.5rem] text-xs',
        xs: 'h-[1rem] py-[0.5rem] px-[0.25rem] text-[12px]',
        sm: 'h-[1.125rem] py-[0.625rem] px-[0.375rem] text-xs',
        md: 'h-[1.375rem] py-[0.625rem] px-[0.5rem] text-xs',
        lg: 'h-[1.75rem] p-[0.625rem] text-sm',
      },
      color: {
        default: 'bg-lime-50 text-lime-700',
        'dark-green': 'bg-lime-700 text-white',
        black: 'bg-text-primary text-white',
        white: 'bg-white text-text-secondary',
        blue: 'bg-blue-50 text-blue-700',
        'dark-blue': 'bg-blue-700 text-white',
        gold: 'bg-gold-50 text-gold-700',
        'dark-gold': 'bg-gold-700 text-white',
        orange: 'bg-orange-50 text-orange-700',
        'dark-orange': 'bg-orange-700 text-white',
        'green': 'bg-green-50 text-green-700',
        'success-dark-green': 'bg-green-700 text-white',
        'warning-yellow': 'bg-warning-yellow-50 text-warning-yellow-700',
        'warning-dark-yellow': 'bg-warning-yellow-700 text-white',
        'error-red': 'bg-error-red-50 text-error-red-700',
        'error-dark-red': 'bg-error-red-700 text-white',
        graphite: 'bg-graphite-50 text-secondary',
        'dark-graphite': 'bg-graphite-700 text-white',
        clear: 'bg-transparent text-text-secondary',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  },
);

type TagProps = {
  color?: string;
};

type DefaultComponentProps = React.PropsWithChildren<TagProps> &
  VariantProps<typeof tagVariants> &
  Omit<HTMLAttributes<HTMLDivElement>, keyof TagProps>;

const Tag: React.FC<DefaultComponentProps> = ({
  variant,
  className,
  size,
  color,
  children,
  ...props
}) => (
  <div
    className={cn(
      tagVariants({
        variant,
        size,
        color,
        className,
      }),
    )}
    {...props}
  >
    {children}
  </div>
);

export { Tag, tagVariants };
