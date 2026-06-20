import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathProps {
  children: string;
  display?: boolean;
}

export default function Math({ children, display = false }: MathProps) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
  });

  return display ? (
    <div
      className="my-6 overflow-x-auto text-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}
