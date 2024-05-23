"use client";
import "@wangeditor/editor/dist/css/style.css"; // import css

import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig } from "@wangeditor/editor";
import { i18nChangeLanguage } from "@wangeditor/editor";

// Switch language - 'en' or 'zh-CN'
i18nChangeLanguage("en");

const Rich = () => {
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

  return (
    <div style={{ width: "300px", border: "1px solid #ccc", zIndex: 100 }}>
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
        style={{ height: "200px", overflowY: "hidden" }}
      />
    </div>
  );
};

export default Rich;
