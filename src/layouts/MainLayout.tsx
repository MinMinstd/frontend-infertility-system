import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingNav from "../components/FloatingNav";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <FloatingNav />
        {children}
      </main>
      <Footer />
    </div>
  );
};
