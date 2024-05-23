"use client";
import React, { useState, useCallback, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { category } from "@/constant";
import { Loader2, Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "@/lib/actions/images";
import { addPost } from "@/lib/actions/posts";
import { convertToHTML } from "draft-convert";
import "@wangeditor/editor/dist/css/style.css"; // import css
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { i18nChangeLanguage } from "@wangeditor/editor";

i18nChangeLanguage("en");

const Add = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS syntax
  // const [editor, setEditor] = useState(null)                  // JS syntax

  // editor content
  const [html, setHtml] = useState("<p>hello</p>");

  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS syntax
  // const toolbarConfig = { }                        // JS syntax

  const editorConfig: Partial<IEditorConfig> = {
    // TS syntax
    // const editorConfig = {                       // JS syntax
    placeholder: "Type here...",
  };

  console.log(html);

  // Timely destroy editor, important!
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const [title, setTitle] = useState("");

  const onEditorStateChange = (newEditorState: unknown) => {
    setEditorState(newEditorState);
  };

  const [selectValue, setSelectValueChange] = useState("");
  const [files, setFiles] = useState(null);
  const onDrop = useCallback(async (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      console.log(file);
      setFiles(acceptedFiles[0]);
    }
  }, []);

  const [postText, setPostText] = useState("");

  console.log(postText);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleUploadPost = async () => {
    console.log(files);

    const response = await uploadImage(files);
    const data = {
      content: html,
      title: title,
      category: selectValue,
      coverImage: response?.url,
      slug: title.replace("", "-"),
    };

    const addPostResponse = await addPost(JSON.stringify(data));
    console.log(addPostResponse);
  };
  return (
    <div className="editor-grid p-[2rem] gap-3">
      <div>
        <Input placeholder="Title" onChange={handleTitle} />
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: "1px solid #ccc" }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: "500px", overflowY: "hidden" }}
        />
        {/* <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
      </div>
      <div className="">
        <div className="flex gap-x-2">
          <Button onClick={handleUploadPost} className="bg-black text-white">
            <Upload /> Upload
          </Button>
          <Button>Save as Draft</Button>
        </div>
        <Select onValueChange={setSelectValueChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {category.map((item, index) => (
              <SelectItem key={index} value={item.toLowerCase()}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="mt-[1rem]">
          <h1 className="font-bold">Cover Image</h1>
          <div
            className="border-dotted border rounded-sm flex items-center justify-center"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div>
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-[1rem]">
          <h1 className="font-bold">Status</h1>
          <div className="mt-3">
            <div className="flex items-center gap-3 text-gray-400">
              <Loader2 />
              <p>Uploading Image</p>
            </div>

            <div className="flex items-center gap-3 text-gray-400 mt-3">
              <Loader2 />
              <p>Uploading Post</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
