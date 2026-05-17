import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR (we'll upgrade later) */}
      <div className="w-64 bg-white shadow-lg p-5 hidden md:block">
        <h1 className="text-xl font-semibold text-indigo-600 mb-8">
          StudyFlow
        </h1>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="flex-1 p-6 overflow-y-auto">
          {children}
        </div>

        <Footer />

      </div>
    </div>
  );
}