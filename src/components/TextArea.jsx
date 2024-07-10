import React, { useEffect, useState } from "react";

function TextArea({
  title,
  setTitle,
  content,
  setContent,
  id,
  updateData,
  children,
  ...props
}) {
  const [timeoutData, setTimeoutData] = useState(null);

  useEffect(() => {
    if (title === "" || content === "") return;

    if (timeoutData) clearTimeout(timeoutData);
    const timeout = setTimeout(async () => {
      await updateData(title, content);
    }, 2000);
    setTimeoutData(timeout);

    return () => {
      clearTimeout(timeoutData);
    };
  }, [id === "title" ? title : id === "content" ? content : ""]);
  return (
    <textarea
      value={id === "title" ? title : content}
      onChange={(e) => {
        if (id === "title") setTitle(e.target.value);
        else setContent(e.target.value);
      }}
      {...props}
    >
      {children}
    </textarea>
  );
}

export default TextArea;
