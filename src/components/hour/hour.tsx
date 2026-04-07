type HourProps = {
    available: boolean
    label?: string
}

export const Hour = ({available, label}: HourProps) => (
    <div className={`h-[60px] border-b border-r border-white w-full ${available ? 'bg-gray-400' : 'bg-blue-500'}`}>
        {label}
    </div>
)
