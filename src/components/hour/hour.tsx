type HourProps = {
    available: boolean
    label?: string
}

export const Hour = ({available, label}: HourProps) => {
    if (!available) {
        return <div style={{
            height: '60px',
            borderBottom: '1px solid gray',
            width: '100%',
            backgroundColor: 'blue'
        }}>{label}</div>
    }

    return (
        <div style={{height: '60px', borderBottom: '1px solid gray', width: '100%', backgroundColor: 'darkgray'}}>
            {label}
        </div>
    )
}
