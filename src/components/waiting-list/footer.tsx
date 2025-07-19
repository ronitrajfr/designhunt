import { Twitter, Mail, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="lg:fixed lg:bottom-8 lg:left-1/2 lg:transform lg:-translate-x-1/2 pb-8 lg:pb-0">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <a
            href="https://twitter.com/designhuntHQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/ronitrajfr/designhunt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:ronitrajofficial7@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Discord"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
        <p className="text-xs text-muted-foreground">© 2025 designhunt</p>
      </div>
    </footer>
  );
}
