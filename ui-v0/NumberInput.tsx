import { type Icon as IconType } from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'gap-x-[0.375rem] pl-[0.75rem] pr-[0.5rem] min-w-[6rem] caret-evergreen-700',
    'flex flex-row items-center overflow-hidden transition-colors text-text-primary py-2  border-b focus-within:bg-surface-primary placeholder-text-quaternary disabled-within:bg-black-alpha-50',
    'text-4xl tracking-[-0.05rem] leading-[2.875rem] font-[400]',
  ],
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        md: '',
        lg: 'h-[3rem]',
        xl: 'h-[3.5rem]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

type InputProps = {
  size?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  infoMessage?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
};

type DefaultComponentProps = React.PropsWithChildren<InputProps> &
  VariantProps<typeof inputVariants> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>;

const NumberInput = React.forwardRef<HTMLInputElement, DefaultComponentProps>(
  (
    {
      className,
      variant,
      size = 'md',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      error,
      errorMessage,
      infoMessage,
      inputClassName,
      label,
      autoFocus = true,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const iconSize = 18; //size === 'md' || size === 'sm' ? 14 : 16;

    return (
      <div className={cn({ 'w-full': fullWidth }, 'flex flex-col gap-y-2')}>
        {label && (
          <Text variant="label" size="sm" className="text-text-primary">
            {label}
          </Text>
        )}
        <div
          className={cn(
            { 'w-full': fullWidth },
            { 'border-error-red-700': error || !!errorMessage },
            {
              'border-stroke-secondary hover:border-stroke-primary focus-within:border-evergreen-700 hover:focus-within:border-evergreen-700':
                !error && errorMessage === undefined,
            },
            inputVariants({
              variant,
              size,
              className,
            }),
          )}
        >
          {LeftIcon && (
            <LeftIcon
              size={iconSize}
              weight="bold"
              color="currentColor"
              className="text-text-secondary"
            />
          )}
          <Text variant="headline" size="4xl">
            $
          </Text>
          <input
            ref={ref}
            autoFocus={autoFocus}
            placeholder="0.00"
            className={cn(
              'outline-none w-full h-full bg-transparent',
              inputClassName,
            )}
            {...props}
          />
          {RightIcon && (
            <RightIcon
              size={iconSize}
              weight="bold"
              color="currentColor"
              className="text-text-secondary"
            />
          )}
        </div>
        {errorMessage && (
          <Text variant="body" size="sm" className="text-error-red-700">
            {errorMessage}
          </Text>
        )}
        {infoMessage && !errorMessage && !error && (
          <Text variant="body" size="sm" className="text-text-secondary">
            {infoMessage}
          </Text>
        )}
      </div>
    );
  },
);
NumberInput.displayName = 'NumberInput';

export { NumberInput };
