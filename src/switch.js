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
 *
 * The radio-button input labels exist to receive clicks and keyboard events, but they’re
 * transparent. We use another div on top to handle the trigger animation though it receives no
 * click events -- it's there for the animation only. It has to be positioned absolutely for the
 * animation, but the radio-button input labels use flexbox to position themselves because
 * absolutely positioned labels can't receive clicks.
 *
 * You're supposed to put radio buttons in a <fieldset> but Chrome has a bug in that flexbox
 * doesn't work inside a <fieldset> element.
 */
const DEFAULT_TRISTATE_WIDTH = DEFAULT_SWITCH_HEIGHT * 2.3;
const DEFAULT_TRISTATE_HEIGHT = DEFAULT_SWITCH_HEIGHT;
export const TriState = ({ state, title, name, triggerHandler, options }) => {
    const stateNum = +state;
    const width = options.width || DEFAULT_TRISTATE_WIDTH;
    const height = options.height || DEFAULT_TRISTATE_HEIGHT;
    const triggerSize = height - 4;
    const triggerMidSize = triggerSize / 2;

    // Determine the color of the switch background and switch trigger based on the state.
    let switchColor;
    let switchTriggerPosition;
    if (stateNum < 0) {
        switchColor = '#e9e9eb';
        switchTriggerPosition = 2;
    } else if (stateNum > 0) {
        switchColor = '#65afeb';
        switchTriggerPosition = (width - triggerSize) - 2;
    } else {
        switchColor = '#ffd561';
        switchTriggerPosition = (width / 2) - (triggerMidSize / 2);
    }

    // Generate the dynamic CSS styles for the switch.
    const switchStyles = {
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: switchColor,
        display: options.inline ? 'inline-flex' : 'flex',
    };
    const switchCss = `tri-switch${options.switchCss ? ` ${options.switchCss}` : ''}`;

    // Generate the dynamic CSS styles for the clickable labels.
    const triggerLabelStyles = {
        height: triggerSize,
    };
    const triggerLabelStylesMinus = Object.assign({}, triggerLabelStyles, { width: triggerSize, flexBasis: triggerSize, marginRight: 0, borderRadius: height / 2 });
    const triggerLabelStylesZero = Object.assign({}, triggerLabelStyles, { width: triggerMidSize, flexBasis: triggerMidSize, marginRight: 0, marginLeft: 0, borderRadius: 2 });
    const triggerLabelStylesPlus = Object.assign({}, triggerLabelStyles, { width: triggerSize, flexBasis: triggerSize, marginLeft: 0, borderRadius: height / 2 });

    // Generate the dynamic CSS styles for the animated trigger.
    const triggerCss = `switch-trigger${options.triggerCss ? ` ${options.triggerCss}` : ''}`;
    const triggerStyles = {
        left: switchTriggerPosition,
        width: stateNum === 0 ? triggerMidSize : triggerSize,
        height: triggerSize,
        borderRadius: state === 0 ? 2 : (height / 2) - 2,
    }

    // Send the clicked radio-button value to the parent.
    const triggerHandlerShim = (e) => {
        triggerHandler(e.target.value);
    };

    return (
        <div className={switchCss} style={switchStyles}>
            <legend className="sr-only">{title}</legend>
            <input type="radio" name={name} id={`${name}-off`} value={-1} onChange={triggerHandlerShim} />
            <label htmlFor={`${name}-off`} style={triggerLabelStylesMinus}><div className="sr-only">off</div></label>
            <input type="radio" name={name} id={`${name}-none`} value={0} onChange={triggerHandlerShim} />
            <label htmlFor={`${name}-none`} style={triggerLabelStylesZero}><div className="sr-only">none</div></label>
            <input type="radio" name={name} id={`${name}-on`} value={1} onChange={triggerHandlerShim} />
            <label htmlFor={`${name}-on`} style={triggerLabelStylesPlus}><div className="sr-only">on</div></label>
            <div className={triggerCss} style={triggerStyles} />
        </div>
    );
};

TriState.propTypes = {
    /** Current state to display in the switch; >0=on, 0=neither, <0=off */
    state: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    /** Title of the button for screen readers */
    title: PropTypes.string.isRequired,
    /** Name for the switch; unique on the page like id */
    name: PropTypes.string.isRequired,
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
