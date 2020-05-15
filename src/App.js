import React from 'react';
import Switch from './switch';
import './App.scss';
import './switch.scss';

function App() {
    const [switchState, setSwitchState] = React.useState(false);
    const handleTriggerClick = () => {
        setSwitchState(!switchState);
    };

    return (
        <div className="App">
            <div className="switch-demo">
                <Switch state={switchState} title="Perturbed" triggerHandler={handleTriggerClick} options={{ width: 96, height: 44 }} />
            </div>
        </div>
    );
}

export default App;
