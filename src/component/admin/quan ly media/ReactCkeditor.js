import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { callUpload_Single_Img_baiviet } from "../../../service/api";

export default function App() {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const filePickerCallback = function (cb, value, meta) {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = async function () {
      const file = input.files[0];

      const res = await callUpload_Single_Img_baiviet(file);
      if(res && res.EC === 1){
        cb(`${process.env.REACT_APP_BACKEND_URL}/images/baiviet/${res.data.fileUploaded}`, { alt: file.name });
      }
    };

    input.click();
  };
  return (
    <>
      <Editor
        apiKey="htwmksgkmbhnyfvm52bd7ud6y20qqa47efjw5s9rxklqmkgd"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help | image",
          content_style:
            "body { font-family: Helvetica, Arial, sans-serif; font-size: 14px }",

          file_picker_types: "image",
          file_picker_callback: filePickerCallback,
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
