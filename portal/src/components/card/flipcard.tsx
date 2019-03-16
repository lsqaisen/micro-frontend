import React, { Children } from 'react'
import Card from './card'
import styles from './flipcard.less';


export declare type flipCardAxisType = 'left' | 'center' | 'right';

export interface FlipCardProps {
    className?: string,
    type?: string,
    axis?: flipCardAxisType,
    style?: object,
    frontChildren?: any,
    backChildren?: any,
}

export interface FlipCardState {
    isFlip: boolean,
}

export default class FlipCard extends React.Component<FlipCardProps, FlipCardState> {
    public state: FlipCardState;
    constructor(props: FlipCardProps) {
        super(props);
        this.state = {
            isFlip: false,
        }
    }

    onFlip(isFlip: boolean) {
        this.setState({ isFlip })
    }

    render() {
        const { axis, frontChildren, backChildren } = this.props;
        const cardData = { style: this.props.style };
        return (
            <section
                className={`${styles[`asui-card-flip-box`]} ${styles[`asui-card-flip-${axis || 'center'}`]} ${this.state.isFlip ? styles[`asui-card-flipped`] : ''} ${this.props.className || ''}`}
                onClick={() => this.onFlip(!this.state.isFlip)}
            >
                <Card className={`${styles['asui-card']}`} {...cardData} >
                    <figure className={`${styles[`asui-card-flip-figure`]} ${styles[`front`]}`}>{frontChildren}</figure>
                    <figure className={`${styles[`asui-card-flip-figure`]} ${styles[`back`]}`}>{backChildren}</figure>
                </Card>
            </section>
        )
    }
}
