import {useAppointments} from "./api/use-appointments.ts";
import {Week} from "./components/week/week.tsx";
import {WeekSkeleton} from "./components/week/week-skeleton.tsx";

const App = () => {
    const {appointments, loading, error} = useAppointments()

    if (loading) {
        return <WeekSkeleton/>
    }

    if (error) {
        return <p className="p-8">Failed to load appointments. Error message: {error.message}</p>
    }

    const weekStart = new Date(appointments[0].date)
    const monthLabel = weekStart.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})

    return (
        <div className="flex flex-col h-screen text-left overflow-hidden">
            <header className="px-6 py-4 border-b shrink-0" style={{borderColor: 'var(--border)'}}>
                <span className="text-lg font-semibold" style={{color: 'var(--text-h)'}}>{monthLabel}</span>
            </header>
            <div className="flex-1 overflow-hidden">
                <Week appointments={appointments} weekStart={weekStart}/>
            </div>
        </div>
    )
}

export default App
