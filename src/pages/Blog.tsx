
import { Link } from "react-router-dom";
import { ChevronRight, Search } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Art of Minimalist Design",
      excerpt: "Exploring the principles of minimalist design and how to apply them to create beautiful, functional user interfaces.",
      date: "June 15, 2023",
      category: "Design",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Building Responsive Layouts with Tailwind CSS",
      excerpt: "A practical guide to creating responsive layouts that work across all devices using the utility-first approach of Tailwind CSS.",
      date: "May 22, 2023",
      category: "Development",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Typography in Web Design: Choosing the Right Fonts",
      excerpt: "How to select and pair fonts to create a cohesive and readable typographic system for your web projects.",
      date: "April 10, 2023",
      category: "Design",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "The Psychology of User Interfaces",
      excerpt: "Understanding how users interact with digital interfaces and how to design with psychological principles in mind.",
      date: "March 28, 2023",
      category: "UX Design",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "Creating Smooth Animations in React",
      excerpt: "A deep dive into animation techniques in React applications for better user experiences and interactions.",
      date: "February 15, 2023",
      category: "Development",
      readTime: "10 min read",
    },
  ];

  return (
    <div className="page-container animate-fade-in">
      <span className="inline-block py-1 px-3 bg-accent text-accent-foreground rounded-full text-sm mb-4">
        Articles
      </span>
      <h1 className="section-title">From the blog</h1>
      
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-6">
        <div className="flex flex-wrap gap-4">
          {["All", "Design", "Development", "UX Design"].map((category, index) => (
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
        
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full h-10 pl-10 pr-4 rounded-md bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <article 
            key={post.id}
            className="glass-panel p-6 hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
              <div className="flex gap-2 items-center">
                <span className="py-0.5 px-2 bg-accent rounded-full">
                  {post.category}
                </span>
                <span>{post.date}</span>
              </div>
              <span>{post.readTime}</span>
            </div>
            
            <h2 className="text-xl md:text-2xl mb-2 hover:text-primary transition-colors">
              <Link to={`/blog/${post.id}`}>{post.title}</Link>
            </h2>
            
            <p className="text-muted-foreground mb-4">
              {post.excerpt}
            </p>
            
            <Link 
              to={`/blog/${post.id}`} 
              className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors"
            >
              Read more <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </article>
        ))}
      </div>
      
      <div className="flex justify-center mt-12">
        <nav className="flex items-center space-x-2">
          <button className="h-9 w-9 flex items-center justify-center rounded-md border border-input hover:bg-accent transition-colors">
            1
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent transition-colors">
            2
          </button>
          <button className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent transition-colors">
            3
          </button>
          <span className="text-muted-foreground">...</span>
          <button className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent transition-colors">
            8
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Blog;
