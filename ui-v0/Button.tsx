import { type Icon as IconType } from '@phosphor-icons/react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { LoadingSpinner } from './Loading/LoadingSpinner';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'select-none focus:outline-none inline-flex items-center justify-center whitespace-nowrap gap-2 shadow-lg rounded-md text-sm font-medium ring-offset-evergreen-500 transition-colors text-sm tracking-[0.00656rem] leading-[1.26875rem] font-[450] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:bg-opacity-40',
  {
    variants: {
      variant: {
        default: 'bg-evergreen-700 text-foreground hover:bg-evergreen-900',
        outline:
          'text-text-primary shadow-none border border-stroke-secondary bg-transparent hover:bg-surface-hover disabled:opacity-40',
        ghost:
          'text-text-primary shadow-none border-none bg-transparent hover:bg-surface-hover',
        link: 'text-text-primary shadow-none underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-[2rem] px-[0.875rem]',
        md: 'h-[2.5rem] px-[1.125rem]',
        lg: 'h-[3rem] px-[1.25rem] text-base',
        xl: 'h-[3.5rem] px-[1.5rem] text-base',
        'icon-sm': 'h-[2rem] w-[2rem] min-h-[2rem] min-w-[2rem]',
        'icon-md': 'h-[2.5rem] w-[2.5rem] min-h-[2.5rem] min-w-[2.5rem]',
        'icon-default': 'h-[2.5rem] w-[2.5rem] min-h-[2.5rem] min-w-[2.5rem]',
        'icon-lg': 'h-[3.5rem] w-[3.5rem] min-h-[3.5rem] min-w-[3.5rem]',
        'icon-xl': 'h-[3rem] w-[3rem] min-h-[3rem] min-w-[3rem]',
      },
      color: {
        default: '',
        'dark-green': 'bg-evergreen-900 hover:bg-evergreen-950',
        black: 'bg-text-primary hover:bg-graphite-950',
        white: 'bg-white text-text-primary hover:bg-surface-white-hover',
        error: 'bg-error-red-700 text-white hover:bg-error-red-900',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'default',
    },
  },
);

type ButtonProps = {
  asChild?: boolean;
  fullWidth?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
  loading?: boolean;
  color?: string;
};

type DefaultComponentProps = React.PropsWithChildren<ButtonProps> &
  VariantProps<typeof buttonVariants> &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps>;

const Button = React.forwardRef<HTMLButtonElement, DefaultComponentProps>(
  (
    {
      className,
      variant,
      color,
      size: propSize,
      asChild = false,
      leftIcon: LeftIcon,
      fullWidth = false,
      rightIcon: RightIcon,
      disabled = false,
      loading = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const iconSize =
      propSize === 'md' || propSize === 'sm'
        ? 14
        : propSize === 'lg'
        ? 18
        : propSize === 'xl'
        ? 20
        : 16;
    const isIconButton =
      (!props.children || asChild) && (LeftIcon || RightIcon) ? true : false;
    const size = isIconButton
      ? propSize === 'sm'
        ? 'icon-sm'
        : propSize === 'md'
        ? 'icon-md'
        : propSize === 'lg'
        ? 'icon-lg'
        : propSize === 'xl'
        ? 'icon-xl'
        : 'icon-default'
      : propSize;

    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
            color,
            className,
          }),
          { 'w-full': fullWidth },
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <LoadingSpinner
            size={propSize?.slice()}
            color={variant === 'ghost' || variant === 'outline' ? 'dark' : ''}
          />
        ) : (
          <>
            {LeftIcon && (
              <LeftIcon
                size={iconSize}
                weight="bold"
                color="currentColor"
                className="shrink-0"
              />
            )}
            {props.children}
            {RightIcon && (
              <RightIcon
                size={iconSize}
                weight="bold"
                color="currentColor"
                className="shrink-0"
              />
            )}
          </>
        )}
      </Comp>
    );
  },
);

export { Button, buttonVariants };
