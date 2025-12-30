function useVoiceInput() {
    const [isListening, setIsListening] = React.useState(false);
    const [transcript, setTranscript] = React.useState('');
    const [confidence, setConfidence] = React.useState(0);

    const startListening = React.useCallback(() => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Voice input not supported in this browser.');
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            setIsListening(true);
            setTranscript('');
        };

        recognition.onresult = (event) => {
            const result = event.results[0];
            const text = result[0].transcript;
            setTranscript(text);
            setConfidence(result[0].confidence);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.start();
    }, []);

    const stopListening = React.useCallback(() => {
        // Logic handled by onend usually, but could force stop if reference kept
        setIsListening(false);
    }, []);

    return { isListening, transcript, confidence, startListening, stopListening };
}

window.useVoiceInput = useVoiceInput;