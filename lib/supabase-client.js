// Mock Supabase Client for Demo/Hackathon
const MOCK_DELAY = 600;

const COMMON_HEALTH_PROBLEMS = [
    { 
        name: "Common Cold", 
        urgency: "Low",
        protocols: [
            { name: "Paracetamol 500mg", freq: "1-0-1", duration: "3 days", notes: "After food" },
            { name: "Cetirizine 10mg", freq: "0-0-1", duration: "5 days", notes: "At night" },
            { name: "Vitamin C", freq: "1-0-0", duration: "10 days", notes: "Morning" }
        ]
    },
    { 
        name: "Flu (Influenza)", 
        urgency: "Medium",
        protocols: [
            { name: "Oseltamivir 75mg", freq: "1-0-1", duration: "5 days", notes: "Start within 48h" },
            { name: "Ibuprofen 400mg", freq: "1-1-1", duration: "3 days", notes: "For body pain" },
            { name: "Hydration Therapy", freq: "As needed", duration: "5 days", notes: "Drink 3L water daily" }
        ]
    },
    { 
        name: "Hypertension", 
        urgency: "High",
        protocols: [
            { name: "Amlodipine 5mg", freq: "1-0-0", duration: "30 days", notes: "Monitor BP daily" },
            { name: "Lisinopril 10mg", freq: "0-0-1", duration: "30 days", notes: "Check potassium levels" }
        ]
    },
    { 
        name: "Type 2 Diabetes", 
        urgency: "High",
        protocols: [
            { name: "Metformin 500mg", freq: "1-0-1", duration: "Ongoing", notes: "With meals" },
            { name: "Glipizide 5mg", freq: "1-0-0", duration: "Ongoing", notes: "30 min before breakfast" }
        ]
    },
    { 
        name: "Migraine", 
        urgency: "Medium",
        protocols: [
            { name: "Sumatriptan 50mg", freq: "SOS", duration: "N/A", notes: "At onset of headache" },
            { name: "Naproxen 500mg", freq: "1-0-1", duration: "3 days", notes: "With food" }
        ]
    },
    { 
        name: "Bacterial Infection", 
        urgency: "Medium",
        protocols: [
            { name: "Amoxicillin 500mg", freq: "1-1-1", duration: "7 days", notes: "Complete full course" },
            { name: "Probiotic", freq: "1-0-1", duration: "10 days", notes: "To restore gut flora" }
        ]
    },
    { 
        name: "Acid Reflux (GERD)", 
        urgency: "Low",
        protocols: [
            { name: "Omeprazole 20mg", freq: "1-0-0", duration: "14 days", notes: "Empty stomach morning" },
            { name: "Antacid Gel", freq: "SOS", duration: "As needed", notes: "For immediate relief" }
        ]
    },
    { 
        name: "Allergic Reaction", 
        urgency: "High",
        protocols: [
            { name: "Diphenhydramine 25mg", freq: "1-1-1", duration: "3 days", notes: "May cause drowsiness" },
            { name: "Prednisone 20mg", freq: "1-0-0", duration: "3 days", notes: "Morning only" }
        ]
    },
     { 
        name: "Chest Pain (Angina)", 
        urgency: "Critical",
        protocols: [
            { name: "Nitroglycerin SL", freq: "SOS", duration: "Stat", notes: "Under tongue" },
            { name: "Aspirin 325mg", freq: "Once", duration: "Stat", notes: "Chew immediately" }
        ]
    }
];

// In-memory storage for the session
let MOCK_PATIENTS_DB = [
    { 
        id: 101, 
        patient: "Steve Rogers", 
        problem: "Fatigue", 
        protocols: [{ name: "Vitamin Complex", freq: "1-0-0", duration: "30 days", notes: "Daily" }],
        urgency: "Low", 
        created_at: new Date(Date.now() - 10000000).toISOString() 
    },
    { 
        id: 102, 
        patient: "Bruce Banner", 
        problem: "Anger Management", 
        protocols: [{ name: "Sedatives", freq: "SOS", duration: "Ongoing", notes: "When heart rate > 120" }],
        urgency: "High", 
        created_at: new Date(Date.now() - 5000000).toISOString() 
    }
];

const MockSupabase = {
    auth: {
        signInWithPassword: async ({ email, password }) => {
            await new Promise(r => setTimeout(r, MOCK_DELAY));
            return { 
                data: { user: { id: 'demo-user-001', email: 'tony@stark.com' } }, 
                error: null 
            };
        },
        getUser: async () => {
             return { 
                data: { user: { id: 'demo-user-001', email: 'tony@stark.com' } }, 
                error: null 
            };
        }
    },
    from: (table) => {
        return {
            select: async () => {
                await new Promise(r => setTimeout(r, MOCK_DELAY));
                
                if (table === 'health_problems') {
                    return { data: COMMON_HEALTH_PROBLEMS, error: null };
                }
                
                if (table === 'patients') {
                    return {
                        data: [...MOCK_PATIENTS_DB].sort((a,b) => new Date(b.created_at) - new Date(a.created_at)),
                        error: null
                    };
                }
                
                return { data: [], error: null };
            },
            insert: async (data) => {
                await new Promise(r => setTimeout(r, MOCK_DELAY));
                console.log(`[MOCK DB] Inserted into ${table}:`, data);
                
                if (table === 'patients') {
                    const newRecord = { ...data, id: Date.now(), created_at: new Date().toISOString() };
                    MOCK_PATIENTS_DB.push(newRecord);
                    return { data: [newRecord], error: null };
                }
                
                return { data: [data], error: null };
            }
        };
    },
    getCommonProblems: () => COMMON_HEALTH_PROBLEMS,
    channel: (name) => null
};

window.supabase = MockSupabase;