import {HourSkeleton} from "../hour/hour-skeleton.tsx";

const HOURS = Array.from({length: 13}, (_, i) => i + 8) // 8–20
const DAYS = 7

export const WeekSkeleton = () => (
    <div style={{display: 'flex'}}>
        <div style={{paddingTop: '24px'}}>
            {HOURS.map(hour => {
                const label = `${hour % 12 || 12} ${hour < 12 ? 'AM' : 'PM'}`
                return (
                    <div key={hour} style={{
                        height: '60px',
                        width: '48px',
                        fontSize: '12px',
                        color: '#888',
                    }}>
                        {label}
                    </div>
                )
            })}
        </div>
        {Array.from({length: DAYS}, (_, i) => (
            <div key={i} style={{flex: 1}}>
                <div style={{height: '24px'}}/>
                {HOURS.map(hour => <HourSkeleton key={hour}/>)}
            </div>
        ))}
    </div>
)
