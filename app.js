// Error Boundary
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
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
                        <p className="text-slate-500 mb-6">The system encountered an unexpected error.</p>
                        <button 
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

// Main Layout
function Layout({ children }) {
    return (
        <div className="min-h-screen bg-[#f0f2f5] relative overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-300/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-float"></div>
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply animate-float" style={{animationDelay: '2s'}}></div>
            
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}

// Navbar
function Navbar({ onViewChange, currentView, role, onLogout }) {
    const isDoctor = role === 'doctor';
    
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <div className="max-w-7xl mx-auto glass-panel px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange(isDoctor ? 'dashboard' : 'patients')}>
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <div className="icon-activity"></div>
                    </div>
                    <span className="text-xl font-heading font-bold text-slate-800 tracking-tight">MediVault</span>
                </div>
                
                <div className="hidden md:flex items-center gap-8">
                    {isDoctor ? (
                        <>
                            <button onClick={() => onViewChange('dashboard')} className={`nav-link ${currentView === 'dashboard' ? 'text-slate-900 font-bold' : ''}`}>Doctor Terminal</button>
                            <button onClick={() => onViewChange('patients')} className={`nav-link ${currentView === 'patients' ? 'text-slate-900 font-bold' : ''}`}>History</button>
                        </>
                    ) : (
                         <button className="text-slate-900 font-bold nav-link">Pharmacist Database View</button>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-200">
                         <div className="text-right">
                            <div className="text-sm font-bold text-slate-800">
                                {isDoctor ? 'Dr. Anjali Sharma' : 'Rajesh Kumar'}
                            </div>
                            <div className="text-xs text-slate-500">
                                {isDoctor ? 'Chief Medical Officer' : 'Senior Pharmacist'}
                            </div>
                         </div>
                         <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                            <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${isDoctor ? 'Anjali' : 'Rajesh'}`} 
                                alt="Avatar" 
                                className="w-full h-full" 
                            />
                         </div>
                    </div>
                    <button onClick={onLogout} className="text-slate-400 hover:text-red-500 transition-colors">
                        <div className="icon-log-out"></div>
                    </button>
                </div>
            </div>
        </nav>
    );
}

// Role Selection / Landing Page
function RoleSelection({ onSelect }) {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-4xl w-full text-center space-y-12 animate-[fadeIn_0.8s_ease-out]">
                
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 tracking-tight">
                        MEDI<span className="text-primary-600">VAULT</span>
                    </h1>
                    <p className="text-slate-500 uppercase tracking-[0.2em] text-sm font-semibold">
                        Status: <span className="text-emerald-500">Operational</span> • Awaiting Role Selection
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Doctor Card */}
                    <button 
                        onClick={() => onSelect('doctor')}
                        className="group relative h-64 rounded-3xl bg-white shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-primary-500 text-left"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="p-8 h-full flex flex-col justify-end relative z-10">
                            <div className="absolute top-8 left-8 w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mb-4 shadow-sm group-hover:shadow-md transition-all">
                                <div className="icon-stethoscope text-3xl"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary-700 transition-colors">Dr. Anjali Sharma</h3>
                            <p className="text-slate-500 font-medium">Doctor Access</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                Enter Terminal <div className="icon-arrow-right"></div>
                            </div>
                        </div>
                    </button>

                    {/* Pharmacist Card */}
                    <button 
                        onClick={() => onSelect('pharmacist')}
                        className="group relative h-64 rounded-3xl bg-white shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-blue-500 text-left"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="p-8 h-full flex flex-col justify-end relative z-10">
                            <div className="absolute top-8 left-8 w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-4 shadow-sm group-hover:shadow-md transition-all">
                                <div className="icon-pill text-3xl"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 group-hover:text-blue-700 transition-colors">Rajesh Kumar</h3>
                            <p className="text-slate-500 font-medium">Pharmacist Access</p>
                            <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                                View Database <div className="icon-arrow-right"></div>
                            </div>
                        </div>
                    </button>
                </div>

                <div className="pt-12">
                     <DNAHelix />
                </div>
            </div>
        </div>
    );
}

// Dashboard Page
function Dashboard() {
    const [showSuccess, setShowSuccess] = React.useState(false);
    const [lastSubmission, setLastSubmission] = React.useState(null);

    const handleSuccess = (data) => {
        setLastSubmission(data);
        setShowSuccess(true);
    };

    return (
        <div className="pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
            
            <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-heading font-bold text-slate-800">Doctor Terminal</h2>
                    <p className="text-slate-500 mt-1">Diagnosis & Treatment Protocol System</p>
                </div>
                <div className="flex gap-3">
                    <Heartbeat />
                    <button className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-600 hover:text-primary-600 transition-colors">
                        <div className="icon-bell"></div>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Form Area */}
                <div className="lg:col-span-8 space-y-8">
                    <PrescriptionForm onSuccess={handleSuccess} />
                </div>

                {/* Sidebar Stats & Feed */}
                <div className="lg:col-span-4 space-y-8">
                    <HistoryList />
                    
                    <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-xl">
                        <div className="relative z-10">
                            <h4 className="text-lg font-bold mb-2">Hospital Capacity</h4>
                            <div className="w-full bg-blue-900/30 rounded-full h-2 mb-2">
                                <div className="bg-white h-2 rounded-full w-[75%]"></div>
                            </div>
                            <p className="text-white/80 text-sm">75% Occupancy - 12 Beds Available</p>
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

// Patient Database View
function PatientsView() {
    return (
         <div className="pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto w-full animate-[fadeIn_0.5s_ease-out]">
            <header className="mb-8">
                <h2 className="text-3xl font-heading font-bold text-slate-800">Patient Database</h2>
                <p className="text-slate-500 mt-1">Secure Records & Medication History</p>
            </header>
            <PatientList />
         </div>
    );
}

function App() {
    const [page, setPage] = React.useState('role-selection'); // Default to role selection
    const [role, setRole] = React.useState(null);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        if (selectedRole === 'doctor') {
            setPage('dashboard');
        } else {
            setPage('patients');
        }
    };

    const handleLogout = () => {
        setRole(null);
        setPage('role-selection');
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
                    
                    {page === 'role-selection' && <RoleSelection onSelect={handleRoleSelect} />}
                    {page === 'dashboard' && role === 'doctor' && <Dashboard />}
                    {page === 'patients' && (role === 'doctor' || role === 'pharmacist') && <PatientsView />}
                </Layout>
            </AuthProvider>
        </ErrorBoundary>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);