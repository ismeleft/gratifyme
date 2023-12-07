import Nav from "../Nav/Nav";
import { Footer } from "../Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
