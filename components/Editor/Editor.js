import React, { useEffect, useState } from "react";
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
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";
import { useRouter } from "next/router.js";

// 讀取Firestore的資料
function EditorInnerComponent({ date, uid }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    async function loadContent() {
      const userDiaryRef = doc(firebase.db, "users", uid, "diaryEntries", date);
      const docSnap = await getDoc(userDiaryRef);

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
  }, [editor, date, uid]);

  return null;
}

// Editor 主组件
export default function Editor({ date }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // 保存内容到Firebase
  const saveToFirebase = async (currentContent) => {
    if (uid && date) {
      try {
        const serializedState = JSON.stringify(currentContent);
        const userDiaryRef = doc(
          firebase.db,
          "users",
          uid,
          "diaryEntries",
          date
        );
        await setDoc(userDiaryRef, { editorState: serializedState });
        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error writing document:", error);
      }
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
        Save
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
        {uid && date && <EditorInnerComponent date={date} uid={uid} />}
      </Box>
    </LexicalComposer>
  );
}
