import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const textVariants = cva(
  'tracking-[0.0075rem] leading-[1.45rem] font-[300] text-sm normal-case',
  {
    variants: {
      variant: {
        body: '',
        headline: 'font-[400]',
        label: 'font-[450]',
        overline: 'font-[400] uppercase leading-[1.1375rem]',
      },
      size: {
        '2xs': 'text-2xs tracking-[0.00519rem] leading-[0.99688rem]',
        xs: 'text-xs  tracking-[0.00563rem] leading-[1.0875rem]',
        sm: 'text-sm  tracking-[0.00656rem] leading-[1.26875rem]',
        md: 'text-md  tracking-[0.0075rem] leading-[1.45rem]',
        lg: 'text-lg  tracking-[0.00844rem] leading-[1.63125rem]',
        xl: 'text-xl  tracking-[0.00938rem] leading-[1.8125rem]',
        '2xl': 'text-2xl  tracking-[0.01125rem] leading-[2.175rem]',
        '3xl': 'text-3xl  tracking-[0.015rem] leading-[2.9rem]',
        '4xl': 'text-4xl  tracking-[0.01875rem] leading-[3.625rem]',
        '5xl': 'text-5xl  tracking-[0.0225rem] leading-[4.35rem]',
        '6xl': 'text-6xl tracking-[0.02625rem] leading-[5.075rem]', //NOT IN DS - scaled similarily
        '7xl': 'text-7xl  tracking-[0.03rem] leading-[5.8rem]', //NOT IN DS - scaled similarily
        '8xl': 'text-8xl  tracking-[0.03375rem] leading-[6.525rem]', //NOT IN DS - scaled similarily
        '9xl': 'text-9xl  tracking-[0.0375rem] leading-[7.25rem]', //NOT IN DS - scaled similarily
      },
    },
    compoundVariants: [
      {
        variant: 'headline',
        size: 'sm',
        className: 'tracking-[-0.00438rem] leading-[1.00625rem] font-[700]',
      },
      {
        variant: 'headline',
        size: 'md',
        className: 'tracking-[-0.005rem] leading-[1.15rem] font-[650]',
      },
      {
        variant: 'headline',
        size: 'lg',
        className: 'tracking-[-0.00563rem] leading-[1.29375rem] font-[600]',
      },
      {
        variant: 'headline',
        size: 'xl',
        className: 'tracking-[-0.00625rem] leading-[1.4375rem] font-[550]',
      },
      {
        variant: 'headline',
        size: '2xl',
        className: 'tracking-[-0.015rem] leading-[1.725rem] font-[500]',
      },
      {
        variant: 'headline',
        size: '3xl',
        className: 'tracking-[-0.03rem] leading-[2.3rem] font-[450]',
      },
      {
        variant: 'headline',
        size: '4xl',
        className: 'tracking-[-0.05rem] leading-[2.875rem]',
      },
      {
        variant: 'headline',
        size: '5xl',
        className: 'tracking-[-0.06rem] leading-[3.45rem]',
      },
      {
        variant: 'headline',
        size: '6xl',
        className: 'tracking-[-0.07rem] leading-[4.025rem]',
      },
      {
        variant: 'headline',
        size: '7xl',
        className: 'tracking-[-0.08rem] leading-[4.6rem]',
      },
      {
        variant: 'headline',
        size: '8xl',
        className: 'tracking-[-0.09rem] leading-[5.175rem]',
      },
      {
        variant: 'headline',
        size: '9xl',
        className: 'tracking-[-0.1rem] leading-[5.75rem]',
      },
    ],
    defaultVariants: {
      variant: 'body',
      size: 'md',
    },
  },
);

type TextProps<T extends React.ElementType> = {
  as?: T;
  className?: string;
};

type DefaultComponentProps<T extends React.ElementType> =
  React.PropsWithChildren<TextProps<T>> &
    VariantProps<typeof textVariants> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>;

const Text = <T extends React.ElementType = 'div'>({
  as,
  variant,
  size,
  className,
  children,
  ...props
}: DefaultComponentProps<T>) => {
  const textColorConfigured = !!className && className.includes(`text-`);
  const Tag = as || 'div';

  return (
    <Tag
      className={cn(
        { 'text-text-primary': !textColorConfigured },
        textVariants({
          variant,
          size,
          className,
        }),
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export { Text, textVariants };
