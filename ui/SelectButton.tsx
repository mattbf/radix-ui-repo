'use client';
import { CaretDown, Check, Info } from '@phosphor-icons/react/dist/ssr';
import React, { Dispatch, SetStateAction } from 'react';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Text } from '@/components/ui/Text';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';

function SelectButton({
  label,
  align,
  tooltipText,
  options,
  selected,
  setSelected,
}: {
  label: string;
  buttonLabel: string;
  align?: 'center' | 'end' | 'start' | undefined;
  tooltipText?: string;
  options: { title: string; value: string }[] | undefined;
  selected: { title: string; value: string } | undefined;
  setSelected: Dispatch<
    SetStateAction<{ title: string; value: string } | undefined>
  >;
}) {
  const handleSelectOption = (_event: Event, index: number) => {
    if (!!options) setSelected(options[index]);
  };
  return (
    <DropdownMenu>
      <div className="truncate flex flex-row items-center rounded-md border border-stroke-secondary">
        <Text
          variant="label"
          size="sm"
          className="px-[1.125rem] text-text-secondary flex flex-row items-center gap-2"
        >
          {label}
          {tooltipText && !!tooltipText && (
            <TooltipProvider>
              <Tooltip delayDuration={250}>
                <TooltipTrigger asChild>
                  <Info size={14} weight="bold" color="currentColor" />
                </TooltipTrigger>
                <TooltipContent side="bottom" align="center">
                  {tooltipText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Text>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            rightIcon={CaretDown}
            variant="outline"
            className="rounded-none border-l-stroke-secondary border-y-transparent border-r-transparent"
          >
            {selected?.title}
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align={align ?? 'center'} className="min-w-[6rem]">
        {options?.map((o, i) => (
          <DropdownMenuItem
            key={i}
            label={''} //o?.title ??
            onSelect={(e) => handleSelectOption(e, i)}
            className="h-[2rem]"
          >
            {selected?.value === o.value ? (
              <Check size={14} color="currentColor" />
            ) : (
              <div className="w-[14px] h-[14px]" />
            )}
            <Text
              variant="label"
              size="sm"
              className={
                selected?.value === o.value ? undefined : 'text-text-secondary'
              }
            >
              {o.title}
            </Text>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default SelectButton;
