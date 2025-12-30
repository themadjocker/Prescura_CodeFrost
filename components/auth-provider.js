const AuthContext = React.createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const initAuth = async () => {
            // Auto login for demo
            const { data } = await window.supabase.auth.signInWithPassword({
                email: 'demo@stark.com',
                password: 'demo'
            });
            setUser(data.user);
            setLoading(false);
        };
        initAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

window.AuthProvider = AuthProvider;
window.useAuth = () => React.useContext(AuthContext);