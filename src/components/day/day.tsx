import type {Appointment} from "../../api/api.ts";
import {Hour} from "../hour/hour.tsx";

const HOURS = Array.from({length: 13}, (_, i) => i + 8) // 8–20

type DayProps = {
    date: string
    appointments: Appointment[]
}

export const Day = ({date, appointments}: DayProps) => {
    const label = new Date(date).toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'})

    return (
        <div>
            <div>{label}</div>
            {HOURS.map(hour => {
                const hourAppointments = appointments.filter(a => a.startHour === hour)
                return (
                    <Hour
                        key={hour}
                        available={hourAppointments.length === 0}
                        label={hourAppointments.map(a => a.title).join(', ')}
                    />
                )
            })}
        </div>
    )
}
