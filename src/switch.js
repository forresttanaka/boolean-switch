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
export const BooleanSwitch = ({ state, title, triggerHandler, options }) => {
    // True if checkbox input has focus.
    const [focused, setFocused] = React.useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    // Calculate the inline styles for the switch and trigger.
    const width = options.width || DEFAULT_TWOSTATE_WIDTH;
    const height = options.height || DEFAULT_TWOSTATE_HEIGHT;
    const triggerSize = height - 4;
    const switchStyles = {
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: state ? '#65afeb' : '#e9e9eb',
    };
    const actuatorStyles = {
        width: triggerSize,
        height: triggerSize,
        borderRadius: (height / 2) - 2,
        top: 2,
        left: state ? (width - height) + 2 : 2,
    };

    return (
        <label className={`boolean-switch${focused ? ' boolean-switch--focused' : ''}`}>
            <div className="boolean-switch__title">{title}</div>
            <div style={switchStyles} className="boolean-switch__frame">
                <div style={actuatorStyles} className="boolean-switch__actuator" />
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
    }),
};

BooleanSwitch.defaultProps = {
    options: {},
};

export default BooleanSwitch;
