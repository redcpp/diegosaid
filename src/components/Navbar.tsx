import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleContact = () => {
    if (location.pathname === '/') {
      const target = document.getElementById('contact');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/', { state: { scrollTo: 'contact' } });
    }
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-paper/95 backdrop-blur-sm border-b border-rule">
      <div className="max-w-[780px] mx-auto px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="text-[15px] font-bold font-serif text-ink hover:text-accent transition-colors"
        >
          Diego Said
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/blog"
            className="text-[14px] font-serif text-muted hover:text-ink transition-colors"
          >
            Writing
          </Link>
          <button
            onClick={handleContact}
            className="text-[14px] font-serif text-muted hover:text-ink transition-colors bg-transparent border-none cursor-pointer"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
