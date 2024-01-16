'use client';
import { type Icon as IconType, X } from '@phosphor-icons/react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

const toastVariants = cva(
  'bg-white rounded-lg p-4 min-w-[20.1875rem] p-4 items-center border-[1px] border-stroke-primary shadow-xl transition-all',
  {
    variants: {
      variant: {
        default: '',
        success: '',
        warning: '',
        error: 'border-[2px] border-error-red-700',
      },
      position: {
        'top-left':
          'data-[state=open]:animate-slideInXLeft data-[state=closed]:animate-toastHide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOutXLeft',
        'top-center':
          'data-[state=open]:animate-slideInYTop data-[state=closed]:animate-toastHide data-[swipe=move]:translate-y-[-var(--radix-toast-swipe-move-y)] data-[swipe=cancel]:translate-y-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOutYTop',
        'top-right':
          'data-[state=open]:animate-slideInXRight data-[state=closed]:animate-toastHide data-[swipe=move]:translate-x-[-var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOutXRight',
        'bottom-left':
          'data-[state=open]:animate-slideInXLeft data-[state=closed]:animate-toastHide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOutXLeft',
        'bottom-center':
          'data-[state=open]:animate-slideInYBottom data-[state=closed]:animate-toastHide data-[swipe=move]:translate-y-[-var(--radix-toast-swipe-move-y)] data-[swipe=cancel]:translate-y-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOutYBottom',
        'bottom-right':
          'data-[state=open]:animate-slideInYBottom data-[state=closed]:animate-toastHide data-[swipe=move]:translate-y-[-var(--radix-toast-swipe-move-y)] data-[swipe=cancel]:translate-y-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOutYBottom',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'bottom-right',
    },
  },
);

const VARIANT_TO_ICON_COLOR: { [key: string]: string } = {
  default: 'text-text-secondary',
  success: 'text-success-green-600',
  warning: 'text-warning-yellow-700',
  error: 'text-error-red-700',
};

type Position =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

const getSwipeDirection = (position: Position) => {
  if (position.includes('right')) return 'right';
  if (position.includes('left')) return 'left';
  if (position === 'top-center') return 'up';
  if (position === 'bottom-center') return 'down';
  return 'right';
};

const getViewportPositionClasses = (position: Position) => {
  switch (position) {
    case 'top-left':
      return 'top-0 left-0';
    case 'top-center':
      return 'top-0 left-1/2';
    case 'top-right':
      return 'top-0 right-0';
    case 'bottom-left':
      return 'bottom-0 left-0';
    case 'bottom-center':
      return 'bottom-0 left-1/2';
    case 'bottom-right':
      return 'bottom-0 right-0';
    default:
      return 'bottom-0 right-0';
  }
};

interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>,
    VariantProps<typeof toastVariants> {
  icon?: IconType;
  position?: Position;
}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, position, icon: Icon, children, ...props }, ref) => (
  <ToastPrimitive.Provider
    swipeDirection={getSwipeDirection(position ?? 'bottom-right')}
  >
    <ToastPrimitive.Root
      ref={ref}
      className={cn(
        toastVariants({
          variant,
          position,
          className,
        }),
      )}
      {...props}
    >
      <div className="flex flex-row items-center justify-between gap-x-2">
        {Icon && (
          <Icon
            size={22}
            weight="fill"
            className={cn(VARIANT_TO_ICON_COLOR[variant as string], 'shrink-0')}
          />
        )}
        <div className="w-full flex flex-col justify-center items-start min-w-0">
          {children}
        </div>
        <ToastPrimitive.Close
          aria-label="Close"
          className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <Button leftIcon={X} size="sm" variant="ghost" />
          <span className="sr-only">Close</span>
        </ToastPrimitive.Close>
      </div>
    </ToastPrimitive.Root>
    <ToastPrimitive.Viewport
      className={cn(
        '[--viewport-padding:_25px] fixed flex flex-col p-[var(--viewport-padding)] gap-[10px] m-0 list-none z-[2147483647] outline-none',
        getViewportPositionClasses(position ?? 'bottom-right'),
      )}
      style={
        position?.includes('center')
          ? { transform: 'translate(-50%)' }
          : undefined
      }
    />
  </ToastPrimitive.Provider>
));
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastRoot = React.forwardRef<
  React.ElementRef<typeof ToastPrimitive.Root>,
  ToastProps
>(({ className, variant, position, icon: Icon, children, ...props }, ref) => (
  <ToastPrimitive.Root
    ref={ref}
    className={cn(
      toastVariants({
        variant,
        position,
        className,
      }),
    )}
    {...props}
  >
    <div className="flex flex-row items-center justify-between gap-x-2">
      {Icon && (
        <Icon
          size={22}
          weight="fill"
          className={cn(VARIANT_TO_ICON_COLOR[variant as string], 'shrink-0')}
        />
      )}
      <div className="w-full flex flex-col justify-center items-start min-w-0">
        {children}
      </div>
      <ToastPrimitive.Close
        aria-label="Close"
        className="opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      >
        <Button leftIcon={X} size="sm" variant="ghost" />
        <span className="sr-only">Close</span>
      </ToastPrimitive.Close>
    </div>
  </ToastPrimitive.Root>
));
Toast.displayName = ToastPrimitive.Root.displayName;

const ToasterWrapper = ({
  position,
  children,
}: React.PropsWithChildren<{ position?: Position }>) => (
  <ToastPrimitive.Provider
    swipeDirection={getSwipeDirection(position ?? 'bottom-right')}
  >
    {children}
    <ToastPrimitive.Viewport
      className={cn(
        '[--viewport-padding:_25px] fixed flex flex-col p-[var(--viewport-padding)] gap-[10px] m-0 list-none z-[2147483647] outline-none',
        getViewportPositionClasses(position ?? 'bottom-right'),
      )}
      style={
        position?.includes('center')
          ? { transform: 'translate(-50%)' }
          : undefined
      }
    />
  </ToastPrimitive.Provider>
);
Toast.displayName = ToastPrimitive.Root.displayName;

const ToastTitle = ({
  className,
  title,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <Text variant="label" size="sm" {...props} className={cn(className)}>
    {title}
  </Text>
);
ToastTitle.displayName = 'ToastTitle';

export { Toast, ToastTitle, type ToastProps, ToastRoot, ToasterWrapper };
