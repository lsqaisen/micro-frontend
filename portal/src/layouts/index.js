import { connect } from 'dva';
import Link from 'umi/link';

export default connect(state => ({
  menus: state.menus,
}))((props) => {
  return (
    <>
      <h1>layouts</h1>
      <ul>
        <li><Link to="/">go to /</Link></li>
        {props.menus.map(menu => {
          if (!!menu.children) {
            return (
              <div key={menu.key} style={{ paddingLeft: 24 }}>
                <h3><Link to={`/${menu.key}`}>{menu.name}</Link></h3>
                <ul>
                  {menu.children.map(v => (<li key={v.key}><Link to={`/${menu.key}/${v.key}`}>go to {v.name}</Link></li>))}
                </ul>
              </div>
            )
          } else {
            return (
              <li key={menu.key}><Link to={`/${menu.key}`}>go to {menu.name}</Link></li>
            )
          }
        })}
      </ul>
      {
        props.children
      }
    </>
  )
})
