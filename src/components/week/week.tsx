import type {Appointment} from "../../api/api.ts";
import {Day} from "../day/day.tsx";

const HOURS = Array.from({length: 13}, (_, i) => i + 8) // 8–20

type WeekProps = {
    appointments: Appointment[]
    weekStart: Date // Monday
}

const getWeekDates = (monday: Date): string[] =>
    Array.from({length: 7}, (_, i) => {
        const d = new Date(monday)
        d.setDate(monday.getDate() + i)
        return d.toISOString().slice(0, 10)
    })

export const Week = ({appointments, weekStart}: WeekProps) => {
    const dates = getWeekDates(weekStart)

    return (
        <div style={{display: 'flex'}}>
            <div style={{paddingTop: '24px'}}>
                {HOURS.map(hour => {
                    const label = `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`
                    return (
                        <div key={hour} style={{height: '60px', width: '48px', fontSize: '12px', color: '#888'}}>
                            {label}
                        </div>
                    )
                })}
            </div>
            {dates.map(date => (
                <Day
                    key={date}
                    date={date}
                    appointments={appointments.filter(a => a.date === date)}
                />
            ))}
        </div>
    )
}
