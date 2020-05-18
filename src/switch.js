import React from 'react';
import PropTypes from 'prop-types';


const DEFAULT_SWITCH_HEIGHT = 22;

/**
 * Renders a boolean switch in the style of iOS. This keeps no internal state -- the state of the
 * switch is kept by the parent component which passes it down.
 */
const DEFAULT_TWOSTATE_WIDTH = DEFAULT_SWITCH_HEIGHT * 1.6;
const DEFAULT_TWOSTATE_HEIGHT = DEFAULT_SWITCH_HEIGHT;
export const TwoState = ({ state, title, triggerHandler, options }) => {
    // Calculate the inline styles for the switch and trigger.
    const width = options.width || DEFAULT_TWOSTATE_WIDTH;
    const height = options.height || DEFAULT_TWOSTATE_HEIGHT;
    const triggerSize = height - 4;
    const switchStyles = {
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: state ? '#65afeb' : '#e9e9eb',
        display: options.inline ? 'inline-block' : 'block',
    };
    const switchCss = `switch${options.switchCss ? ` ${options.switchCss}` : ''}`;
    const triggerStyles = {
        width: triggerSize,
        height: triggerSize,
        borderRadius: (height / 2) - 2,
        top: 2,
        left: state ? (width - height) + 2 : 2,
    };
    const triggerCss = `switch-trigger${options.triggerCss ? ` ${options.triggerCss}` : ''}`;

    return (
        <button className={switchCss} style={switchStyles} aria-pressed={state} onClick={triggerHandler}>
            <div className={triggerCss} style={triggerStyles} />
            <div className="sr-only">{title}</div>
        </button>
    );
};

TwoState.propTypes = {
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
        /** True to use inline-block style */
        inline: PropTypes.bool,
        /** Extra CSS classes for switch */
        switchCss: PropTypes.string,
        /** Extra CSS classes for switch trigger */
        triggerCss: PropTypes.string,
    }),
};

TwoState.defaultProps = {
    options: {},
};


/**
 * Renders a three-state boolean switch (on, off, neither). This keeps no internal state -- the
 * state of the switch is kept by the parent component which passes it down.
 */
const DEFAULT_TRISTATE_WIDTH = DEFAULT_SWITCH_HEIGHT * 2;
const DEFAULT_TRISTATE_HEIGHT = DEFAULT_SWITCH_HEIGHT;
const KEYCODE_ARROW_DOWN = 40;
const KEYCODE_ARROW_LEFT = 37;
const KEYCODE_ARROW_RIGHT = 39;
const KEYCODE_ARROW_UP = 38;
export const TriState = ({ state, title, triggerHandler, options }) => {
    const switchRef = React.useRef();
    const width = options.width || DEFAULT_TRISTATE_WIDTH;
    const height = options.height || DEFAULT_TRISTATE_HEIGHT;
    const triggerSize = height - 4;
    const triggerMidSize = triggerSize / 2;
    const sectorWidth = width / 3;

    // Determine the left coordinate of the trigger based on the state.
    let leftPos;
    let switchColor;
    if (state < 0) {
        leftPos = 2;
        switchColor = '#e9e9eb';
    } else if (state > 0) {
        leftPos = (width - triggerSize) - 2;
        switchColor = '#65afeb';
    } else {
        leftPos = (width / 2) - (triggerMidSize / 2);
        switchColor = '#ffd561';
    }

    // Map the switch state to inline CSS styles.
    const switchStyles = {
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: switchColor,
        display: options.inline ? 'inline-block' : 'block',
    };
    const switchCss = `switch${options.switchCss ? ` ${options.switchCss}` : ''}`;
    const triggerStyles = {
        width: state === 0 ? triggerMidSize : triggerSize,
        height: triggerSize,
        borderRadius: state === 0 ? 2 : (height / 2) - 2,
        top: 2,
        left: leftPos,
    };
    const triggerCss = `switch-trigger${options.triggerCss ? ` ${options.triggerCss}` : ''}`;

    // Need to map click position to corresponding trigger state.
    const triggerHandlerShim = (e) => {
        // Map viewport click position to position within switch div.
        const rect = switchRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        console.log(x);

        // Divide click areas into three equal-width sectors and map those to trigger states.
        if (x < sectorWidth) {
            // Left third of switch.
            triggerHandler(-1);
        } else if (x > width - sectorWidth) {
            // Right third of switch.
            triggerHandler(1);
        } else {
            // Middle of switch.
            triggerHandler(0);
        }
    };

    const keyUpHandler = (e) => {
        let newState;
        switch (e.keyCode) {
        case KEYCODE_ARROW_DOWN:
        case KEYCODE_ARROW_RIGHT:
            newState = state < 1 ? state + 1 : state;
            break;
        case KEYCODE_ARROW_UP:
        case KEYCODE_ARROW_LEFT:
            newState = state > -1 ? state - 1 : state;
            break;
        default:
            newState = state;
            break;
        }
        if (newState !== state) {
            triggerHandler(newState);
        }
    };

    return (
        <div ref={switchRef} tabIndex="0" role="button" aria-label={`State ${state}`} className={switchCss} style={switchStyles} onClick={triggerHandlerShim} onKeyUp={keyUpHandler}>
            <div className={triggerCss} tabIndex="-1" style={triggerStyles} />
            <div className="sr-only">{title}</div>
        </div>
    );
};

TriState.propTypes = {
    /** Current state to display in the switch; >0=on, 0=neither, <0=off */
    state: PropTypes.number.isRequired,
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
        /** True to use inline-block style */
        inline: PropTypes.bool,
        /** Extra CSS classes for switch */
        switchCss: PropTypes.string,
        /** Extra CSS classes for switch trigger */
        triggerCss: PropTypes.string,
    }),
};

TriState.defaultProps = {
    options: {},
};
