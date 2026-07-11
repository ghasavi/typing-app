import Navbar from "./Navbar";

export default function UserLayout({ children }) {
    return (
        <>
            <Navbar />
            <div
                style={{
                    padding: "35px",
                    marginTop: "75px"
                }}
            >
                {children}
            </div>
        </>
    );
}