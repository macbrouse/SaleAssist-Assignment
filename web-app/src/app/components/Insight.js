import React, { useState, useEffect } from 'react';


const Insight = () => {
    const [hitCount, setHitCount] = useState(0); 
    const [hitTiming, setHitTiming] = useState([]); 
    const [aiInsight, setAiInsight] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [dataLoading, setDataLoading] = useState(true)

    const apiKey=process.env.API

    const fetchApiData = async () => {
        try {
            const apiUrl = process.dotenv.APIURL||`http://localhost:8000/api/stats`
            const response = await fetch(`${apiUrl}`); 
            const data = await response.json();
            const hitData = data[0]; 
            setHitCount(hitData.hitCount);
            setHitTiming(hitData.hitTiming);
            setDataLoading(false); 
        } catch (error) {
            console.error('Error fetching API data:', error);
            setDataLoading(false);
        }
    }

    const insightReq = async () => {
        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": `Generate an insight from given peak usage time from my API data if ${hitCount} is the number of hits and ${hitTiming} is the time at the API is hit`
                        }]
                    }]
                }),
            });

            const data = await response.json();
            setAiInsight(data); 
            setLoading(false);
        } catch (error) {
            console.error('Error fetching AI insight:', error);
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchApiData(); 
    }, []);

    useEffect(() => {
        insightReq();
    }, [dataLoading, hitCount, hitTiming]);

    return (
        <div>
            {loading ? (<div>Generating...</div>) : aiInsight ? 
            (<div>
                <h2>Generated Insight:</h2>
                <p>{aiInsight.candidates[0].content.parts[0].text}</p>
            </div>) 
            :
            (<div>No insight generated</div>
            )}
        </div>
    );
};

export default Insight;
