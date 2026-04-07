export const HourSkeleton = () => (
    <div style={{height: '60px', borderBottom: '1px solid gray', width: '100%', display: 'flex', alignItems: 'center', padding: '0 8px'}}>
        <div style={{
            height: '16px',
            width: '60%',
            borderRadius: '4px',
            background: 'linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)',
            backgroundSize: '200% 100%',
            animation: 'skeleton-shimmer 1.4s infinite',
        }}/>
        <style>{`
            @keyframes skeleton-shimmer {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `}</style>
    </div>
)
