import React, { useEffect, useState, useCallback } from "react";
import styles from "./Editor.module.css";
import firebase from "@/utils/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
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
import ReadOnlyEditor from "./ReadOnlyEditor";
import ToggleButton from "../ToggleButton/ToggleButton";
import AlertDialog from "../AlertDialog/AlertDialog";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { BeatLoader } from "react-loader-spinner";

// 讀取Firestore的資料
function EditorInnerComponent({ date, uid, onEditorReady }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (editor) {
      // 當 editor 實例準備好後，通過 callback 傳遞給父組件
      onEditorReady(editor);
    }

    async function loadContent() {
      // setIsLoading(true);
      try {
        const userDiaryRef = doc(
          firebase.db,
          "users",
          uid,
          "diaryEntries",
          date
        );
        const docSnap = await getDoc(userDiaryRef);

        if (docSnap.exists()) {
          const editorStateData = docSnap.data().editorState;
          console.log(editorStateData);
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
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    }

    if (uid && date) {
      loadContent();
    }
  }, [editor, date, uid, onEditorReady]);

  return null;
}

// Editor 主組件
export default function Editor({ date }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [uid, setUid] = useState(null);
  const [editorInstance, setEditorInstance] = useState(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 切換編輯模式的函數
  const toggleEditMode = useCallback(() => {
    setIsEditMode(!isEditMode);
  }, [isEditMode]);

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
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 2200);
      } catch (error) {
        console.error("Error writing document:", error);
      }
    }
  };

  //刪除firebase storage & firestore
  const deleteToFirebase = async () => {
    const diaryEntryRef = doc(firebase.db, "users", uid, "diaryEntries", date);
    const diarySnapshot = await getDoc(diaryEntryRef);

    if (diarySnapshot.exists()) {
      const editorStateData = diarySnapshot.data().editorState;
      let imageUrl;

      // 如果 editorStateData 是字符串，則解析 JSON 以提取圖片 URL
      if (typeof editorStateData === "string") {
        const editorState = JSON.parse(editorStateData);
        imageUrl = editorState.root.children
          .flatMap((child) => child.children || [])
          .find((child) => child.type === "image")?.src;
      }

      // 如果圖片 URL 存在，則提取 Storage 中的文件路徑
      if (imageUrl) {
        const imagePath = decodeURIComponent(
          new URL(imageUrl).pathname.split("/o/")[1].split("?")[0]
        );

        // 創建指向 Storage 中圖片的引用
        const imageRef = ref(getStorage(firebase.app), imagePath);

        // 刪除 Storage 中的圖片
        try {
          await deleteObject(imageRef);
          console.log("Image deleted successfully from Storage.");
        } catch (error) {
          console.error("Failed to delete image from Storage:", error);
          return;
        }
      }

      // 刪除 Firestore 中的日記
      try {
        await deleteDoc(diaryEntryRef);
        console.log("Diary entry deleted successfully from Firestore.");
        setShowDialog(false);
        router.reload();
      } catch (error) {
        console.error("Failed to delete diary entry from Firestore:", error);
      }
    } else {
      console.log("Diary entry does not exist.");
    }
  };
  // 處理對話框的確認操作
  const handleDialogConfirm = () => {
    deleteToFirebase();
  };

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleEditorChange = (editorState) => {
    editorState.read(() => {
      const currentContent = editorState.toJSON();
      setContent(currentContent);
    });
  };
  const handleDeleteClick = () => {
    setShowDialog(true);
  };

  return (
    <LexicalComposer initialConfig={lexicalEditorConfig}>
      {isLoading && (
        <div className={styles.loader}>
          <BeatLoader color="#36D7B7" />
        </div>
      )}
      <ToggleButton isChecked={isEditMode} onToggle={toggleEditMode} />
      {isEditMode ? (
        <>
          {showAlert && (
            <Stack
              sx={{
                width: "300px",
                position: "absolute",
                top: "80px",
                right: "100px",
                zIndex: 1,
              }}
              spacing={2}
            >
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Diary saved successfully!
              </Alert>
            </Stack>
          )}
          <button
            className={styles.addSubmit}
            onClick={() => saveToFirebase(content)}
          >
            Save
          </button>
          <button className={styles.deleteSubmit} onClick={handleDeleteClick}>
            Delete
          </button>
          <Toolbar />
          <Box
            sx={{
              position: "relative",
              background: "white",
              padding: "16px",
              borderRadius: "0px 0px 10px 10px",
              opacity: 0.8,
            }}
          >
            <RichTextPlugin
              contentEditable={<MuiContentEditable />}
              placeholder={
                <Box sx={placeHolderSx}>Enter your text here...</Box>
              }
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
        </>
      ) : (
        <ReadOnlyEditor editorContent={content} />
      )}
      <AlertDialog
        open={showDialog}
        handleClose={handleDialogClose}
        handleConfirm={handleDialogConfirm}
      />
    </LexicalComposer>
  );
}
