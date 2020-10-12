import React from 'react';
import BooleanSwitch from './switch';
import './App.scss';

function App() {
    const [twoSwitchState, setTwoSwitchState] = React.useState(false);
    const handleTriggerClick = () => {
        setTwoSwitchState(!twoSwitchState);
    };

    return (
        <div className="App">
            <div className="switch-demo-1">
                <BooleanSwitch state={twoSwitchState} title="Plugged" triggerHandler={handleTriggerClick} />
            </div>
        </div>
    );
}

export default App;
