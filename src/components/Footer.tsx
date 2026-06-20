export default function Footer() {
  return (
    <footer className="bg-paper border-t border-rule">
      <div className="max-w-[780px] mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <span className="text-[13px] font-mono text-muted">
          &copy; 2025 Diego Said Anaya Mancilla
        </span>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/redcpp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-mono text-muted hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/redcpp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-mono text-muted hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
