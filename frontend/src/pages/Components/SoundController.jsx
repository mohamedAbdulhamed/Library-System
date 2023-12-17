import { useState, useEffect, useCallback } from 'react';
import '../style/SoundController.css';

const SoundController = (props) => {
    const maxVolume = Number(props.maxVolume) || 100;
    const minVolume = Number(props.minVolume) || 0;
    const [value, setValue] = useState(Number(maxVolume / 2));

    const increase = useCallback(() => {
        if (value < maxVolume) setValue(value + 10);
    }, [value, maxVolume]);

    const decrease = useCallback(() => {
        if (value > minVolume) setValue(value - 10);
    }, [value, minVolume]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '+') {
                increase();
            } else if (event.key === '-') {
                decrease();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [decrease, increase]);

    useEffect(() => {
        props.onVolumeChange(value);
    }, [value, props]);

    return (
        <div className='sc-box'>
            <div className="sc-spinner">
                <span className="output">{Number(value/10)}</span>
                <div className="progress">
                    <span className="meter" style={{ height: value + '%' }}></span>
                </div>
                <div className={`sc-btn plus ${value === maxVolume ? 'disabled' : ''}`} onClick={increase}>+</div>
                <div className={`sc-btn minus ${value === minVolume ? 'disabled' : ''}`} onClick={decrease}>-</div>
            </div>
        </div>
    );
};

export default SoundController;
