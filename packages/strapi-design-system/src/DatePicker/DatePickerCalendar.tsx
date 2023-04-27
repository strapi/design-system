/* eslint-disable react/no-array-index-key */
import * as React from 'react';

import {
  startOfWeek,
  today,
  getDayOfWeek,
  parseAbsoluteToLocal,
  DateValue,
  isSameDay,
  startOfMonth,
  toCalendarDate,
  CalendarDate,
  endOfMonth,
} from '@internationalized/date';
import styled, { ThemeColors } from 'styled-components';

import { DismissibleLayer } from '../DismissibleLayer';
import { Flex } from '../Flex';
import { FocusTrap } from '../FocusTrap';
import { getDefaultLocale } from '../helpers/getDefaultLocale';
import { useDateFormatter } from '../hooks/useDateFormatter';
import { PopoverPrimitives } from '../Popover';
import { Portal } from '../Portal';
import { RawTable, RawThead, RawTbody, RawTr, RawTh, RawThProps, RawTd, RawTdProps } from '../RawTable';
import { SingleSelectInput, SingleSelectOption } from '../Select/SingleSelect';
import { Typography } from '../Typography';

const TIME_ZONE = 'UTC';
const DEFAULT_PAST_RANGE = 200;
const DEFAULT_FUTURE_RANGE = 15;

export interface DatePickerCalendarProps {
  /**
   * @default Now
   */
  initialDate?: Date;
  /*
   * Minimum year, that can be selected through the year select
   */
  minDate?: Date;
  /*
   * Maximum year, that can be selected through the year select
   */
  maxDate?: Date;
  locale?: string;
  /**
   * onChange function, passed from a parent component, it takes the actual date value and it is used inside the different handlers related to the change event for the DatePicker and the TimePicker and also the clear event for the TimePicker
   */
  onChange?: (date: Date) => void;
  popoverSource: React.MutableRefObject<HTMLElement>;
  selectedDate?: Date;
  onDismiss: () => void;
  monthSelectLabel?: string;
  yearSelectLabel?: string;
}

export type DatePickerCalendarContentProps = Omit<DatePickerCalendarProps, 'popoverSource' | 'onDismiss'>;

export const DatePickerCalendar = ({ onDismiss, popoverSource, ...restProps }: DatePickerCalendarProps) => (
  <Portal>
    <PopoverPrimitives.Content source={popoverSource} role="dialog" aria-modal="true" spacing={4} overflow="hidden">
      <FocusTrap>
        <DismissibleLayer onEscapeKeyDown={onDismiss} onPointerDownOutside={onDismiss}>
          <DatePickerCalendarContent {...restProps} />
        </DismissibleLayer>
      </FocusTrap>
    </PopoverPrimitives.Content>
  </Portal>
);

export const DatePickerCalendarContent = ({
  selectedDate,
  initialDate = new Date(),
  locale: defaultLocale,
  onChange,
  minDate,
  maxDate,
  monthSelectLabel = 'Month',
  yearSelectLabel = 'Year',
}: DatePickerCalendarContentProps) => {
  const [localDate, setLocalDate] = React.useState(() => convertUTCDateToCalendarDate(initialDate));
  const startDate = startOfMonth(localDate);

  const locale = defaultLocale || getDefaultLocale();

  const years: string[] = React.useMemo(() => {
    const minYear = minDate ? minDate.getFullYear() : initialDate.getFullYear() - DEFAULT_PAST_RANGE;
    const maxYear = maxDate ? maxDate.getFullYear() : initialDate.getFullYear() + DEFAULT_FUTURE_RANGE;

    return [...Array(maxYear - minYear + 1).keys()].map((y) => (minYear + y).toString());
  }, [minDate, initialDate, maxDate]);

  const monthFormatter = useDateFormatter(locale, { month: 'long' });
  const months: string[] = React.useMemo(
    () => [...Array(12).keys()].map((m) => monthFormatter.format(new Date(Date.UTC(2023, m)))),
    [monthFormatter],
  );

  const dayFormatter = useDateFormatter(locale, { weekday: 'short' });
  /**
   * These are the strings of our days of the week
   * e.g. `Mon`, `Tue`, `Wed`, etc.
   */
  const weekDays = React.useMemo(() => {
    let weekStart = startOfWeek(today(TIME_ZONE), locale);

    return [...new Array(7).keys()].map((index) => {
      let date = weekStart.add({ days: index });
      let dateDay = date.toDate(TIME_ZONE);

      return dayFormatter.format(dateDay);
    });
  }, [locale, dayFormatter]);

  React.useEffect(() => {
    if (selectedDate) {
      setLocalDate(convertUTCDateToCalendarDate(selectedDate));
    }
  }, [selectedDate]);

  const handleMonthChange = (month: string | number) => {
    if (typeof month === 'number') {
      /**
       * This just to make TS happy, we're not going to get a
       * number because we only use strings as options
       */
      return;
    }

    const updatedDate = localDate.set({ month: months.indexOf(month) + 1 });
    setLocalDate(updatedDate);
  };

  const handleYearChange = (year: string | number) => {
    if (typeof year === 'number') {
      /**
       * This just to make TS happy, we're not going to get a
       * number because we only use strings as options
       */
      return;
    }

    const updatedDate = localDate.set({ year: parseInt(year, 10) });
    setLocalDate(updatedDate);
  };

  const handleSelectDay = (date: DateValue) => () => {
    if (onChange) {
      onChange(date.toDate(TIME_ZONE));
    }
  };

  const getDatesInWeek = makeGetDatesInWeek(startDate, locale);

  return (
    <Flex direction="column" alignItems="stretch" padding={4}>
      <ToolbarFlex justifyContent="flex-start" paddingBottom={4} paddingLeft={2} paddingRight={2} gap={2}>
        <SingleSelectInput
          label={monthSelectLabel}
          size="S"
          value={months[localDate.month - 1]}
          onChange={handleMonthChange}
        >
          {months.map((month) => (
            <SingleSelectOption key={month} value={month}>
              {month}
            </SingleSelectOption>
          ))}
        </SingleSelectInput>
        <SingleSelectInput
          size="S"
          value={localDate.year.toString()}
          label={yearSelectLabel}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <SingleSelectOption key={year} value={year}>
              {year}
            </SingleSelectOption>
          ))}
        </SingleSelectInput>
      </ToolbarFlex>
      <RawTable colCount={7} rowCount={7} role="grid">
        <RawThead aria-hidden>
          <RawTr aria-rowindex={1}>
            {weekDays.map((day) => (
              <HeaderCell key={day}>{day}</HeaderCell>
            ))}
          </RawTr>
        </RawThead>
        <RawTbody>
          {[...new Array(6).keys()].map((weekIndex) => (
            <RawTr key={weekIndex}>
              {getDatesInWeek(weekIndex).map((date, i) =>
                date ? (
                  <BodyCell
                    key={i}
                    locale={locale}
                    date={date}
                    startDate={startDate}
                    onSelectDay={handleSelectDay(date)}
                    isSelected={selectedDate ? isSameDay(convertUTCDateToCalendarDate(selectedDate), date) : false}
                  />
                ) : (
                  <Cell />
                ),
              )}
            </RawTr>
          ))}
        </RawTbody>
      </RawTable>
    </Flex>
  );
};

const convertUTCDateToCalendarDate = (date: Date): CalendarDate => {
  const utcDateString = date.toISOString();
  const zonedDateTime = parseAbsoluteToLocal(utcDateString);

  /**
   * ZonedDateTime can't have weeks added,
   * see – https://github.com/adobe/react-spectrum/issues/3667
   */
  return toCalendarDate(zonedDateTime);
};

const makeGetDatesInWeek = (from: CalendarDate, locale: string) => (weekIndex: number) => {
  let date = from.add({ weeks: weekIndex });
  let dates: Array<CalendarDate | null> = [];

  date = startOfWeek(date, locale);

  /**
   * startOfWeek will clamp dates within the calendar system's valid range, which may
   * start in the middle of a week. In this case, add null placeholders.
   */
  let dayOfWeek = getDayOfWeek(date, locale);
  for (let i = 0; i < dayOfWeek; i++) {
    dates.push(null);
  }

  while (dates.length < 7) {
    dates.push(date);
    let nextDate = date.add({ days: 1 });

    if (isSameDay(date, nextDate)) {
      /**
       * If the next day is the same, we have hit the end of the calendar system.
       */
      break;
    }

    date = nextDate;
  }

  /**
   * Add null placeholders if at the end of the calendar system.
   */
  while (dates.length < 7) {
    dates.push(null);
  }

  return dates;
};

const ToolbarFlex = styled(Flex)`
  div[role='combobox'] {
    border: 1px solid transparent;
    background: transparent;
    font-weight: ${(props) => props.theme.fontWeights.bold};

    ${Typography} {
      color: ${({ theme }) => theme.colors.neutral800};
    }

    svg {
      > g,
      path {
        fill: ${({ theme }) => theme.colors.neutral500};
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
    }
  }
`;

/* -------------------------------------------------------------------------------------------------
 * HeaderCell
 * -----------------------------------------------------------------------------------------------*/

interface HeaderCellProps extends Omit<RawThProps, 'children'> {
  children: string;
}

const HeaderCell = ({ children, ...props }: HeaderCellProps) => {
  return (
    <Th {...props}>
      <Flex height={`${24 / 16}rem`} width={`${32 / 16}rem`} justifyContent="center">
        <Typography variant="pi" fontWeight="bold" color="neutral800">
          {children.slice(0, 2)}
        </Typography>
      </Flex>
    </Th>
  );
};

const Th = styled(RawTh)`
  // Trick to prevent the outline from overflowing because of the general outline-offset
  outline-offset: -2px !important;
  border-radius: ${({ theme }) => theme.borderRadius};
  text-transform: capitalize;
`;

/* -------------------------------------------------------------------------------------------------
 * BodyCell
 * -----------------------------------------------------------------------------------------------*/

interface BodyCellProps extends Omit<RawTdProps, 'children'> {
  date: CalendarDate;
  isSelected: boolean;
  locale: string;
  startDate: CalendarDate;
  onSelectDay: (e: React.MouseEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>) => void;
}

const BodyCell = ({ date, isSelected, locale, onSelectDay, startDate, ...props }: BodyCellProps) => {
  const dateFormatter = useDateFormatter(locale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const label = React.useMemo(() => dateFormatter.format(date.toDate(TIME_ZONE)), [dateFormatter, date]);

  const cellDateFormatter = useDateFormatter(locale, {
    day: 'numeric',
    calendar: date.calendar.identifier,
  });

  const formattedDate = React.useMemo(
    () => cellDateFormatter.formatToParts(date.toDate(TIME_ZONE)).find((part) => part.type === 'day')!.value,
    [cellDateFormatter, date],
  );

  const endDate = endOfMonth(startDate);
  const isOutsideVisibleRange = date.compare(startDate) < 0 || date.compare(endDate) > 0;

  let textColor: keyof ThemeColors = 'neutral900';

  if (isSelected) {
    textColor = 'primary600';
  } else if (isOutsideVisibleRange) {
    textColor = 'neutral600';
  }

  return (
    <Cell aria-selected={isSelected} {...props}>
      <CellButton
        as="button"
        role="button"
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
        hasRadius
        aria-label={label}
        onClick={onSelectDay}
        background={isSelected ? 'primary100' : 'neutral0'}
        onPointerDown={(e) => {
          if ('releasePointerCapture' in e.target) {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
          }
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <Typography variant="pi" textColor={textColor}>
          {formattedDate}
        </Typography>
      </CellButton>
    </Cell>
  );
};

const Cell = styled(RawTd)`
  height: ${32 / 16}rem;
  width: ${32 / 16}rem;
`;

const CellButton = styled(Flex)`
  // Trick to prevent the outline from overflowing because of the general outline-offset
  outline-offset: -2px !important;
  &:hover {
    background: ${({ theme }) => theme.colors.primary100};

    & > ${Typography} {
      color: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
