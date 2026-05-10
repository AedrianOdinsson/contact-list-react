import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Layout() {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}
