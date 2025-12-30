function PrescriptionForm({ onSuccess }) {
    const [formData, setFormData] = React.useState({
        patientName: '',
        age: '',
        problem: '',
        urgency: 'Low'
    });
    const [protocols, setProtocols] = React.useState([]);
    const [isThinking, setIsThinking] = React.useState(false);
    const { isListening, transcript, startListening } = window.useVoiceInput();

    // Effect for Voice Input
    React.useEffect(() => {
        if (transcript) {
            if (!formData.problem) {
                setFormData(prev => ({ ...prev, problem: transcript }));
            }
        }
    }, [transcript]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProtocolChange = (index, field, value) => {
        const newProtocols = [...protocols];
        newProtocols[index][field] = value;
        setProtocols(newProtocols);
    };

    const addProtocol = () => {
        setProtocols([...protocols, { name: '', freq: '', duration: '', notes: '' }]);
    };

    const removeProtocol = (index) => {
        const newProtocols = [...protocols];
        newProtocols.splice(index, 1);
        setProtocols(newProtocols);
    };

    const handleAIGenerate = async () => {
        if (!formData.problem) {
            alert("Please enter a Health Problem first.");
            return;
        }

        setIsThinking(true);
        if(window.SoundFX) window.SoundFX.playBleep();

        setTimeout(() => {
            const problems = window.supabase.getCommonProblems();
            const lowerInput = formData.problem.toLowerCase();
            
            const match = problems.find(p => lowerInput.includes(p.name.toLowerCase()) || p.name.toLowerCase().includes(lowerInput));

            if (match) {
                setFormData(prev => ({ ...prev, urgency: match.urgency }));
                setProtocols(match.protocols.map(p => ({ ...p }))); // Deep copy
            } else {
                setFormData(prev => ({ ...prev, urgency: "Low" }));
                setProtocols([
                    { name: "General Wellness Tabs", freq: "1-0-0", duration: "5 days", notes: "Take with water" },
                    { name: "Consult Specialist", freq: "-", duration: "-", notes: "Referral needed" }
                ]);
            }
            setIsThinking(false);
            if(window.SoundFX) window.SoundFX.playSuccess();
        }, 800);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Critical Check
        const allMeds = protocols.map(p => p.name.toLowerCase()).join(' ');
        if (allMeds.includes('warfarin') && allMeds.includes('aspirin')) {
            alert("CRITICAL INTERACTION BLOCKED: Warfarin + Aspirin");
            if(window.SoundFX) window.SoundFX.playAlert();
            return;
        }

        const payload = {
            patient: formData.patientName,
            age: formData.age,
            problem: formData.problem,
            protocols: protocols,
            urgency: formData.urgency,
            status: 'Active'
        };

        await window.supabase.from('patients').insert(payload);
        
        // Reset
        setFormData({ patientName: '', age: '', problem: '', urgency: 'Low' });
        setProtocols([]);
        onSuccess(payload);
    };

    return (
        <Card className="h-full border-none shadow-neo bg-[#f0f2f5]" variant="neo">
            <CardHeader>
                <CardTitle>
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <div className="icon-sparkles"></div>
                    </div>
                    AI Treatment Planner
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Patient Name</label>
                            <input 
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                className="w-full bg-white border-none rounded-xl p-3 text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-sans"
                                placeholder="e.g. John Doe"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Age</label>
                            <input 
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full bg-white border-none rounded-xl p-3 text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-sans"
                                placeholder="e.g. 34"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Diagnosis</label>
                            <button 
                                type="button" 
                                onClick={handleAIGenerate}
                                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 bg-primary-50 px-3 py-1 rounded-full transition-colors shadow-sm"
                            >
                                {isThinking ? <span className="animate-spin icon-loader"></span> : <div className="icon-wand"></div>}
                                {isThinking ? 'Analyzing...' : 'AI Suggest Protocols'}
                            </button>
                        </div>
                        <input 
                            name="problem"
                            value={formData.problem}
                            onChange={handleChange}
                            className="w-full bg-white border-none rounded-xl p-3 text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all font-sans"
                            placeholder="e.g. Fever, Flu..."
                            required
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Treatment Protocols</label>
                            <Badge variant={formData.urgency === 'Critical' || formData.urgency === 'High' ? 'critical' : 'default'}>
                                {formData.urgency} Urgency
                            </Badge>
                        </div>
                        
                        <div className="space-y-3">
                            {protocols.map((p, idx) => (
                                <div key={idx} className="bg-white/60 p-3 rounded-xl border border-white shadow-sm flex flex-col md:flex-row gap-3 items-start md:items-center">
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-3 w-full">
                                        <div className="md:col-span-4">
                                            <input 
                                                placeholder="Protocol Name"
                                                value={p.name}
                                                onChange={(e) => handleProtocolChange(idx, 'name', e.target.value)}
                                                className="w-full bg-transparent border-b border-slate-200 p-1 text-sm font-medium focus:outline-none focus:border-primary-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <input 
                                                placeholder="Freq (1-1-1)"
                                                value={p.freq}
                                                onChange={(e) => handleProtocolChange(idx, 'freq', e.target.value)}
                                                className="w-full bg-transparent border-b border-slate-200 p-1 text-sm focus:outline-none focus:border-primary-500"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <input 
                                                placeholder="Duration"
                                                value={p.duration}
                                                onChange={(e) => handleProtocolChange(idx, 'duration', e.target.value)}
                                                className="w-full bg-transparent border-b border-slate-200 p-1 text-sm focus:outline-none focus:border-primary-500"
                                            />
                                        </div>
                                        <div className="md:col-span-4">
                                            <input 
                                                placeholder="Notes"
                                                value={p.notes}
                                                onChange={(e) => handleProtocolChange(idx, 'notes', e.target.value)}
                                                className="w-full bg-transparent border-b border-slate-200 p-1 text-sm text-slate-500 focus:outline-none focus:border-primary-500"
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => removeProtocol(idx)}
                                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <div className="icon-trash-2 w-4 h-4"></div>
                                    </button>
                                </div>
                            ))}
                            
                            <button 
                                type="button"
                                onClick={addProtocol}
                                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
                            >
                                <div className="icon-plus"></div>
                                Add Protocol
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                         <button 
                            type="button"
                            onClick={startListening}
                            className={`text-sm font-bold flex items-center gap-2 px-4 py-2 rounded-full transition-all
                                ${isListening 
                                    ? 'bg-red-100 text-red-600 animate-pulse' 
                                    : 'bg-white text-slate-500 hover:text-slate-700 shadow-sm'}`}
                        >
                            <div className={`icon-mic ${isListening ? 'fill-current' : ''}`}></div>
                        </button>
                        
                        <Button type="submit" className="shadow-lg px-8 w-full md:w-auto">
                            Transmit Prescription
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

window.PrescriptionForm = PrescriptionForm;