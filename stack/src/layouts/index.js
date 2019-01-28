import Link from 'umi/link';

export default (props) => {
  return (
    <>
    <h1>layouts</h1>
    <h1>Page users</h1>
    <li><Link to="/">go to home</Link></li>
    <li><Link to="/list">go to list</Link></li>
    <h2>Users</h2>
      {
        props.children
      }
    </>
  )
}
