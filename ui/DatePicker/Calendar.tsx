'use client';

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from 'react-day-picker/dist/style.module.css';

import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-2', className)}
      //HARD TO STYLE - VERY FRAGILE
      //DON'T CHANGE UNLESS ABSOLUTELY NECESSARY
      //don't beleive me?? check these commits and preview links:
      //https://github.com/vesto-fi/vesto-web/pull/681
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 p-0 opacity-75 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:!bg-[#2E2E1F]/[0.01] [&:has([aria-selected])]:bg-surface-hover first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: 'text-text-primary shadow-none h-9 w-9 p-0 font-normal aria-selected:opacity-100 border-2 border-transparent hover:border-evergreen-600 hover:bg-evergreen-600/20 hover:rounded-md hover:text-black',
        day_range_end: 'day-range-end aria-selected:text-white',
        day_range_start: 'aria-selected:text-white',
        day_selected:
          'bg-evergreen-700 border-transparent hover:bg-evergreen-700 hover:border-white/20 hover:bg-evergreen-700 hover:text-white focus:bg-evergreen-700 focus:text-white aria-selected:bg-evergreen-700 aria-selected:rounded-md aria-selected:text-white',
        day_today:
          'bg-tomato-700 rounded-full text-white day-outside:bg-[#2E2E1F]/[0.06]',
        day_outside:
          'day-outside text-black opacity-50 aria-selected:!bg-[#2E2E1F]/[0.01] aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-black opacity-50 bg-[#2E2E1F]/[0.06]',
        day_range_middle:
          'aria-selected:!bg-black-alpha-25 text-black aria-selected:!text-black rounded-[0px] aria-selected:rounded-[0px] aria-selected:hover:rounded-md aria-selected:hover:border-evergreen-600 hover:bg-evergreen-600/20 ',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <CaretLeft size={16} />,
        IconRight: () => <CaretRight size={16} />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
