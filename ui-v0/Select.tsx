import { type Icon as IconType } from '@phosphor-icons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { ReactNode } from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

const selectVariants = cva(
  [
    'gap-x-[0.375rem] pl-[0.75rem] pr-[0.5rem] min-w-[6rem]',
    'flex flex-row items-center overflow-hidden transition-colors text-text-primary  placeholder-text-quaternary tracking-[0.0075rem] leading-[1.45rem] font-[300] text-base py-0 h-[2.5rem] rounded-md border',
    'focus-within:bg-surface-primary disabled-within:bg-black-alpha-50',
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

type SelectProps = {
  size?: string;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  labelIcon?: ReactNode;
  placeholder?: string;
  infoMessage?: string;
  options: { title?: string; value: string }[] | undefined;
  fullWidth?: boolean;
  leftIcon?: IconType;
};

type DefaultComponentProps = React.PropsWithChildren<SelectProps> &
  VariantProps<typeof selectVariants> &
  Omit<React.SelectHTMLAttributes<HTMLSelectElement>, keyof SelectProps>;

const Select = React.forwardRef<HTMLSelectElement, DefaultComponentProps>(
  (
    {
      className,
      variant,
      options,
      size = 'md',
      placeholder,
      leftIcon: LeftIcon,
      error,
      errorMessage,
      infoMessage,
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
        <div className="flex flex-row gap-1 items-center">
          {label && (
            <Text variant="label" size="sm" className="text-text-primary">
              {label}
            </Text>
          )}
          {LabelIcon && LabelIcon}
        </div>
        <div
          className={cn(
            { 'w-full': fullWidth },
            { 'border-error-red-700': error || !!errorMessage },
            {
              'focus-within:border-evergreen-700 border-stroke-secondary hover:border-stroke-primar hover:focus-within:border-evergreen-700 focus-within:shadow-[0_0px_0px_1px_#3E7B52] hover:focus-within:shadow-[0_0px_0px_1px_#3E7B52]':
                !error && errorMessage === undefined,
            },
            selectVariants({
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
          <select
            ref={ref}
            {...props}
            className="outline-none w-full h-full bg-transparent"
          >
            <option value="" disabled selected hidden>
              {placeholder ?? 'Select...'}
            </option>
            {options?.map((option, idx) => (
              <option key={`${option.value}-${idx}`} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
        {errorMessage && (
          <Text
            variant="body"
            size="sm"
            className="text-error-red-700 text-left"
          >
            {errorMessage}
          </Text>
        )}
        {infoMessage && !errorMessage && !error && (
          <Text
            variant="body"
            size="sm"
            className="text-text-secondary text-left"
          >
            {infoMessage}
          </Text>
        )}
      </div>
    );
  },
);
Select.displayName = 'Select';

export { Select };
