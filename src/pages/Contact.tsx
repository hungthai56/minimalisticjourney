
import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // In a real app, you would handle form submission here
    // Reset form after submission
    setFormData({ name: "", email: "", subject: "", message: "" });
    alert("Thank you for your message! I'll get back to you soon.");
  };

  return (
    <div className="page-container animate-fade-in">
      <span className="inline-block py-1 px-3 bg-accent text-accent-foreground rounded-full text-sm mb-4">
        Get in touch
      </span>
      <h1 className="section-title">Contact me</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
        <div>
          <h2 className="text-2xl mb-6">Let's talk</h2>
          <p className="text-muted-foreground mb-8">
            Have a project in mind or just want to say hello? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mt-1 p-2 bg-accent rounded-full mr-4">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Email</h3>
                <p className="text-muted-foreground">hello@example.com</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 p-2 bg-accent rounded-full mr-4">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="mt-1 p-2 bg-accent rounded-full mr-4">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-1">Location</h3>
                <p className="text-muted-foreground">San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl mb-6">Follow me</h2>
            <div className="flex space-x-4">
              {["twitter", "github", "linkedin", "dribbble"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="p-3 border border-input rounded-md hover:bg-accent transition-colors"
                  aria-label={`Visit my ${social} profile`}
                >
                  <span className="capitalize">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <form onSubmit={handleSubmit} className="glass-panel p-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-4 rounded-md bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-4 rounded-md bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-4 rounded-md bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Project inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-4 rounded-md bg-background border border-input focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Tell me about your project, timeline, and budget..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full h-11 mt-2 inline-flex items-center justify-center gap-2 font-medium bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
              >
                Send message <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
