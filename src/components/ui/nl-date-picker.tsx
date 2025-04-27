"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as chrono from "chrono-node";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

export function NaturalLanguageDatePicker() {
  const [date, setDate] = React.useState<Date>();
  const [inputValue, setInputValue] = React.useState("");
  const [calendarMonth, setCalendarMonth] = React.useState<Date>(new Date());
  const [isError, setIsError] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (isError) setIsError(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue.trim()) {
        const parsedDate = chrono.parseDate(inputValue);
        if (parsedDate) {
          setDate(parsedDate);
          setCalendarMonth(parsedDate);
          setInputValue("");
          setIsError(false);
        } else {
          setIsError(true);
          setTimeout(() => setIsError(false), 350);
        }
      }
    }
  };

  // Handle calendar date selection
  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    if (newDate) {
      setCalendarMonth(newDate);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            75% { transform: translateX(2px); }
          }
          
          .date-picker-shake {
            animation: shake 0.15s ease-in-out 0s 2;
          }
        `}
      </style>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <div className="flex flex-col space-y-2">
            <Input
              placeholder="Try 'next friday' or 'in 2 weeks'"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className={cn(
                "w-full transition-colors duration-200",
                isError && "date-picker-shake"
              )}
            />
            <div className="text-xs text-muted-foreground">
              Press Enter to confirm
            </div>
          </div>
          <div className="rounded-md border">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              month={calendarMonth}
              onMonthChange={setCalendarMonth}
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
