import { useEffect, useRef } from "react";
import { Button } from "../ui/Button.jsx";
import { SoundFX } from "../../lib/soundFx.js";

export function SuccessModal({ isOpen, onClose, data }) {
  const qrRef = useRef(null);

  useEffect(() => {
    if (isOpen && data && qrRef.current && window.QRCode) {
      qrRef.current.innerHTML = "";
      try {
        const qrData = {
          p: data.patient,
          d: data.problem,
          id: Math.random().toString(36).substring(7)
        };
        new window.QRCode(qrRef.current, {
          text: JSON.stringify(qrData),
          width: 128,
          height: 128,
          colorDark: "#1e293b",
          colorLight: "#ffffff",
          correctLevel: window.QRCode.CorrectLevel.H
        });
      } catch (e) {
        console.error("QR Gen Error", e);
      }

      SoundFX.playSuccess();
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const medsList = data?.protocols
    ? data.protocols.map((p) => p.name).join(", ")
    : "Check Details";
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Rx for ${data?.patient}: ${medsList}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative glass-panel w-full max-w-md p-0 animate-[slideUp_0.4s_ease-out] shadow-2xl overflow-hidden">
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>

        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 flex justify-between items-center text-white">
          <h3 className="text-xl font-heading font-bold flex items-center gap-2">
            <div className="icon-circle-check"></div>
            Transmission Success
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
          >
            <div className="icon-x text-2xl"></div>
          </button>
        </div>

        <div className="p-8 flex flex-col items-center gap-6 bg-white/80">
          <div className="p-4 bg-white rounded-2xl shadow-lg border border-slate-100">
            <div ref={qrRef} id="qrcode"></div>
          </div>

          <div className="text-center space-y-1">
            <h4 className="text-lg font-bold text-slate-800">{data?.patient}</h4>
            <p className="text-sm text-slate-500">
              ID: {Math.random().toString(36).substring(7).toUpperCase()}
            </p>
          </div>

          <div className="flex gap-4 w-full">
            <a href={shareUrl} target="_blank" rel="noreferrer" className="flex-1">
              <Button className="w-full flex items-center justify-center gap-2 shadow-lg">
                <div className="icon-share-2"></div>
                Share Rx
              </Button>
            </a>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


