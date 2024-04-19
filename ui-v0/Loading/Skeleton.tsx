import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const skeletonVariants = cva('rounded-md', {
  variants: {
    variant: {
      default: 'bg-surface-hover animate-pulse',
      outline:
        'text-text-primary shadow-none border border-stroke-secondary bg-transparent hover:bg-surface-hover',
      ghost:
        'text-text-primary shadow-none border-none bg-transparent hover:bg-surface-hover',
      link: 'text-text-primary shadow-none underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-[1rem] ',
    },
  },
  defaultVariants: {
    variant: 'default',
    // size: 'default',
  },
});

type SkeletonProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof skeletonVariants>;

const Skeleton = ({ variant, className, ...props }: SkeletonProps) => {
  const notFullParentWidth = !!className && className.includes(`w-`);
  const notFullParentHeight = !!className && className.includes(`h-`);

  return (
    <div
      className={cn(
        {
          'min-w-full': !notFullParentWidth,
          'min-h-full': !notFullParentHeight,
        },
        skeletonVariants({
          variant,
          className,
        }),
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export { Skeleton, skeletonVariants };
