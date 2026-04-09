import type {Appointment} from "../../api/api.ts";
import type {Slot} from "../week/types.ts";
import {Hour} from "../hour/hour.tsx";

type DayProps = {
    appointments: Appointment[]
    slots: Slot[]
    onExpandSegment: (id: string) => void
}

export const Day = ({appointments, slots, onExpandSegment}: DayProps) => (
    <div className="flex-1 border-l" style={{borderColor: 'var(--border)'}}>
        {slots.map((slot) => {
            if (slot.type === 'collapsed') {
                return (
                    <div
                        key={slot.id}
                        className="h-2 border-b flex items-center justify-center cursor-pointer transition-colors"
                        style={{borderColor: 'var(--border)'}}
                        onClick={() => onExpandSegment(slot.id)}
                    >
                        <div className="w-3 h-px" style={{background: 'var(--border)'}}/>
                    </div>
                )
            }
            const hourAppointment = appointments.find(appointment => appointment.startHour === slot.hour)
            return (
                <Hour
                    key={slot.hour}
                    available={!hourAppointment}
                    label={hourAppointment?.title}
                />
            )
        })}
    </div>
)
