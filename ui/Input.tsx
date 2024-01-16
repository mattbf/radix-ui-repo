import { type Icon as IconType } from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { ReactNode } from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

const inputVariants = cva(
  [
    'gap-x-[0.375rem] pl-[0.75rem] pr-[0.5rem] min-w-[6rem]',
    'flex flex-row items-center overflow-hidden transition-colors text-text-primary tracking-[0.0075rem] leading-[1.45rem] font-[300] text-base py-0 h-[2.5rem] rounded-md border focus-within:bg-surface-primary placeholder-text-quaternary disabled-within:bg-black-alpha-50',
  ],
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        sm: 'h-[2rem] text-sm',
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
  labelIcon?: ReactNode;
  infoMessage?: string;
  inputClassName?: string;
  fullWidth?: boolean;
  leftIcon?: IconType;
  rightIcon?: IconType;
};

type DefaultComponentProps = React.PropsWithChildren<InputProps> &
  VariantProps<typeof inputVariants> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof InputProps>;

const Input = React.forwardRef<HTMLInputElement, DefaultComponentProps>(
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
      labelIcon: LabelIcon,
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    const iconSize = 18; //size === 'md' || size === 'sm' ? 14 : 16;

    return (
      <div className={cn({ 'w-full': fullWidth }, 'flex flex-col gap-y-2')}>
        {label && (
          <div className="flex flex-row gap-1 items-center">
            <Text variant="label" size="sm" className="text-text-primary">
              {label}
            </Text>
            {LabelIcon && LabelIcon}
          </div>
        )}
        <div
          className={cn(
            { 'w-full': fullWidth },
            { 'border-error-red-700': error || !!errorMessage },
            {
              'border-stroke-secondary hover:border-stroke-primary focus-within:border-evergreen-700 hover:focus-within:border-evergreen-700 focus-within:shadow-[0_0px_0px_1px_#3E7B52] hover:focus-within:shadow-[0_0px_0px_1px_#3E7B52]':
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
          <input
            ref={ref}
            {...props}
            className={cn(
              'outline-none w-full h-full bg-transparent',
              inputClassName,
            )}
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
Input.displayName = 'Input';

export { Input };
