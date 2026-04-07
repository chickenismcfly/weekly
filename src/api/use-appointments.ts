import {useEffect, useState} from 'react'
import {fetchAppointments} from "./mock-data.ts";
import type {Appointment} from "./api.ts";

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        fetchAppointments()
            .then(setAppointments)
            .catch(setError)
            .finally(() => setLoading(false))
    }, [])

    return {appointments, loading, error}
}
