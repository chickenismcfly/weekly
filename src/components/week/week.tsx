import {useState} from "react";
import type {Appointment} from "../../api/api.ts";
import type {Slot} from "./types.ts";
import {Day} from "../day/day.tsx";

const HOURS = Array.from({length: 13}, (_, index) => index + 8) // 8–20

type WeekProps = {
    appointments: Appointment[]
    weekStart: Date
}

const getWeekDates = (monday: Date): string[] =>
    Array.from({length: 7}, (_, index) => {
        const date = new Date(monday)
        date.setDate(monday.getDate() + index)
        return date.toISOString().slice(0, 10)
    })

const getInitialSlots = (appointments: Appointment[]): Slot[] => {
    const bookedHours = new Set(appointments.map(appointment => appointment.startHour))
    const slots: Slot[] = []
    let index = 0
    while (index < HOURS.length) {
        if (!bookedHours.has(HOURS[index])) {
            const collapsed: number[] = []
            while (index < HOURS.length && !bookedHours.has(HOURS[index])) {
                collapsed.push(HOURS[index])
                index++
            }
            slots.push({type: 'collapsed', hours: collapsed, id: collapsed.join('-')})
        } else {
            slots.push({type: 'hour', hour: HOURS[index]})
            index++
        }
    }
    return slots
}

export const Week = ({appointments, weekStart}: WeekProps) => {
    const dates = getWeekDates(weekStart)
    const [slots, setSlots] = useState(() => getInitialSlots(appointments))

    const expandSegment = (id: string) => {
        setSlots(prev => prev.flatMap(slot => {
            if (slot.type !== 'collapsed' || slot.id !== id) return [slot]
            return slot.hours.map(hour => ({type: 'hour' as const, hour}))
        }))
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex border-b shrink-0" style={{borderColor: 'var(--border)'}}>
                <div className="w-16 shrink-0"/>
                {dates.map(date => {
                    const dateObj = new Date(date)
                    const dayName = dateObj.toLocaleDateString('en-US', {weekday: 'short'})
                    const dayNumber = dateObj.getDate()
                    return (
                        <div key={date} className="flex-1 flex flex-col items-center py-3 gap-1">
                            <span className="text-xs uppercase tracking-widest"
                                  style={{color: 'var(--text)'}}>{dayName}</span>
                            <span className="text-xl font-medium w-9 h-9 flex items-center justify-center"
                                  style={{color: 'var(--text-h)'}}>
                                {dayNumber}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="flex flex-1 overflow-y-auto">
                <div className="w-16 shrink-0">
                    {slots.map((slot) => {
                        if (slot.type === 'collapsed') {
                            return <div key={slot.id} className="h-2"/>
                        }
                        const label = `${slot.hour % 12 || 12} ${slot.hour < 12 ? 'AM' : 'PM'}`
                        return (
                            <div key={slot.hour} className="h-[60px] flex items-start justify-end pr-3 pt-1">
                                <span className="text-xs" style={{color: 'var(--text)'}}>{label}</span>
                            </div>
                        )
                    })}
                </div>

                {dates.map(date => (
                    <Day
                        key={date}
                        appointments={appointments.filter(appointment => appointment.date === date)}
                        slots={slots}
                        onExpandSegment={expandSegment}
                    />
                ))}
            </div>
        </div>
    )
}
