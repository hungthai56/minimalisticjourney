
import { Link } from "react-router-dom";
import { ChevronRight, ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Minimalist Portfolio",
      category: "Web Design",
      description: "A clean, elegant portfolio website for a photographer showcasing their work with a focus on minimalist design principles.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      github: "#",
      demo: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      category: "Web Application",
      description: "A productivity application for managing tasks, projects, and deadlines with a clean user interface and intuitive experience.",
      tags: ["React", "TypeScript", "Firebase"],
      github: "#",
      demo: "#",
    },
    {
      id: 3,
      title: "E-commerce Platform",
      category: "Web Development",
      description: "A full-featured e-commerce platform with product catalog, cart functionality, and checkout process.",
      tags: ["React", "Node.js", "MongoDB"],
      github: "#",
      demo: "#",
    },
    {
      id: 4,
      title: "Weather Dashboard",
      category: "Web Application",
      description: "A weather application that displays current conditions and forecasts based on location with beautiful visualizations.",
      tags: ["JavaScript", "Chart.js", "Weather API"],
      github: "#",
      demo: "#",
    },
    {
      id: 5,
      title: "Recipe Finder",
      category: "Web Application",
      description: "An application that helps users discover new recipes based on available ingredients and dietary preferences.",
      tags: ["React", "Redux", "REST API"],
      github: "#",
      demo: "#",
    },
    {
      id: 6,
      title: "Personal Blog",
      category: "Web Development",
      description: "A minimal blog platform with a focus on typography and readability for sharing articles and thoughts.",
      tags: ["React", "Markdown", "Styled Components"],
      github: "#",
      demo: "#",
    },
  ];

  return (
    <div className="page-container animate-fade-in">
      <span className="inline-block py-1 px-3 bg-accent text-accent-foreground rounded-full text-sm mb-4">
        Portfolio
      </span>
      <h1 className="section-title">My projects</h1>
      
      <div className="flex flex-wrap gap-4 mb-12">
        {["All", "Web Design", "Web Application", "Web Development"].map((category, index) => (
          <button
            key={index}
            className={`py-1.5 px-4 rounded-full text-sm transition-colors ${
              index === 0 
                ? "bg-primary text-primary-foreground" 
                : "bg-accent text-accent-foreground hover:bg-accent/80"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="glass-panel overflow-hidden group hover:shadow-md transition-shadow duration-300"
          >
            <div className="aspect-video bg-accent">
              {/* Project image placeholder */}
              <div className="w-full h-full flex items-center justify-center text-accent-foreground">
                {project.title} Preview
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs text-muted-foreground">
                    {project.category}
                  </span>
                  <h3 className="text-xl group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="flex space-x-2">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-accent transition-colors"
                      aria-label="View GitHub repository"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-accent transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="py-0.5 px-2 bg-accent text-accent-foreground rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <Link 
                to={`/projects/${project.id}`} 
                className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors"
              >
                View details <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
