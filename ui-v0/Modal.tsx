'use client';
import { X } from '@phosphor-icons/react/dist/ssr';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const modalVariants = cva(
  'outline-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[99] overflow-hidden flex flex-col w-full gap-4 bg-yellow-50 shadow-xl rounded-xl border border-gray-300 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        sm: 'max-w-[90%] md:max-w-[500px] max-h-[90%]',
        md: 'max-w-[90%] md:max-w-[900px] max-h-[90%]',
        fullScreen: 'max-w-[90%] md:max-w-[95%] max-h-[90%]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);
const modalBodyVariants = cva('min-w-0 px-[2.5rem] py-[1.5rem]', {
  variants: {
    variant: {
      default: '',
    },
    size: {
      sm: 'w-full',
      md: 'w-full',
      fullScreen: 'w-full max-w-[440px]',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
  },
});

const Modal = DialogPrimitive.Root;

const ModalTrigger = DialogPrimitive.Trigger;

const ModalPortal = DialogPrimitive.Portal;

const ModalClose = DialogPrimitive.Close;

const ModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-[99] bg-modal-background backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    style={{ backdropFilter: 'blur(0.25rem)' }}
    {...props}
  />
));
ModalOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface ModalBodyProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalBodyVariants> {}

const ModalBody = React.forwardRef<React.ElementRef<'div'>, ModalBodyProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <div className="outline-none w-full grow shrink basis-auto min-h-0 max-h-full flex flex-col items-center overflow-y-auto">
      <div
        ref={ref}
        className={cn(
          modalBodyVariants({
            variant,
            size,
            className,
          }),
        )}
        {...props}
      >
        {children}
      </div>
    </div>
  ),
);

interface ModalProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof modalVariants> {
  hideClose?: boolean;
  allowScrollOverlay?: boolean;
}
// export const Overlay2 = styled.div({
//   '@media screen and (prefers-reduced-motion: reduce)': {
//     '&[dataState="closed"]': {
//       animation: 'none',
//     },
//   },
//   '&[data-state="closed"]': {
//     animation: `${FadeFromTo({ from: 0.75, to: 0 })} 200ms ease-in`,
//   },
//   '@media screen and (prefers-reduced-motion: reduce)': {
//     '&[dataState="open"]': {
//       animation: 'none',
//     },
//   },
//   '&[data-state="open"]': {
//     animation: `${FadeFromTo({ from: 0, to: 0.75 })} 300ms ease-out`,
//   },
//   backgroundColor: theme.color.gray['500'],
//   inset: 0,
//   opacity: 0.75,
//   position: 'fixed',
//   zIndex: 10002,
// });
const OverlayAllowScroll = () => (
  <div
    className="fixed inset-0 z-[99] bg-modal-background backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    style={{ backdropFilter: 'blur(0.25rem)' }}
  />
);

const ModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  ModalProps
>(
  (
    {
      className,
      variant,
      size,
      allowScrollOverlay,
      hideClose = false,
      children,
      ...props
    },
    ref,
  ) => (
    <ModalPortal>
      {!allowScrollOverlay && <ModalOverlay />}
      {allowScrollOverlay && <OverlayAllowScroll />}
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          modalVariants({
            variant,
            size,
            className,
          }),
        )}
        {...props}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-full flex flex-col justify-start items-center min-w-0 grow shrink basis-auto overflow-hidden">
          {children}
        </div>
        {!hideClose && (
          <DialogPrimitive.Close className="absolute right-2.5 top-2.5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <Button leftIcon={X} size="sm" variant="ghost" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </ModalPortal>
  ),
);
ModalContent.displayName = DialogPrimitive.Content.displayName;

const ModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col w-full gap-y-[0.75rem] items-start px-[2.5rem] pt-[2rem] pb-[1.5rem] border-b-[0.5px] border-gray-300 grow-0',
      className,
    )}
    {...props}
  />
);
ModalHeader.displayName = 'DialogHeader';

const ModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-row w-full gap-x-[0.5rem] items-center justify-end px-[2.5rem] pb-[2rem] pt-[1.5rem]',
      className,
    )}
    {...props}
  />
);
ModalFooter.displayName = 'DialogFooter';

export {
  Modal,
  ModalPortal,
  ModalOverlay,
  ModalClose,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
};
