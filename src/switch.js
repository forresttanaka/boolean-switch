import React from 'react';
import PropTypes from 'prop-types';
import './switch.scss';


const DEFAULT_SWITCH_HEIGHT = 22;

/**
 * Renders a boolean switch in the style of iOS. This keeps no internal state -- the state of the
 * switch is kept by the parent component which passes it down.
 */
const DEFAULT_TWOSTATE_WIDTH = DEFAULT_SWITCH_HEIGHT * 1.6;
const DEFAULT_TWOSTATE_HEIGHT = DEFAULT_SWITCH_HEIGHT;
export const BooleanSwitch = ({ state, title, triggerHandler, options: { width, height, cssTitle, cssFrame, cssActuator } }) => {
    // True if checkbox input has focus.
    const [focused, setFocused] = React.useState(false);

    /**
     * Called when the user focuses on this control.
     */
    const handleFocus = () => {
        setFocused(true);
    };

    /**
     * Called when the user moves focus away from this control.
     */
    const handleBlur = () => {
        setFocused(false);
    };

    // Calculate the inline styles for the switch and trigger.
    const switchWidth = width || DEFAULT_TWOSTATE_WIDTH;
    const switchHeight = height || DEFAULT_TWOSTATE_HEIGHT;
    const triggerSize = switchHeight - 4;
    const switchStyles = {
        width: switchWidth,
        height: switchHeight,
        borderRadius: switchHeight / 2,
        backgroundColor: state ? '#65afeb' : '#e9e9eb',
    };
    const actuatorStyles = {
        width: triggerSize,
        height: triggerSize,
        borderRadius: (switchHeight / 2) - 2,
        top: 2,
        left: state ? (switchWidth - switchHeight) + 2 : 2,
    };

    return (
        <label className={`boolean-switch${focused ? ' boolean-switch--focused' : ''}`}>
            <div className={`boolean-switch__title${cssTitle ? ` ${cssTitle}` : ''}`}>{title}</div>
            <div style={switchStyles} className={`boolean-switch__frame${cssFrame ? ` ${cssFrame}` : ''}`}>
                <div style={actuatorStyles} className={`boolean-switch__actuator${cssActuator ? ` ${cssActuator}` : ''}`} />
            </div>
            <input type="checkbox" checked={state} onChange={triggerHandler} onFocus={handleFocus} onBlur={handleBlur} />
        </label>
    );
};

BooleanSwitch.propTypes = {
    /** Current state to display in the switch */
    state: PropTypes.bool.isRequired,
    /** Title of the button for screen readers */
    title: PropTypes.string.isRequired,
    /** Called when the user clicks anywhere in the switch */
    triggerHandler: PropTypes.func.isRequired,
    /** Other styling options */
    options: PropTypes.exact({
        /** Width of switch in pixels; 36px by default */
        width: PropTypes.number,
        /** Height of switch in pixels; 22px by default */
        height: PropTypes.number,
        /** CSS class to add to the switch title */
        cssTitle: PropTypes.string,
        /** CSS class to add to the switch frame */
        cssFrame: PropTypes.string,
        /** CSS class to add to the switch actuator */
        cssActuator: PropTypes.string,
    }),
};

BooleanSwitch.defaultProps = {
    options: {},
};

export default BooleanSwitch;
