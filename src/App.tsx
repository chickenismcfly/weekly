import {useAppointments} from "./api/use-appointments.ts";
import {Week} from "./components/week/week.tsx";
import {WeekSkeleton} from "./components/week/week-skeleton.tsx";

const App = () => {
    const {appointments, loading} = useAppointments()

    if (loading) {
        return <WeekSkeleton/>
    }

    return <Week appointments={appointments} weekStart={new Date(appointments[0].date)}/>
}

export default App
