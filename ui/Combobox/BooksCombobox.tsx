'use client';
import { CaretDown, Plus } from '@phosphor-icons/react/dist/ssr';
import { useCombobox } from 'downshift';
import React, { useState } from 'react';

import { INDEX_TO_TAILWIND_BG } from '@/components/Dashboard/colorMaps';
import { Button } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils';

type DataObject = {
  id: string;
  author: string;
  title: string;
};

const books: DataObject[] | null = [
  { id: 'book-1', author: 'Harper Lee', title: 'To Kill a Mockingbird' },
  { id: 'book-2', author: 'Lev Tolstoy', title: 'War and Peace' },
  { id: 'book-3', author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
  { id: 'book-4', author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
  { id: 'book-5', author: 'George Orwell', title: '1984' },
  { id: 'book-6', author: 'Jane Austen', title: 'Pride and Prejudice' },
  { id: 'book-7', author: 'Marcus Aurelius', title: 'Meditations' },
  {
    id: 'book-8',
    author: 'Fyodor Dostoevsky',
    title: 'The Brothers Karamazov',
  },
  { id: 'book-9', author: 'Lev Tolstoy', title: 'Anna Karenina' },
  { id: 'book-10', author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' },
];

function queryData(data: DataObject[], inputValue: string): DataObject[] {
  const lowerCasedInputValue = inputValue.toLowerCase();
  const emptyList =
    data.length &&
    data.every(
      (item) =>
        item &&
        item?.title &&
        !item?.title?.toLocaleLowerCase()?.includes(lowerCasedInputValue),
    );

  if (inputValue && emptyList) {
    return [
      {
        id: 'new-entity',
        title: `Create entity `, //Create new entity "${inputValue}"
        author: 'new',
      } as DataObject,
    ];
  } else {
    return data.filter(
      (book: DataObject) =>
        !inputValue ||
        book.title.toLowerCase().includes(lowerCasedInputValue) ||
        book.author.toLowerCase().includes(lowerCasedInputValue),
    );
  }
}

const BooksComboxbox = () => {
  const [items, setItems] = useState<DataObject[]>(books);
  const [selectedItem, setSelectedItem] = useState<
    DataObject | null | undefined
  >(null);
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    getInputProps,
    inputValue,
    setInputValue,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: items,
    itemToString(item) {
      return item ? item.title : '';
    },
    onInputValueChange({ inputValue: query }) {
      setItems(queryData(books, query ?? ''));
    },
    selectedItem,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      setSelectedItem(newSelectedItem);
    },
  });
  const globalIndexSelected =
    books.findIndex((b) => b.id === selectedItem?.id) % 10;
  const selectedEntityColor = INDEX_TO_TAILWIND_BG[globalIndexSelected];

  return (
    <div className="relative flex flex-col w-48">
      <Popover open={isOpen} onOpenChange={(_open: boolean) => null}>
        <PopoverTrigger asChild>
          <div>
            <Button
              rightIcon={CaretDown}
              variant="outline"
              size="sm"
              fullWidth
              {...getToggleButtonProps()}
              aria-label="toggle menu"
              className={cn(
                { 'text-text-secondary': !selectedItem },
                'justify-start overflow-hidden',
              )}
            >
              {selectedItem ? (
                <div className="flex flex-row items-center grow gap-2 shrink min-w-0">
                  <div
                    className={`w-[0.625rem] h-[0.625rem] shrink-0 rounded-full ${selectedEntityColor}`}
                  />
                  <Text variant="label" size="sm" className="truncate">
                    {selectedItem?.title}
                  </Text>
                </div>
              ) : (
                <Text
                  variant="label"
                  size="sm"
                  className="truncate text-text-secondary grow text-left"
                >
                  Select an entity
                </Text>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="center"
          sideOffset={-34}
          className={`p-0 w-[var(--radix-popover-trigger-width)] max-h-[--radix-popover-content-available-height] ${
            !isOpen && 'hidden'
          }`}
          // forceMountPortal
        >
          <div
            className={cn(
              { hidden: !isOpen },
              'w-full overflow-hidden bg-yellow-50 text-text-foreground',
            )}
          >
            <div>
              <input
                className="px-4 py-2 bg-transparent flex flex-row items-center placeholder-text-quaternary w-full rounded-none border-b border-gray-300 outline-none tracking-[0.0075rem] leading-[1.45rem] font-[300] text-sm"
                placeholder="Search Entities"
                {...getInputProps({
                  onFocus() {
                    if (inputValue !== '') {
                      setInputValue('');
                    }
                  },
                })}
              />
              <ul {...getMenuProps()} className="p-1 max-h-48 overflow-y-auto">
                {items.map((item, i) => {
                  const globalIndex =
                    books.findIndex((b) => b.id === item.id) % 10;
                  const entityColor = INDEX_TO_TAILWIND_BG[globalIndex];
                  //highlight the search term
                  const sanitizedInput = inputValue.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    '\\$&',
                  );
                  const regex = new RegExp(sanitizedInput, 'gi');
                  const parts = item.title.split(regex) ?? [item.title ?? ''];
                  const highlightedParts = item.title.match(regex);

                  return (
                    <li
                      className={cn(
                        highlightedIndex === i && 'bg-gray-200',
                        selectedItem === item && 'bg-black-alpha-75',
                        'cursor-pointer flex items-center rounded-md px-2 h-[2rem] text-sm outline-none transition-colors focus:bg-gray-200 focus:text-text-primary',
                      )}
                      key={`${item.title}${i}`}
                      {...getItemProps({ item, i })}
                    >
                      <div className="flex flex-row truncate items-center grow gap-2 shrink min-w-0">
                        {item.id === 'new-entity' ? (
                          <Plus size={10} className="shrink-0" />
                        ) : (
                          <div
                            className={`w-[0.625rem] h-[0.625rem] shrink-0 rounded-full ${entityColor}`}
                          />
                        )}
                        <Text
                          variant="label"
                          size="sm"
                          className={cn(
                            {
                              'font-bold ': selectedItem?.id === item.id,
                            },
                            'truncate',
                          )}
                        >
                          {item.id === 'new-entity' ? (
                            <>
                              {item.title}
                              <span className="font-bold">"{inputValue}"</span>
                            </>
                          ) : (
                            <span key={item.id}>
                              {parts.map((part, index) => (
                                <React.Fragment key={index}>
                                  {part}
                                  {index < parts.length - 1 &&
                                    highlightedParts && (
                                      <b style={{ fontWeight: 'bold' }}>
                                        {highlightedParts[index]}
                                      </b>
                                    )}
                                </React.Fragment>
                              ))}
                            </span>
                          )}
                        </Text>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default BooksComboxbox;
