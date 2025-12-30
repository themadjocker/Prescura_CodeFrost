import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card.jsx";
import { supabase } from "../../lib/supabaseClient.js";

export function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data } = await supabase.from("patients").select();
      if (data) setPatients(data);
      setLoading(false);
    };
    fetchPatients();
  }, []);

  const getUrgencyColor = (u) => {
    switch (u?.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-600 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "medium":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <Card className="h-full bg-white shadow-sm border border-slate-100">
      <CardHeader className="flex justify-between items-center bg-white border-b border-slate-100">
        <CardTitle>
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            <div className="icon-users"></div>
          </div>
          Patient Database
        </CardTitle>
        <div className="text-sm text-slate-500 font-medium">
          Total Records: {patients.length}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading records...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase text-slate-500 font-semibold">
                <tr>
                  <th className="p-4 w-1/5">Patient</th>
                  <th className="p-4 w-1/5">Diagnosis</th>
                  <th className="p-4 w-2/5">Active Protocols</th>
                  <th className="p-4 w-1/5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patients.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="p-4 align-top">
                      <div className="font-bold text-slate-800">{p.patient}</div>
                      <div className="text-xs text-slate-400 font-mono mt-1">
                        {new Date(p.created_at).toLocaleDateString()}
                      </div>
                      {p.age && (
                        <div className="text-xs text-slate-500 mt-1">Age: {p.age}</div>
                      )}
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-slate-700 font-medium">
                        {p.problem || "N/A"}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="space-y-2">
                        {p.protocols && Array.isArray(p.protocols) ? (
                          p.protocols.map((m, i) => (
                            <div
                              key={i}
                              className="text-sm bg-white border border-slate-100 p-2 rounded-lg shadow-sm"
                            >
                              <div className="font-bold text-slate-700">{m.name}</div>
                              <div className="text-xs text-slate-500 flex gap-2 mt-1">
                                <span className="bg-slate-100 px-1.5 rounded">{m.freq}</span>
                                <span className="bg-slate-100 px-1.5 rounded">
                                  {m.duration}
                                </span>
                                <span className="italic">{m.notes}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <span className="text-slate-400 italic">Legacy Format</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 align-top">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold uppercase border ${getUrgencyColor(
                          p.urgency
                        )}`}
                      >
                        {p.urgency}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {patients.length === 0 && (
              <div className="p-8 text-center text-slate-400">
                No patient records found.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


