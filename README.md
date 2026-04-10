# Weekly

A weekly calendar view built with React, TypeScript, and Tailwind CSS. Displays a 7-day grid of appointments with
collapsible free-time segments.

## Getting started

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## Components

### `App`

Root component. Fetches appointments via `useAppointments` and handles loading and error states:

- Renders `WeekSkeleton` while loading and an inline error message on failure.
- Derives `weekStart` from `appointments[0].date` and formats a month/year label for the sticky header.
- Owns the full-screen flex layout (fixed header, scrollable body) and passes `appointments` and `weekStart` down to
  `Week`.

### `Week`

Owns the slot state and the overall grid structure:

- Computes 7 ISO date strings from `weekStart` via `getWeekDates`.
- Initialises `slots` once with `getInitialSlots`: scans hours 8–20 across all appointments and collapses
  consecutive unbooked hours into a single `collapsed` slot with a stable `id` (`hours.join('-')`); each booked hour
  becomes an individual `hour` slot.
- Renders a day-header row showing each day's abbreviated name and date number.
- Renders a left time gutter: a 60px AM/PM label for `hour` slots and an 8px spacer for `collapsed` slots.
- Renders one `Day` column per date, passing pre-filtered appointments and the shared `slots` array.
- Exposes `expandSegment(id)` which splices a `collapsed` slot in place with its relevant `hour` slots.

### `Day`

Renders a single column in the grid:

- Receives appointments already filtered to its own date (filtered by `Week` before passing down).
- For each `collapsed` slot: renders a thin 8px clickable bar with a centred horizontal dash; clicking calls
  `onExpandSegment(id)` to expand it.
- For each `hour` slot: looks up a matching appointment by `startHour` and renders an `Hour` cell, passing
  `available` and the appointment `title` as `label`.

### `Hour`

A 60px tall cell with a bottom border:

- When `available` is `true`: renders an empty cell showing only the grid border.
- When `available` is `false`: renders an absolute-positioned block with the theme accent background, a 3px left
  accent border, and the appointment title truncated to one line.

### `WeekSkeleton` / `HourSkeleton`

Structural skeletons shown during the initial data fetch:

- `WeekSkeleton` mirrors the full `App` + `Week` layout: placeholders appear for the month label, all
  7 day headers (weekday name + circular date number), the time labels, and every hour cell.
- `HourSkeleton` is a plain 60px cell with a bottom border and no content, used by `WeekSkeleton` to fill the grid.
- Together they ensure there is minimal layout shift when real data loads.

### `useAppointments`

Custom hook that fetches appointments once on mount and exposes `{ appointments, loading, error }`.

## Types

### `Slot`

A discriminated union representing a row in the grid:

- `{ type: 'hour'; hour: number }`: a single hour that may have appointments
- `{ type: 'collapsed'; hours: number[]; id: string }`: a run of consecutive hours that are free across the entire
  week, collapsed into one row

## Tradeoffs

**Slots are computed from the full week, not per-day.** I considered storing this information on day level, but I
thought that since the criteria list asked for collapsed hours only if they were available during the entire week, this
information would be better handled as a responsibility of the Week component. With more features, I could
imagine it either having to be delegated to the day component eventually or it should probably move into a more scalable
state management solution which allows the sharing and update of this state between the different components.

**Collapsed segments are identified by a stable `id` (`hours.join('-')`).** This avoids passing `hours[]` around as an
identity key (or an array index, khm), which would require comparing arrays. The tradeoff is the id is derived data and
must stay in sync with the `hours` array — it does because both are set at the same time in `getInitialSlots`.

**No multi-hour appointment rendering.** Appointments have both `startHour` and `endHour` in the data model, but the
grid only uses `startHour` to place them. Since the mock data didn't cover for example 2 hour long appointments, I
didn't cover that case for simplicity. Hence, `endHour` is not used.

**`weekStart` is derived from `appointments[0].date`.** There is no date picker or a starting day setting for different
type of calendars. The displayed week is always whatever week the mock data covers. Although I made the starting date of
the week basically pickable in the code,
it doesn't really have any real usage benefit right now. Maybe if paging were implemented to show several weeks of data,
this prop could be beneficial.

**`useAppointments` handles fetch state without a data-fetching library.** For a single fetch with no caching or
pagination needs, adding something like React Query felt over-engineered, so loading and error state are managed
manually in the hook.
This solution would probably start to get tedious if paging were added to fetch multiple weeks.

**I initially tried to build the app using Chakra UI for accessibility reasons, but I swapped it out for Tailwind CSS**
after a Lighthouse audit showed it was adding significant bundle weight with no real benefit for a project this size.
