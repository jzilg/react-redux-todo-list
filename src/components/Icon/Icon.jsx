import React from 'react'
import PropTypes from 'prop-types'
import './icon.scss'

/**
 * @param {object} props
 * @param {string} props.name - type of icon
 * @param {string} [props.className=''] - className for icon-wrapper
 * @returns {HTMLElement}
 */
const Icon = ({
    name,
    width,
    height,
    className,
}) => {
    const icons = {
        save: {
            width: 28,
            height: 32,
            viewBox: '0 0 448 512',
            svg: (
                <path
                    fill="currentColor"
                    d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM288 64v96H96V64h192zm128 368c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V80c0-8.822 7.178-16 16-16h16v104c0 13.255 10.745 24 24 24h208c13.255 0 24-10.745 24-24V64.491a15.888 15.888 0 0 1 7.432 4.195l83.882 83.882A15.895 15.895 0 0 1 416 163.882V432zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 144c-30.879 0-56-25.121-56-56s25.121-56 56-56 56 25.121 56 56-25.121 56-56 56z"
                />
            ),
        },
    }

    const icon = icons[name]

    if (!icon) {
        return null
    }

    const { viewBox } = icon
    const finalWidth = width || icon.width
    const finalHeight = height || icon.height

    return (
        <span styleName="wrapper" className={className}>
            <svg
                styleName="svg"
                width={finalWidth}
                height={finalHeight}
                viewBox={viewBox}
                role="img"
                xmlns="http://www.w3.org/2000/svg"
            >
                {icon.svg}
            </svg>
        </span>
    )
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
    className: PropTypes.string,
}

Icon.defaultProps = {
    width: null,
    height: null,
    className: '',
}

export default Icon