export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer
        className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-6 bg-muted/30 backdrop-blur-lg shadow-lg border-t border-border rounded-t-lg"
      >
        <div className="container mx-auto text-center">
          <p className="text-sm text-foreground">
            Built with ❤️ by{" "}
            <a
              href="https://github.com/thesushilsharma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text--destructive transition-all duration-300"
            >
              Sushil Sharma
            </a>
          </p>
          <p className="mt-2 text-sm text-foreground">
            View the source code on{" "}
            <a
              href="https://github.com/thesushilsharma/Nexora"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-destructive transition-all duration-300"
            >
              GitHub
            </a>
          </p>
          <p className="text-sm text-foreground">
            &copy; {currentYear}. All rights reserved.
          </p>
        </div>
      </footer>
    );
}