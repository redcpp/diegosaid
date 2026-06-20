import { Highlight, themes } from 'prism-react-renderer';

interface CodeProps {
  children: string;
  language?: string;
}

const theme = {
  ...themes.github,
  plain: { color: '#2C2C2C', backgroundColor: '#F4F4F2' },
};

export default function Code({ children, language = 'text' }: CodeProps) {
  const code = children.trim();

  return (
    <Highlight theme={theme} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{ ...style, padding: '1.25rem 1.5rem', borderRadius: '0.5rem', border: '1px solid #E4E4E7', overflowX: 'auto', fontSize: '14px', lineHeight: '1.7' }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
