import React from "react";
import convertLexicalNodesToHTML from "./utils/lexicalToHtml";
import styles from "./ReadOnlyEditor.module.css";

const ReadOnlyEditor = ({ editorContent }) => {
  // 在這裡調用函數將 Lexical JSON 轉換為 HTML
  const htmlContent = editorContent
    ? convertLexicalNodesToHTML(editorContent.root.children)
    : "";

  return (
    <div
      className={styles.readOnlyWrapper}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default ReadOnlyEditor;
