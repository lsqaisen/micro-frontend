import styles from './style/logo.less';

const Logo = (props: any) => {
  return (
    <div className={styles.logoBox}>
      <a className={styles.logo} href="#" onClick={(e) => e.preventDefault()}>
        <img src={`/static/oem${process.env.NODE_ENV === "development" ? process.env.OEM_NAME : ''}/icon.png`} alt="logo" />
        <img src={`/static/oem${process.env.NODE_ENV === "development" ? process.env.OEM_NAME : ''}/logo.png`} alt="Ant Design Pro" />
      </a>
    </div>
  )
}

export default Logo;