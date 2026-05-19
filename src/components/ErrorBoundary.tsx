import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-creme text-ink px-6">
          <div className="max-w-md text-center">
            <p className="font-mono text-label tracking-[0.08em] uppercase text-stone-text mb-4">
              Error
            </p>
            <h1 className="font-headline text-display-md mb-6">
              Something broke.
            </h1>
            <p className="font-body text-body-lg mb-8">
              Reload the page, or reach me at{' '}
              <a href="mailto:redcpp@gmail.com" className="underline decoration-cobalt underline-offset-4">
                redcpp@gmail.com
              </a>
              .
            </p>
            <button
              onClick={() => window.location.reload()}
              className="font-mono text-label tracking-[0.08em] uppercase border border-ink px-6 py-3 hover:bg-ink hover:text-creme transition-colors"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
