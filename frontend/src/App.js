import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Views from './Views';
import Navbar from './pages/shared/Navbar';
import SoundController from './pages/Components/SoundController';

import Sound from 'react-sound';
 

const App = () => {
    const [showSound, setShowSound] = useState(false);
    const [volume, setVolume] = useState(50);
    const [playSound, ] = useState(true);

    // sound controller
    useEffect(() => {
        let timeoutId;
    
        const handleKeyDown = (event) => {
            if (event.key === '+' || event.key === '-') {
                setShowSound(true);
    
                // Clear any existing timeout
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
    
                // Set a new timeout
                timeoutId = setTimeout(() => {
                    setShowSound(false);
                }, 2000);
            }
        };
    
        document.addEventListener('keydown', handleKeyDown);
    
        // Cleanup the event listener and clear timeout when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, []);
    
    console.clear();

    return(
        <Router>
        <div className='dashboard-container row'>
                <div className={`sound-box ${showSound ? "active" : ""}`} >
                    <SoundController maxVolume={100} minVolume={0} onVolumeChange={setVolume} />
                </div>
                <Sound
                    url="https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg"
                    playStatus={playSound ? Sound.status.PLAYING : Sound.status.PAUSED}
                    volume={volume}
                />
                <Navbar />
                <Views />
        </div>
        </Router>
    )
}

export default App;