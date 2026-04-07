import {useState} from "react";
import type {Appointment} from "../../api/api.ts";
import type {Slot} from "./types.ts";
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

const getInitialSlots = (appointments: Appointment[]): Slot[] => {
    const bookedHours = new Set(appointments.map(a => a.startHour))
    const slots: Slot[] = []
    let i = 0
    while (i < HOURS.length) {
        if (!bookedHours.has(HOURS[i])) {
            const segment: number[] = []
            while (i < HOURS.length && !bookedHours.has(HOURS[i])) {
                segment.push(HOURS[i])
                i++
            }
            slots.push({type: 'segment', hours: segment})
        } else {
            slots.push({type: 'hour', hour: HOURS[i]})
            i++
        }
    }
    return slots
}

export const Week = ({appointments, weekStart}: WeekProps) => {
    const dates = getWeekDates(weekStart)
    const [slots, setSlots] = useState(() => getInitialSlots(appointments))

    const expandSegment = (hours: number[]) => {
        setSlots(prev => prev.flatMap(slot =>
            slot.type === 'segment' && slot.hours[0] === hours[0]
                ? slot.hours.map(h => ({type: 'hour' as const, hour: h}))
                : [slot]
        ))
    }

    return (
        <div className="flex items-start">
            <div className="pt-6">
                {slots.map((slot, i) => {
                    if (slot.type === 'segment') {
                        return <div key={i} className="h-1 w-12"/>
                    }
                    const label = `${slot.hour % 12 || 12} ${slot.hour < 12 ? 'AM' : 'PM'}`
                    return (
                        <div key={slot.hour} className="h-[60px] w-12">
                            <span className="text-xs text-gray-500">{label}</span>
                        </div>
                    )
                })}
            </div>
            {dates.map(date => (
                <Day
                    key={date}
                    date={date}
                    appointments={appointments.filter(a => a.date === date)}
                    slots={slots}
                    onExpandSegment={expandSegment}
                />
            ))}
        </div>
    )
}
