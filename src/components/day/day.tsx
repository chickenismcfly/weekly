import type {Appointment} from "../../api/api.ts";
import type {Slot} from "../week/types.ts";
import {Hour} from "../hour/hour.tsx";

type DayProps = {
    date: string
    appointments: Appointment[]
    slots: Slot[]
    onExpandSegment: (hours: number[]) => void
}

export const Day = ({date, appointments, slots, onExpandSegment}: DayProps) => {
    const label = new Date(date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})

    return (
        <div className="flex-1">
            <span className="text-sm font-medium">{label}</span>
            {slots.map((slot, i) => {
                if (slot.type === 'segment') {
                    return (
                        <div key={i} className="h-1 border-b border-white w-full cursor-pointer"
                             onClick={() => onExpandSegment(slot.hours)}/>
                    )
                }
                const hourAppointments = appointments.filter(a => a.startHour === slot.hour)
                return (
                    <Hour
                        key={slot.hour}
                        available={hourAppointments.length === 0}
                        label={hourAppointments.map(a => a.title).join(', ')}
                    />
                )
            })}
        </div>
    )
}
