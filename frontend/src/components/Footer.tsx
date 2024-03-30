export const Footer = () => {
    return (
        <div style={{
            position: 'fixed',
            left: 0,
            bottom: 0,
            width: '100%',
            backgroundColor: '#23282d',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.5,
            fontSize: '16px',
        }}
        >
            <div style={{ display: "flex", justifyContent: "space-around" }}>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Anjala Bhatta</span>
                    <span>23118</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Mahesh Chandra Regmi</span>
                    <span>23153</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Prapanna Bista</span>
                    <span>23173</span>
                </div>

            </div>
        </div>
    )
}
