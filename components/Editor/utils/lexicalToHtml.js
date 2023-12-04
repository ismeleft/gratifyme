export default function convertLexicalNodesToHTML(nodes) {
  return nodes
    .map((node) => {
      if (node.type === "list") {
        // 根據 listType 來決定使用 <ul> 還是 <ol>
        const tag = node.listType === "bullet" ? "ul" : "ol";
        const childrenHTML = node.children
          ? convertLexicalNodesToHTML(node.children)
          : "";
        return `<${tag}>${childrenHTML}</${tag}>`;
      } else if (node.type === "listitem") {
        const childrenHTML = node.children
          ? convertLexicalNodesToHTML(node.children)
          : "";
        return `<li>${childrenHTML}</li>`;
      } else if (node.type === "paragraph") {
        const childrenHTML = node.children
          ? convertLexicalNodesToHTML(node.children)
          : "";

        let alignStyle = "";
        switch (node.format) {
          case "center":
            alignStyle = ' style="text-align: center;"';
            break;
          case "left":
            alignStyle = ' style="text-align: left;"';
            break;
          case "right":
            alignStyle = ' style="text-align: right;"';
            break;
        }

        return `<p${alignStyle}>${childrenHTML}</p>`;
      } else if (node.type === "text") {
        let textHTML = node.text;
        // 根據 format 的值來處理粗體和斜體
        if (node.format === 1) {
          textHTML = `<strong>${textHTML}</strong>`;
        } else if (node.format === 2) {
          textHTML = `<em>${textHTML}</em>`;
        }
        return textHTML;
      } else if (node.type === "image") {
        return `<img src="${node.src}" width="60%"  alt="${node.alt || ""}" />`;
      } else if (node.type === "heading") {
        const level = node.tag;
        const childrenHTML = node.children
          ? convertLexicalNodesToHTML(node.children)
          : "";
        return `<${level}>${childrenHTML}</${level}>`;
      }
    })
    .join("");
}
