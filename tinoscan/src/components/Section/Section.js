import React from 'react';
import "./Section.scss";

const Section = props => {
    return (
        <div className="section">
            {props.children}
        </div>
    )
}

export const SectionTitle = props => {
    return (
        <div className="section__title">
            {props.children}
        </div>
    )
}

export const SectionBody = props => {
    return (
        <div className="section__body" style={props.style}>
            {props.children}
        </div>
    )
}

export default Section