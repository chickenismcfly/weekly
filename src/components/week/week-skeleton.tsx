import {HourSkeleton} from "../hour/hour-skeleton.tsx";

const HOURS = Array.from({length: 13}, (_, i) => i + 8) // 8–20
const DAYS = 7

export const WeekSkeleton = () => (
    <div className="flex items-start">
        <div className="pt-6">
            {HOURS.map(hour => {
                const label = `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`
                return (
                    <div key={hour} className="h-[60px] w-12">
                        <span className="text-xs text-gray-500">{label}</span>
                    </div>
                )
            })}
        </div>
        {Array.from({length: DAYS}, (_, i) => (
            <div key={i} className="flex-1">
                <div className="h-[21px] w-20 mb-1 animate-pulse bg-gray-200 rounded"/>
                {HOURS.map(hour => <HourSkeleton key={hour}/>)}
            </div>
        ))}
    </div>
)
