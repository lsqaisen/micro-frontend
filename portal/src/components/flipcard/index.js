import styles from './flipcard.less';

export default class FlipCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isFlip: false,
    }
  }

  onFlip(isFlip) {
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
