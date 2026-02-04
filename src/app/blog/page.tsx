import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const BlogPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
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
