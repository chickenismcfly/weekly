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

Root component. Fetches appointments via `useAppointments` and handles loading and error states. Derives `weekStart`
from the first appointment's date and renders the month/year header.

### `Week`

Owns the slot state. On mount, computes an initial `Slot[]` from the full appointment list — consecutive unbooked hours
across the whole week are collapsed into a single `collapsed` slot; booked hours each get their own `hour` slot. Renders
a sticky day-header row and a scrollable grid body with a time gutter on the left.

Exposes `expandSegment(id)` which replaces a `collapsed` slot with individual `hour` slots, identified by the slot's
`id`.

### `Day`

Renders a single column. Iterates the shared `slots` array and delegates each slot to either a thin collapsed bar (
clickable to expand) or an `Hour` cell. Filters the full appointments list down to its own date.

### `Hour`

A 60px tall cell. Empty slots show only the grid border. Booked slots render the appointment title in a left-accented
block using the theme accent color.

### `WeekSkeleton` / `HourSkeleton`

Structural skeleton shown during the initial fetch. Mirrors the layout of `Week` so there is no layout shift on
load.

### `useAppointments`

Custom hook that fetches appointments once on mount and exposes `{ appointments, loading, error }`.

## Types

### `Slot`

A discriminated union representing a row in the grid:

- `{ type: 'hour'; hour: number }` — a single hour that may have appointments
- `{ type: 'collapsed'; hours: number[]; id: string }` — a run of consecutive hours that are free across the entire
  week, collapsed into one row

## Tradeoffs

**Slots are computed from the full week, not per-day.** I considered storing this information on day level, but I
thought that since the criteria list asked for collapsed hours only if they were available during the entire week, I
thought this information would be better handled as a responsibility of the Week component. With more features, I could
imagine it either having to be delegated to the day component eventually or it should probably move into a more scalable
state management solution which allows the sharing and update of this state between the different components.

**Collapsed segments are identified by a stable `id` (`hours.join('-')`).** This avoids passing `hours[]` around as an
identity key, which would require comparing arrays. The tradeoff is the id is derived data and must stay in sync with
the `hours` array — it does because both are set at the same time in `getInitialSlots`.

**No multi-hour appointment rendering.** Appointments have both `startHour` and `endHour` in the data model, but the
grid only uses `startHour` to place them. For example, a 2-hour appointment would not visually span two rows, since the
mock data didn't contain an example like that.

**`weekStart` is derived from `appointments[0].date`.** There is no date picker or navigation. The displayed week is
always whatever week the mock data covers. Although I made the starting date of the week basically pickable in the code,
it doesn't really have any real usage benefit right now. Maybe if paging were implemented to show several weeks of data,
this prop could be beneficial.

**`useAppointments` handles fetch state without a data-fetching library.** For a single fetch with no caching or
pagination needs, adding something like React Query felt over-engineered, so loading and error state are managed
manually in the hook.
This solution would probably start to get tedious if paging were added to fetch multiple weeks.

**I initially tried to build the app using Chakra UI for accessibility reasons, but I swapped it out for Tailwind CSS**
after a Lighthouse audit showed it was adding significant bundle weight with no real benefit for a project this size.
