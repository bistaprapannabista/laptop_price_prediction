import Navbar from "./Navbar";

export const Header = () => {
    const date = new Date();
    return (
        <div style={{
            zIndex: '999',
            position: 'fixed',
            left: 0,
            top: 0,
            width: '100%',
            backgroundColor: '#23282d',
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.5,
            fontSize: '16px'
        }}
        >
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <span>BSc. CSIT</span>
                <span>Amrit Science Campus</span>
                <span>{date.toLocaleDateString()}</span>
            </div>
            <Navbar />
        </div>
    )
}