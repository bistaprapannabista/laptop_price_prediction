const Card = (props: { children: JSX.Element }) => {
    return (
        <div style={{ background: "white", borderRadius: "10px", width: "100%", margin: "10px", padding: "10px" }}>{props.children}</div>
    )
}

export default Card