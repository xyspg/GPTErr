import Generate from "@/pages/Generate";
import PrimaryFeatures from "@/pages/Features";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <div className="flex flex-col min-h-screen dark:bg-slate-900">
                <div className="flex-grow">
                    <PrimaryFeatures />
                    <Generate />
                </div>
                <Footer />
            </div>
        </>
    );
}
