export default function convertLexicalNodesToHTML(nodes) {
  return nodes
    .map((node) => {
      if (node.type === "list") {
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

        if (childrenHTML === "") {
          return '<p class="empty-paragraph"><br></p>';
        }

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
        if (node.format === 1) {
          textHTML = `<strong>${textHTML}</strong>`;
        } else if (node.format === 2) {
          textHTML = `<em>${textHTML}</em>`;
        }
        return textHTML;
      } else if (node.type === "image") {
        return `<br><figure><img src="${node.src}" width="90%"  alt="${
          node.alt || ""
        }" /></figure>`;
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
