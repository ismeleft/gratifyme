import React, { useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MuiContentEditable, placeHolderSx } from "@/components/Editor/style";
import { Box } from "@mui/material";
import Toolbar from "./ToolBar/editor.js";
import lexicalEditorConfig from "./config";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import ImagesPlugin from "../Editor/plugin/ImagePlugin.js";
import styles from "./Editor.module.css";
import firebase from "@/utils/firebase.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

// 讀取Firestore的資料
function EditorInnerComponent({ date }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    async function loadContent() {
      const docRef = doc(firebase.db, "diaryEntries", date);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const editorStateData = docSnap.data().editorState;
        if (editorStateData) {
          editor.update(() => {
            const initialState =
              typeof editorStateData === "string"
                ? JSON.parse(editorStateData)
                : editorStateData;
            editor.setEditorState(editor.parseEditorState(initialState));
          });
        }
      }
    }

    if (date) {
      loadContent();
    }
  }, [editor, date]);

  return null;
}

// Editor 主组件
export default function Editor({ date }) {
  const [content, setContent] = React.useState("");

  const saveToFirebase = async (currentContent) => {
    try {
      const serializedState = JSON.stringify(currentContent);
      const docRef = doc(firebase.db, "diaryEntries", date);
      await setDoc(docRef, { editorState: serializedState });
      console.log("Document successfully written!");
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const currentContent = editorState.toJSON();
      setContent(currentContent);
    });
  };

  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      <button className={styles.submit} onClick={() => saveToFirebase(content)}>
        save
      </button>
      <Toolbar />
      <Box
        sx={{
          position: "relative",
          background: "white",
          paddingTop: "16px",
          borderRadius: "0px 0px 10px 10px",
          opacity: 0.8,
        }}
      >
        <RichTextPlugin
          contentEditable={<MuiContentEditable />}
          placeholder={<Box sx={placeHolderSx}>Enter your text here...</Box>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <OnChangePlugin onChange={handleEditorChange} />
        <HistoryPlugin />
        <ListPlugin />
        <LinkPlugin />
        <ImagesPlugin captionsEnabled={false} />
        {date && <EditorInnerComponent date={date} />}
      </Box>
    </LexicalComposer>
  );
}
