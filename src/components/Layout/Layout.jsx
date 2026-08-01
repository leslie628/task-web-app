import Header from "../Header/header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-6">
        {children}
      </main>
    </>
  );
};
export default Layout;