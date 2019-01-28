import Link from 'umi/link';

export default (props) => {
  return (
    <>
      <h1>layouts</h1>
      <ul>
        <li><Link to="/">go to /</Link></li>
        <li><Link to="/stack">go to /stack/</Link></li>
        <li><Link to="/stack/list">go to /stack/list</Link></li>
        <li><Link to="/stack/ex">go to /stack/ex</Link></li>
      </ul>
      {
        props.children
      }
    </>
  )
}
