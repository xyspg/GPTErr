import Generate from "@/pages/Generate";
import PrimaryFeatures from "@/pages/Features";
import Footer from "@/components/Footer";
import ToggleDarkModeButton from "@/components/ToggleDarkModeButton";

export default function Home() {
    return (
        <>
            <div className="flex flex-col min-h-screen bg-white dark:bg-slate-900">
                <div className="flex-grow">
                    <PrimaryFeatures />
                    <ToggleDarkModeButton />
                    <Generate />
                </div>
                <Footer />
            </div>
        </>
    );
}
