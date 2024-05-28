"use client";
import React, { useState, useCallback, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

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
import { addPost } from "@/lib/actions/actionsClient";
import { convertToHTML } from "draft-convert";
import "@wangeditor/editor/dist/css/style.css"; // import css
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { i18nChangeLanguage } from "@wangeditor/editor";
import { useAddPost } from "@/hooks";
import { createClient } from "@/utils/supabase/client";
import { message } from "antd";
import { useRouter } from "next/navigation";

i18nChangeLanguage("en");

const Add = () => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const { mutateAsync: addPostToDb, isPending: isLoading, isSuccess } = useAddPost(); // TS syntax

  // editor content
  const [html, setHtml] = useState("");

  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS syntax
  // const toolbarConfig = { }                        // JS syntax

  const editorConfig: Partial<IEditorConfig> = {
    // TS syntax
    // const editorConfig = {                       // JS syntax
    placeholder: "Type here...",
  };
  const router = useRouter();
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingPost, setIsUploadingPost] = useState(false);
  // Get User Email

  const [email, setEmail] = useState("");
  useEffect(() => {
    (async function () {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email);
    })();
  }, []);

  // Timely destroy editor, important!
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const [title, setTitle] = useState("");

  const [selectValue, setSelectValueChange] = useState("");
  const [files, setFiles] = useState(null);
  const onDrop = useCallback(async (acceptedFiles: any) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFiles(acceptedFiles[0]);
    }
  }, []);

  const [postText, setPostText] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };
  const handleUploadPost = async () => {
    if (!title) {
      message.error("Title cannot be empty!!");
      return;
    }

    if (html === "<empty string>") {
      message.error("You have not written an Post!!!");
      return;
    }

    setIsUploadingImage(true);
    const response = await uploadImage(files);
    setIsUploadingImage(false);
    const data = {
      content: html,
      title: title,
      category: selectValue,
      coverImage: response?.url,
      slug: title.replace("", "-"),
      user: email,
    };

    if (!response) {
      return message.error("Oops, Its seem you are yet to upload a cover image");
    }

    setIsUploadingPost(true);
    const addPostResponse = await addPostToDb(JSON.stringify(data));
    const { error } = addPostResponse;
    setIsUploadingPost(false);
    if (error) {
      return message.error("An error had occured, while adding post");
    }
    router.push("/");
    return message.success("Post Uploaded Successfully!!!");
  };

  return (
    <div className="editor-grid p-[2rem] gap-3">
      <div>
        <Input placeholder="Title" className="outline-none" onChange={handleTitle} />
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
          mode="light"
          style={{ height: "500px", overflowY: "hidden" }}
          className="mt-4"
        />
        {/* <textarea disabled value={draftToHtml(convertToRaw(editorState.getCurrentContent()))} /> */}
      </div>
      <div className="">
        <div className="flex gap-x-2 items-center">
          <Button onClick={handleUploadPost} className="bg-black text-white flex gap-2">
            <Upload size={16} /> Upload
          </Button>
          <Button>Save as Draft</Button>
          {isLoading && <Loader2 className="animate-spin" />}
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
            className="border-dotted overflow-hidden border rounded-sm flex items-center justify-center p-[2rem]"
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div className="w-full">
              {files ? (
                <div className="text-left">{files.name}</div>
              ) : isDragActive ? (
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
            <div className="flex items-center gap-2 text-gray-400 transition-all">
              <Loader2 size={18} className={`${isUploadingImage && "animate-spin  text-black"}`} />
              <p className={`${isUploadingImage && "text-black"}`}>Uploading Image</p>
            </div>

            <div className="flex items-center gap-2 text-gray-400 mt-3 transition-all">
              <Loader2 size={18} className={`${isUploadingPost && "animate-spin text-black"}`} />
              <p className={`${isUploadingPost && " text-black"}`}>Uploading Post</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
