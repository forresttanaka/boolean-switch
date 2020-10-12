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
                <BooleanSwitch state={twoSwitchState} title="Plugged" triggerHandler={handleTriggerClick} options={{ height: 30, width: 58 }} />
            </div>
        </div>
    );
}

export default App;
