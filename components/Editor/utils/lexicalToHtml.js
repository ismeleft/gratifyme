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
        // 這裡可以根據 format 或 style 來處理段落的對齊方式
        const style =
          node.format === "center" ? ' style="text-align: center;"' : "";
        return `<p${style}>${childrenHTML}</p>`;
      } else if (node.type === "text") {
        let textHTML = node.text;
        // 根據 format 的值來處理粗體和斜體
        if (node.format === 1) {
          textHTML = `<strong>${textHTML}</strong>`;
        } else if (node.format === 2) {
          textHTML = `<em>${textHTML}</em>`;
        }
        return textHTML;
      }
    })
    .join("");
}
