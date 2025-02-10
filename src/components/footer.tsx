export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center p-4 bg-muted/30 backdrop-blur-lg shadow-lg border-t border-border rounded-t-lg">
      <div className="container mx-auto text-center bg-[var(--glass-bg)] border-[var(--glass-border)] shadow-[var(--glass-shadow)] rounded-xl p-4">
        {/* Main Content */}
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          Built with ❤️ by{" "}
          <a
            href="https://github.com/thesushilsharma"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors font-semibold"
          >
            Sushil Sharma
          </a>
        </p>
        <p className="mt-2 text-sm text-muted-foreground flex items-center justify-center gap-1">
          View the source code on{" "}
          <a
            href="https://github.com/thesushilsharma/Nexora"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-accent transition-colors font-semibold"
          >
            GitHub
          </a>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          &copy; {currentYear}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
