type HourProps = {
    available: boolean
    label?: string
}

export const Hour = ({available, label}: HourProps) => (
    <div className="h-[60px] border-b relative" style={{borderColor: 'var(--border)'}}>
        {!available && (
            <div
                className="absolute inset-x-1 inset-y-1 rounded flex items-center px-2 overflow-hidden"
                style={{
                    background: 'var(--accent-bg)',
                    borderLeft: '3px solid var(--accent)',
                }}
            >
                <span className="text-xs font-medium truncate" style={{color: 'var(--accent)'}}>
                    {label}
                </span>
            </div>
        )}
    </div>
)
