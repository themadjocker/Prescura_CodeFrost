import { useState } from "react";

export function AboutPage({ onBack }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* Header/Navigation */}
          <header className="px-6 lg:px-12 py-6 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#5D5FEF] rounded-full flex items-center justify-center shadow-md">
                <div className="icon-sparkles text-white text-xl"></div>
              </div>
              <span className="text-2xl font-bold text-[#1F2937]">CarePath</span>
            </div>

            {/* Back Button */}
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 bg-[#1F2937] text-white rounded-full font-medium flex items-center gap-2 hover:bg-[#374151] transition-colors text-sm"
            >
              <div className="icon-arrow-left"></div>
              Back to Home
            </button>
          </header>

          {/* About Section */}
          <section className="px-6 lg:px-12 pb-12 pt-2 bg-white/80">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-2xl font-bold text-[#1F2937]">About CarePath</h2>
              <p className="text-[#6B7280] leading-relaxed">
                CarePath is a unified interface for doctors and pharmacists to collaborate
                around every patient journey. Doctors can craft clear, structured treatment
                plans, while pharmacists see the same information in a streamlined,
                medication-first view—reducing errors and making every handoff safer.
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                Behind the scenes, CarePath keeps a live record of active prescriptions,
                protocols, and risk checks, so every new decision is made with full
                context. Patients experience faster visits, clearer instructions, and a
                care team that always feels in sync.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
