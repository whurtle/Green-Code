import Footer from './footer';
import MenuAppBar from './menu';

export default function Layout({ children }: any) {
  return (
    <>
      {/* <MenuAppBar /> */}
      <main>{children}</main>
      <Footer />
    </>
  )
}