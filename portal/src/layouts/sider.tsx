import Logo from '@/components/layouts/logo';
import Menu from '@/components/layouts/sider/menu';
import User from '@/components/layouts/sider/user';
import Namespace from '@/components/layouts/sider/namespace';

export default ({ changeVisible }: any) => {
  return (
    <div>
      <Logo />
      <User name="admin" />
      <Namespace />
      <Menu onClick={() => { changeVisible && changeVisible() }} />
    </div>
  )
} 