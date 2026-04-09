import {HourSkeleton} from "../hour/hour-skeleton.tsx";

const HOURS = Array.from({length: 13}, (_, index) => index + 8)
const DAYS = 7

export const WeekSkeleton = () => (
    <div className="flex flex-col h-screen text-left overflow-hidden">
        <div className="px-6 py-4 border-b shrink-0" style={{borderColor: 'var(--border)'}}>
            <div className="h-6 w-36 animate-pulse rounded" style={{background: 'var(--border)'}}/>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex border-b shrink-0" style={{borderColor: 'var(--border)'}}>
                <div className="w-16 shrink-0"/>
                {Array.from({length: DAYS}, (_, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center py-3 gap-2">
                        <div className="h-3 w-6 animate-pulse rounded" style={{background: 'var(--border)'}}/>
                        <div className="h-9 w-9 animate-pulse rounded-full" style={{background: 'var(--border)'}}/>
                    </div>
                ))}
            </div>

            <div className="flex flex-1 overflow-y-auto">
                <div className="w-16 shrink-0">
                    {HOURS.map(hour => (
                        <div key={hour} className="h-[60px] flex items-start justify-end pr-3 pt-1">
                            <div className="h-3 w-10 animate-pulse rounded" style={{background: 'var(--border)'}}/>
                        </div>
                    ))}
                </div>

                {Array.from({length: DAYS}, (_, index) => (
                    <div key={index} className="flex-1 border-l" style={{borderColor: 'var(--border)'}}>
                        {HOURS.map(hour => <HourSkeleton key={hour}/>)}
                    </div>
                ))}
            </div>
        </div>
    </div>
)
