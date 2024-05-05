import Footer from "@/components/Footer";
import Main from "@/components/Main";
import Navbar from "@/components/Navbar";
import TopologyWrap from "@/components/TopologyWrap";

export default function Home() {
  return (
    <TopologyWrap>
      <Navbar />
      <Main />
      <Footer path="/" />
    </TopologyWrap>
  );
}
