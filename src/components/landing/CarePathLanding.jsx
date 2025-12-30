import { useState } from "react";
import { DNAHelix } from "./DNAHelix.jsx";

export function CarePathLanding({ onSelect, onNavigateToAbout, onNavigateToContact }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header/Navigation */}
          <header className="px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#5D5FEF] rounded-full flex items-center justify-center shadow-md">
                <div className="icon-sparkles text-white text-xl"></div>
              </div>
              <span className="text-2xl font-bold text-[#1F2937]">CarePath</span>
            </div>

            {/* Navigation */}
            <nav className="relative flex items-center gap-2 bg-[#F3F4F6] rounded-full px-2 py-1">
              <button
                type="button"
                onClick={() => scrollTo("hero")}
                className="px-4 py-2 rounded-full bg-white text-[#1F2937] font-medium shadow-sm text-sm"
              >
                Home
              </button>
              <button
                type="button"
                onClick={onNavigateToAbout}
                className="px-4 py-2 rounded-full text-[#6B7280] hover:text-[#1F2937] font-medium text-sm transition-colors"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => setServicesOpen((v) => !v)}
                onBlur={() => setTimeout(() => setServicesOpen(false), 150)}
                className="relative px-4 py-2 rounded-full text-[#6B7280] hover:text-[#1F2937] font-medium text-sm transition-colors flex items-center gap-1 focus:outline-none"
              >
                Services
                <div className="icon-chevron-down text-xs"></div>

                {servicesOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 w-40 text-left z-30">
                    <button
                      type="button"
                      onClick={() => {
                        setServicesOpen(false);
                        onSelect("doctor");
                      }}
                      className="w-full px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F3F4F6] flex items-center justify-between"
                    >
                      Doctor
                      <span className="text-[10px] uppercase text-[#6B7280]">Clinical</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setServicesOpen(false);
                        onSelect("pharmacist");
                      }}
                      className="w-full px-4 py-2 text-sm text-[#1F2937] hover:bg-[#F3F4F6] flex items-center justify-between"
                    >
                      Pharmacist
                      <span className="text-[10px] uppercase text-[#6B7280]">Dispensing</span>
                    </button>
                  </div>
                )}
              </button>
              <button
                type="button"
                className="px-4 py-2 rounded-full text-[#6B7280] hover:text-[#1F2937] font-medium text-sm transition-colors"
              >
                Blog
              </button>
            </nav>

            {/* Contact Button */}
            <button
              type="button"
              onClick={onNavigateToContact}
              className="px-6 py-3 bg-[#1F2937] text-white rounded-full font-medium flex items-center gap-2 hover:bg-[#374151] transition-colors text-sm"
            >
              Contact Us
              <div className="icon-arrow-right"></div>
            </button>
          </header>

          {/* Hero Section */}
          <section
            id="hero"
            className="relative px-6 lg:px-12 py-16 lg:py-24 overflow-hidden"
          >
            {/* Background "Health" Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[200px] lg:text-[300px] font-bold text-[#F3F4F6] select-none leading-none">
                Health
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text & Actions */}
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1F2937] leading-tight">
                  Your Journey to Better Health Starts Here
                </h1>
                <p className="text-lg text-[#6B7280] leading-relaxed max-w-xl">
                  Access expert doctors, modern facilities, and compassionate care — all
                  designed to keep you and your family healthy, every step of the way.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={() => onSelect("doctor")}
                    className="px-8 py-4 bg-[#5D5FEF] text-white rounded-full font-semibold hover:bg-[#4F51E0] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    Book Appointment
                    <div className="icon-calendar"></div>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelect("pharmacist")}
                    className="px-8 py-4 bg-transparent border-2 border-[#5D5FEF] text-[#5D5FEF] rounded-full font-semibold hover:bg-[#5D5FEF]/10 transition-all flex items-center justify-center gap-2"
                  >
                    Find a Doctor
                    <div className="icon-search"></div>
                  </button>
                </div>
              </div>

              {/* Right Column - DNA Graphic */}
              <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-50 rounded-3xl"></div>
                <div className="relative z-10 w-full h-full">
                  <DNAHelix />
                </div>
                {/* Doctor Avatars Overlay */}
                <div className="absolute bottom-8 right-8 z-20 flex -space-x-3">
                  <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-400 to-purple-400"></div>
                  <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400"></div>
                  <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Image Gallery Section */}
          <section className="px-6 lg:px-12 py-12 pb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Image 1 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-shadow group">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                  alt="Doctor consulting older patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-medium text-white">Expert Consultation</p>
                </div>
              </div>

              {/* Image 2 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-shadow group">
                <img
                  src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80"
                  alt="Nurse holding patient's hand"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-medium text-white">Compassionate Care</p>
                </div>
              </div>

              {/* Image 3 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-shadow group">
                <img
                  src="https://images.unsplash.com/photo-1535916707207-35f97e715e1b?auto=format&fit=crop&w=800&q=80"
                  alt="Senior doctor looking to the side"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-medium text-white">Professional Service</p>
                </div>
              </div>

              {/* Image 4 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-md hover:shadow-xl transition-shadow group">
                <img
                  src="https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=800&q=80"
                  alt="Doctor talking with older patient"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm font-medium text-white">Personalized Treatment</p>
                </div>
              </div>
            </div>
          </section>


        </div>
      </div>
    </div>
  );
}

