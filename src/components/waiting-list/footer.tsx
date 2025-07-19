import { Twitter, Linkedin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-4">
          <a
            href="https://twitter.com/designhunt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </a>

          <a
            href="https://linkedin.com/company/designhunt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>

          <a
            href="https://discord.gg/designhunt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Discord"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">© 2025 designhunt</p>
      </div>
    </footer>
  );
}
