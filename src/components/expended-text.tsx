import { useState } from "react";

interface Props {
  text: string;
  className?: string;
}
function ExpandedText({ text, className }: Props) {
  const [longText, setLongText] = useState(text.length > 100);

  return (
    <span className={className}>
      <span>{longText ? text.substring(0, 100) : text}</span>
      {longText && (
        <span
          onClick={() => setLongText(!longText)}
          className="text-blue-500 cursor-pointer"
        >
          &nbsp;more..
        </span>
      )}
      {text.length > 100 && !longText && (
        <span
          onClick={() => setLongText(!longText)}
          className="text-blue-500 cursor-pointer"
        >
          &nbsp;less
        </span>
      )}
    </span>
  );
}

export default ExpandedText;
