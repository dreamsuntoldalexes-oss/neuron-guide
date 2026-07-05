import { Link } from "react-router-dom";
import { Mail, Phone, MessageCircle, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

const EMAIL = "adekanmbiadekanmbi5@gmail.com";
const PHONE = "08120205800";
const WHATSAPP = "https://wa.me/2348120205800";

export default function WelcomeFooter() {
  return (
    <footer className="relative z-10 mt-10 border-t border-border/40 bg-card/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-20 xl:px-28 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-heading font-bold text-foreground mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/home" className="hover:text-primary transition">Home</Link></li>
            <li><Link to="/tools" className="hover:text-primary transition">Explore Tools</Link></li>
            <li><Link to="/pricing" className="hover:text-primary transition">Pricing</Link></li>
            <li><Link to="/signup" className="hover:text-primary transition">Get Started</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-heading font-bold text-foreground mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/how-it-works" className="hover:text-primary transition">How It Works</Link></li>
            <li><Link to="/tutorials" className="hover:text-primary transition">Video Tutorials</Link></li>
            <li><Link to="/chatbot" className="hover:text-primary transition">AI Assistant</Link></li>
            <li><Link to="/favorites" className="hover:text-primary transition">Saved Tools</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-heading font-bold text-foreground mb-3">Contact</h4>
          <div className="flex flex-col gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-xs text-foreground transition group"
            >
              <Mail className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition" />
              <span className="truncate">Email Us</span>
            </a>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 text-xs text-foreground transition group"
            >
              <Phone className="w-3.5 h-3.5 text-secondary group-hover:scale-110 transition" />
              <span>Call {PHONE}</span>
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-xs text-foreground transition group"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:scale-110 transition" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <div className="flex items-center gap-3 mt-4">
            {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
              <button
                key={i}
                aria-label="social"
                className="w-8 h-8 rounded-full bg-muted/40 hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition"
              >
                <Icon className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border/30 px-5 py-4 text-center text-[11px] text-muted-foreground">
        © {new Date().getFullYear()} Neuron Guide. Crafted for curious minds.
      </div>
    </footer>
  );
}
