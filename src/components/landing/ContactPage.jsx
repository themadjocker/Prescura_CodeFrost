import { useState } from "react";

export function ContactPage({ onBack }) {
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

          {/* Contact Section */}
          <section className="px-6 lg:px-12 pb-12 pt-10 bg-[#F9FAFB]">
            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#1F2937]">Contact Us</h2>
                <p className="text-[#6B7280] leading-relaxed">
                  Have questions about CarePath or want to see a demo? Leave your details
                  and our team will reach out with more information.
                </p>
                <div className="space-y-2 text-sm text-[#6B7280]">
                  <p>
                    <span className="font-semibold text-[#1F2937]">Email:</span>{" "}
                    support@carepath.health
                  </p>
                  <p>
                    <span className="font-semibold text-[#1F2937]">Phone:</span> +1 (555)
                    012-3456
                  </p>
                </div>
              </div>

              <form className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#374151]">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/40 focus:border-[#5D5FEF]"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#374151]">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/40 focus:border-[#5D5FEF]"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-[#374151]">Message</label>
                  <textarea
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5D5FEF]/40 focus:border-[#5D5FEF] resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="button"
                  className="w-full md:w-auto px-6 py-3 bg-[#5D5FEF] text-white rounded-full font-semibold hover:bg-[#4F51E0] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
