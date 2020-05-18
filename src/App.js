import React from 'react';
import * as Switch from './switch';
import './App.scss';
import './switch.scss';

function App() {
    const [twoSwitchState, setTwoSwitchState] = React.useState(false);
    const [triSwitchState, setTriSwitchState] = React.useState(1);
    const handleTriggerClick = () => {
        setTwoSwitchState(!twoSwitchState);
    };

    const handleTriTriggerClick = (newSwitchState) => {
        setTriSwitchState(newSwitchState);
    }

    return (
        <div className="App">
            <div className="switch-demo-1">
                <Switch.TwoState state={twoSwitchState} title="Perturbed" triggerHandler={handleTriggerClick} />
                <Switch.TriState state={triSwitchState} title="Perturbed" name="perturbed" triggerHandler={handleTriTriggerClick} />
            </div>
        </div>
    );
}

export default App;
