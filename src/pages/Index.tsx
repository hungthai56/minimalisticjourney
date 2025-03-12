
import { ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <section className="min-h-[90vh] flex flex-col justify-center">
        <div className="page-container">
          <div className="max-w-2xl mx-auto md:mx-0">
            <span className="inline-block py-1 px-3 bg-accent text-accent-foreground rounded-full text-sm mb-6 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
              Welcome to my portfolio
            </span>
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
              Hello, I'm <span className="font-medium">Jamie</span>.
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.7s" }}>
              A minimalist designer & developer focused on creating elegant, functional digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in opacity-0" style={{ animationDelay: "0.9s" }}>
              <Link
                to="/projects"
                className="inline-flex items-center justify-center h-11 px-6 font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
              >
                View my work
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-11 px-6 font-medium border border-input rounded-md hover:bg-accent transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-16 animate-fade-in opacity-0" style={{ animationDelay: "1.1s" }}>
          <a
            href="#featured"
            className="p-2 rounded-full border border-border hover:bg-accent transition-colors duration-200"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </section>

      <section id="featured" className="py-24">
        <div className="page-container">
          <span className="inline-block py-1 px-3 bg-accent text-accent-foreground rounded-full text-sm mb-4">
            Featured
          </span>
          <h2 className="section-title">Recent works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
              <div key={item} className="glass-panel p-6 group">
                <div className="bg-accent aspect-video mb-4 rounded overflow-hidden">
                  {/* Project image placeholder */}
                  <div className="w-full h-full flex items-center justify-center text-accent-foreground">
                    Project {item} Preview
                  </div>
                </div>
                <h3 className="text-xl mb-2 group-hover:text-primary transition-colors">Project {item}</h3>
                <p className="text-muted-foreground mb-4">
                  A brief description of the project showcasing the key features and technologies used.
                </p>
                <Link 
                  to={`/projects/${item}`} 
                  className="text-sm font-medium inline-flex items-center hover:underline"
                >
                  View project details
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center h-11 px-6 font-medium border border-input rounded-md hover:bg-accent transition-colors"
            >
              View all projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
