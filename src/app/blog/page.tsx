import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const BlogPage: React.FC = () => {
  return (
    <div className="flex flex-col h-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full">
        <div>The blog page is currently under construction.</div>
        <div>
          The old page can be found{" "}
          <a href="https://main.bojin.co/blog" className="border-b">
            here
          </a>
          .
        </div>{" "}
      </div>
      <Footer path="/blog" />
    </div>
  );
};

export default BlogPage;
