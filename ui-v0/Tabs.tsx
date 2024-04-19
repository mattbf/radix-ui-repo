'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'w-full inline-flex items-center justify-start gap-x-4',
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TAB_ACCENT_COLOR_CLASS: { [key: string]: string } = {
  'evergreen-light': 'bg-evergreen-500',
  lavender: 'bg-lavender-700',
  sandstone: 'bg-sandstone-700',
  black: 'bg-black-700',
  gold: 'bg-gold-700',
  tomato: 'bg-tomato-700',
  blue: 'bg-baby-blue-700',
};
const defaultTabButtonVariants = cva(
  'flex flex-row items-center gap-2 transition-colors select-none focus:outline-none h-[2.5rem] px-[0.5rem] mb-[0.625rem] rounded-md disabled:pointer-events-none disabled:bg-opacity-40',
  {
    variants: {
      variant: {
        default: 'group-data-[state=inactive]:hover:bg-surface-hover',
      },
      tabAccentColor: {
        default: '',
        black: '',
        'evergreen-light': '',
        sandstone: '',
        lavender: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      tabAccentColor: 'default',
    },
  },
);
const defaultTabButtonWrapperVariants = cva(
  'transition-colors flex flex-col gap-[0.625rem] border-b-[3px] border-transparent',
  {
    variants: {
      variant: {
        default: 'group-data-[state=active]:border-evergreen-700',
      },
      tabAccentColor: {
        default: '',
        black: 'group-data-[state=active]:border-black',
        'evergreen-light': 'group-data-[state=active]:border-evergreen-500',
        sandstone: 'group-data-[state=active]:border-sandstone-700',
        lavender: 'group-data-[state=active]:border-lavender-700',
      },
    },
    defaultVariants: {
      variant: 'default',
      tabAccentColor: 'default',
    },
  },
);
export interface DefaultTabButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof defaultTabButtonWrapperVariants>,
    VariantProps<typeof defaultTabButtonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
  withDots?: boolean;
  rightComponent?: React.ReactNode;
  loading?: boolean;
}

const DefaultTabsButton = React.forwardRef<
  HTMLButtonElement,
  DefaultTabButtonProps
>(
  (
    {
      className,
      variant,
      tabAccentColor,
      withDots,
      rightComponent,
      children,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const bgColor = !!tabAccentColor
      ? TAB_ACCENT_COLOR_CLASS[tabAccentColor]
      : '';
    return (
      <div
        className={cn(
          defaultTabButtonWrapperVariants({
            variant,
            tabAccentColor,
            className,
          }),
        )}
      >
        <button
          className={cn(
            defaultTabButtonVariants({
              variant,
              tabAccentColor,
              className,
            }),
          )}
          ref={ref}
          disabled={disabled}
          {...props}
        >
          {withDots && (
            <div
              className={cn(
                'w-[0.625rem] h-[0.625rem] rounded-sm bg-black',
                bgColor,
              )}
            />
          )}

          <Text variant="label" size="sm">
            {children}
          </Text>
        </button>
      </div>
    );
  },
);

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'group transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, DefaultTabsButton, TabsContent };
