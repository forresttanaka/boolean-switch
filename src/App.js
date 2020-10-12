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
                <BooleanSwitch
                    state={twoSwitchState}
                    title="Plugged"
                    triggerHandler={handleTriggerClick}
                    options={{ width: 80, height: 48, cssTitle: 'title-css', cssFrame: 'frame-css', cssActuator: 'actuator-css' }}
                />
            </div>
        </div>
    );
}

export default App;
