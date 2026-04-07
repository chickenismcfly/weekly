import {useAppointments} from "./api/useAppointments.ts";

function App() {
    const {appointments, loading, error} = useAppointments()

    return (
        <>
            {appointments.length > 0 && (appointments.map((appointment) => <div>
                {appointment.date}
            </div>))}
        </>
    )
}

export default App
