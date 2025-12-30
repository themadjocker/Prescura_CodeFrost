import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { supabase, getCommonProblems } from "../../lib/supabaseClient.js";
import { SoundFX } from "../../lib/soundFx.js";

export function HistoryList() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchRealPatients = async () => {
      const { data } = await supabase.from("patients").select();
      if (data) {
        const formatted = data.map((d) => ({ ...d, status: "Admitted" }));
        setHistory(formatted.slice(0, 5));
      }
    };
    fetchRealPatients();
  }, []);

  useEffect(() => {
    const commonProblems = getCommonProblems();
    const names = [
      "Alex",
      "Jordan",
      "Taylor",
      "Morgan",
      "Casey",
      "Riley",
      "Jamie",
      "Quinn",
      "Avery",
      "Parker"
    ];

    const interval = setInterval(() => {
      const scenario = commonProblems[Math.floor(Math.random() * commonProblems.length)];
      const randomName =
        names[Math.floor(Math.random() * names.length)] +
        " " +
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
        ".";

      const newEvent = {
        id: Date.now(),
        patient: randomName,
        problem: scenario.name,
        urgency: scenario.urgency,
        status: "Triaging...",
        created_at: new Date().toISOString(),
        isNew: true
      };

      setHistory((prev) => [newEvent, ...prev].slice(0, 8));

      if (scenario.urgency === "High" || scenario.urgency === "Critical") {
        SoundFX.playAlert();
      } else {
        SoundFX.playBleep();
      }

      setTimeout(() => {
        setHistory((prev) =>
          prev.map((h) => (h.id === newEvent.id ? { ...h, isNew: false } : h))
        );
      }, 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (u) => {
    switch (u?.toLowerCase()) {
      case "critical":
        return "text-red-600 bg-red-50 border-red-100";
      case "high":
        return "text-orange-600 bg-orange-50 border-orange-100";
      default:
        return "text-slate-600 bg-slate-50 border-slate-100";
    }
  };

  return (
    <Card className="h-full min-h-[400px]">
      <CardHeader className="flex justify-between items-center bg-white/40">
        <CardTitle>
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <div className="icon-activity"></div>
          </div>
          Live Triage Feed
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase">Online</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {history.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-2xl transition-all duration-500 border ${
                item.isNew
                  ? "bg-blue-50 border-blue-200 shadow-md translate-x-1"
                  : "bg-white/60 border-white/60 hover:bg-white"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.urgency === "High" || item.urgency === "Critical"
                        ? "bg-red-500 animate-pulse"
                        : "bg-slate-300"
                    }`}
                  ></div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">{item.patient}</div>
                    <div className="text-xs text-slate-500">
                      {item.problem || "Check-in"}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-[10px] font-bold px-2 py-1 rounded border ${getStatusColor(
                    item.urgency
                  )}`}
                >
                  {item.urgency?.toUpperCase() || "NORMAL"}
                </div>
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <div className="text-center text-slate-400 text-sm py-4">
              Waiting for incoming signals...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


