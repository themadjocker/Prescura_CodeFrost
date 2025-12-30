import React, { Component, useState } from "react";
import { AuthProvider } from "./components/auth/AuthProvider.jsx";
import { Heartbeat } from "./components/ui/Heartbeat.jsx";
import { CarePathLanding } from "./components/landing/CarePathLanding.jsx";
import { AboutPage } from "./components/landing/AboutPage.jsx";
import { ContactPage } from "./components/landing/ContactPage.jsx";
import { HistoryList } from "./components/dashboard/HistoryList.jsx";
import { PatientList } from "./components/dashboard/PatientList.jsx";
import { PrescriptionForm } from "./components/dashboard/PrescriptionForm.jsx";
import { SuccessModal } from "./components/dashboard/SuccessModal.jsx";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-triangle-alert text-3xl"></div>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">System Error</h1>
            <p className="text-slate-500 mb-6">
              The system encountered an unexpected error.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn-primary w-full"
            >
              Reboot
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] relative overflow-hidden">
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function Navbar({ onViewChange, currentView, role, onLogout }) {
  const isDoctor = role === "doctor";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onViewChange(isDoctor ? "dashboard" : "patients")}
        >
          <div className="w-10 h-10 bg-[#5D5FEF] rounded-full flex items-center justify-center text-white shadow-lg">
            <div className="icon-sparkles"></div>
          </div>
          <span className="text-xl font-heading font-bold text-slate-800 tracking-tight">
            CarePath
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {isDoctor ? (
            <>
              <button
                type="button"
                onClick={() => onViewChange("dashboard")}
                className={`nav-link ${
                  currentView === "dashboard" ? "text-slate-900 font-bold" : ""
                }`}
              >
                Doctor Terminal
              </button>
              <button
                type="button"
                onClick={() => onViewChange("patients")}
                className={`nav-link ${
                  currentView === "patients" ? "text-slate-900 font-bold" : ""
                }`}
              >
                History
              </button>
            </>
          ) : (
            <button type="button" className="text-slate-900 font-bold nav-link">
              Pharmacist Database View
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-200">
            <div className="text-right">
              <div className="text-sm font-bold text-slate-800">
                {isDoctor ? "Dr. Anjali Sharma" : "Rajesh Kumar"}
              </div>
              <div className="text-xs text-slate-500">
                {isDoctor ? "Chief Medical Officer" : "Senior Pharmacist"}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${
                  isDoctor ? "Anjali" : "Rajesh"
                }`}
                alt="Avatar"
                className="w-full h-full"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <div className="icon-log-out"></div>
          </button>
        </div>
      </div>
    </nav>
  );
}

function RoleSelection({ onSelect, onNavigateToAbout, onNavigateToContact }) {
  return <CarePathLanding onSelect={onSelect} onNavigateToAbout={onNavigateToAbout} onNavigateToContact={onNavigateToContact} />;
}

function Dashboard() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastSubmission, setLastSubmission] = useState(null);

  const handleSuccess = (data) => {
    setLastSubmission(data);
    setShowSuccess(true);
  };

  return (
    <div className="pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-800">
            Doctor Terminal
          </h2>
          <p className="text-slate-500 mt-1">Diagnosis &amp; Treatment Protocol System</p>
        </div>
        <div className="flex gap-3">
          <Heartbeat />
          <button
            type="button"
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary-600 transition-colors"
          >
            <div className="icon-bell"></div>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <PrescriptionForm onSuccess={handleSuccess} />
        </div>

        <div className="lg:col-span-4 space-y-8">
          <HistoryList />

          <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl">
            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-2">Hospital Capacity</h4>
              <div className="w-full bg-blue-900/30 rounded-full h-2 mb-2">
                <div className="bg-white h-2 rounded-full w-[75%]"></div>
              </div>
              <p className="text-white/80 text-sm">
                75% Occupancy - 12 Beds Available
              </p>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        data={lastSubmission}
      />
    </div>
  );
}

function PatientsView() {
  return (
    <div className="pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
      <header className="mb-8">
        <h2 className="text-3xl font-heading font-bold text-slate-800">
          Patient Database
        </h2>
        <p className="text-slate-500 mt-1">Secure Records &amp; Medication History</p>
      </header>
      <PatientList />
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("role-selection");
  const [role, setRole] = useState(null);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === "doctor") {
      setPage("dashboard");
    } else {
      setPage("patients");
    }
  };

  const handleNavigateToAbout = () => {
    setPage("about");
  };

  const handleNavigateToContact = () => {
    setPage("contact");
  };

  const handleBackToHome = () => {
    setPage("role-selection");
  };

  const handleLogout = () => {
    setRole(null);
    setPage("role-selection");
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Layout>
          {role && (
            <Navbar
              onViewChange={setPage}
              currentView={page}
              role={role}
              onLogout={handleLogout}
            />
          )}

          {page === "role-selection" && <RoleSelection onSelect={handleRoleSelect} onNavigateToAbout={handleNavigateToAbout} onNavigateToContact={handleNavigateToContact} />}
          {page === "about" && <AboutPage onBack={handleBackToHome} />}
          {page === "contact" && <ContactPage onBack={handleBackToHome} />}
          {page === "dashboard" && role === "doctor" && <Dashboard />}
          {page === "patients" && (role === "doctor" || role === "pharmacist") && (
            <PatientsView />
          )}
        </Layout>
      </AuthProvider>
    </ErrorBoundary>
  );
}


