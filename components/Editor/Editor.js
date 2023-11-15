import React, { useEffect, useState, useCallback } from "react";
import styles from "./Editor.module.css";
import firebase from "@/utils/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { useRouter } from "next/router.js";

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

// 讀取Firestore的資料
function EditorInnerComponent({ date, uid, onEditorReady }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (editor) {
      // 當 editor 實例準備好後，通過 callback 傳遞給父組件
      onEditorReady(editor);
    }

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

    if (uid && date) {
      loadContent();
    }
  }, [editor, date, uid, onEditorReady]);

  // ...其他邏輯

  return null; // 這裡不需要渲染任何東西
}

// Editor 主組件
export default function Editor({ date }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [uid, setUid] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);

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

  const handleEditorReady = useCallback((editor) => {
    setEditorInstance(editor);
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
        window.location.reload();
        alert("save successfully!");
      } catch (error) {
        console.error("Error writing document:", error);
      }
    }
  };

  // 刪除內容並在刪除前顯示確認對話框
  const deleteToFirebase = async () => {
    if (uid && date) {
      // 顯示確認對話框
      if (window.confirm("Are you sure you want to delete？")) {
        try {
          await deleteDoc(doc(firebase.db, "users", uid, "diaryEntries", date));
          console.log("Document successfully deleted!");
          window.location.reload();
        } catch (error) {
          console.error("Error deleting document:", error);
        }
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
      <button
        className={styles.addSubmit}
        onClick={() => saveToFirebase(content)}
      >
        Save
      </button>
      <button
        className={styles.deleteSubmit}
        onClick={() => deleteToFirebase(content)}
      >
        Delete
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
        {uid && date && (
          <EditorInnerComponent
            date={date}
            uid={uid}
            onEditorReady={handleEditorReady}
          />
        )}
      </Box>
    </LexicalComposer>
  );
}
