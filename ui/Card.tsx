import { cva, type VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const cardVariants = cva(
  'px-8 py-[1.75rem] flex flex-col gap-3 border border-stroke-secondary surface-primary rounded-lg',
  {
    variants: {
      variant: {
        default: '',
      },
    },
  },
);

type CardProps = {
  title?: string;
} & HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const Card = ({ variant, className, children, ...props }: CardProps) => (
  <div className={cn(cardVariants({ variant, className }))} {...props}>
    {children}
  </div>
);

export default Card;
