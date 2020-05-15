import React from 'react';
import PropTypes from 'prop-types';


/**
 * Renders a boolean switch in the style of iOS. This keeps no internal state -- the state of the
 * switch is kept by the parent component which passes it down to Switch.
 */
const Switch = ({ state, noState, title, triggerHandler, options }) => {
    const width = options.width || 36;
    const height = options.height || 22;
    const switchStyles = {
        width,
        height,
        borderRadius: height / 2,
        backgroundColor: state ? '#65afeb' : '#e9e9eb',
        display: options.inline ? 'inline-block' : 'block',
    };
    const switchCss = `switch${options.switchCss ? ` ${options.switchCss}` : ''}`;
    const triggerSize = height - 4;
    const triggerStyles = {
        width: triggerSize,
        height: triggerSize,
        borderRadius: (height / 2) - 2,
        top: 2,
        left: state ? (width - height) + 2 : 2,
    };
    const triggerCss = `switch-trigger${options.triggerCss ? ` ${options.triggerCss}` : ''}`;

    return (
        <button className={switchCss} style={switchStyles} aria-pressed={noState ? null : state} onClick={triggerHandler}>
            <div className={triggerCss} style={triggerStyles} />
            <div className="sr-only">{title}</div>
        </button>
    );
};

Switch.propTypes = {
    /** Current state to display in the switch; undefined for neither true nor false */
    state: PropTypes.bool.isRequired,
    /** True if no state at all -- switch halfway between off and on */
    noState: PropTypes.bool,
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

Switch.defaultProps = {
    noState: false,
    options: {},
};

export default Switch;
