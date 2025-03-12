
import { Calendar, Mail, MapPin } from "lucide-react";

const About = () => {
  return (
    <div className="page-container animate-fade-in">
      <span className="inline-block py-1 px-3 bg-accent text-accent-foreground rounded-full text-sm mb-4">
        About me
      </span>
      <h1 className="section-title">My journey</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        <div className="md:col-span-1">
          <div className="glass-panel p-6 sticky top-32">
            <div className="w-32 h-32 bg-accent rounded-full mx-auto mb-6 overflow-hidden">
              {/* Profile image placeholder */}
              <div className="w-full h-full flex items-center justify-center text-accent-foreground">
                Profile
              </div>
            </div>
            
            <h2 className="text-xl mb-4 text-center">Jamie Smith</h2>
            
            <div className="flex flex-col space-y-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>hello@example.com</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-3 flex-shrink-0" />
                <span>Available from August 2023</span>
              </div>
            </div>
            
            <hr className="my-6 border-border" />
            
            <div className="grid grid-cols-2 gap-2 text-center">
              <div>
                <p className="text-2xl font-medium">5+</p>
                <p className="text-xs text-muted-foreground">Years experience</p>
              </div>
              <div>
                <p className="text-2xl font-medium">50+</p>
                <p className="text-xs text-muted-foreground">Projects completed</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-12">
          <section>
            <h2 className="text-2xl mb-4">Biography</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a designer and developer with a passion for creating minimalist, functional, and beautiful digital experiences. With over 5 years of experience in the field, I've worked on a variety of projects from small startups to large enterprise applications.
              </p>
              <p>
                My approach to design is centered around simplicity and purpose. I believe that every element should serve a function, and that the most elegant solutions are often the most straightforward ones.
              </p>
              <p>
                When I'm not designing or coding, you can find me hiking in the mountains, reading a good book, or experimenting with new cooking recipes.
              </p>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl mb-4">Experience</h2>
            <div className="space-y-8">
              {[
                {
                  title: "Senior Designer",
                  company: "Design Studio",
                  period: "2020 - Present",
                  description: "Led design for major client projects, mentored junior designers, and implemented new design systems."
                },
                {
                  title: "UX Developer",
                  company: "Tech Innovations",
                  period: "2018 - 2020",
                  description: "Designed and developed user interfaces for web applications, collaborated with product managers to define user requirements."
                },
                {
                  title: "Junior Designer",
                  company: "Creative Agency",
                  period: "2016 - 2018",
                  description: "Created visual designs for client websites, assisted senior designers with project deliverables."
                }
              ].map((job, index) => (
                <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-border">
                  <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary -translate-x-1/2"></div>
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <div className="text-sm flex items-center justify-between mb-2">
                    <span>{job.company}</span>
                    <span className="text-muted-foreground">{job.period}</span>
                  </div>
                  <p className="text-muted-foreground">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "UI/UX Design", "Web Development", "React", "Figma",
                "Typography", "CSS/SCSS", "JavaScript", "Responsive Design",
                "User Research", "Prototyping", "Design Systems", "Tailwind CSS"
              ].map((skill, index) => (
                <span 
                  key={index} 
                  className="py-1.5 px-3 bg-accent text-accent-foreground rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
