import React from 'react'
import styles from './card.less'

interface CardState {
    className?: string,
    style?: object,
    children?: any,
}

const Card = (props: CardState) => {
    const { className, style, children } = props;
    return (
        <div
            className={`${styles[`asui-card`]} ${className || ''}`}
            style={{ ...style }}
        >
            {children}
        </div>
    )
}

export default Card
