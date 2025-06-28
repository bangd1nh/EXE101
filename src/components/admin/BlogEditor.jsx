import React, { useState } from "react";
import { Box, TextField, Button, Typography, Chip, Stack, InputLabel, CircularProgress } from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import axios from "axios";
import { toast } from "react-toastify";
import TiptapToolbar from "./TiptapToolbar";

const BlogEditor = ({ onSave, initialTitle = "", initialContent = "", initialTags = [], initialCoverImage = "" }) => {
  const [title, setTitle] = useState(initialTitle);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(initialCoverImage);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState(initialTags);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image.configure({
        inline: false,
        HTMLAttributes: {
          class: "blog-image",
        },
      }),
    ],
    content: initialContent || "",
  });

  const handleSubImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploadingImage(true);
    try {
      const response = await axios.post("https://exe202-backend-e32f.onrender.com/api/blogs/upload-sub-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.data.imageUrl;
    } catch (error) {
      toast.error("Lỗi upload ảnh");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const url = await handleSubImageUpload(file);
        if (url) {
          editor
            ?.chain()
            .focus()
            .insertContent(
              `<figure>
              <img src="${url}" />
              <figcaption>Nhập caption ở đây...</figcaption>
          </figure>`
            )
            .run();
        }
      }
    };
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImageFile(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveBlog = async () => {
    const contentHTML = editor?.getHTML();
    if (!title.trim() || !contentHTML.trim()) {
      alert("Vui lòng nhập tiêu đề và nội dung");
      return;
    }

    const formData = new FormData();
    formData.append("Title", title);
    formData.append("ContentHTML", contentHTML);
    formData.append("Tags", JSON.stringify(tags));
    if (coverImageFile) {
      formData.append("CoverImage", coverImageFile);
    }

    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      {/* Tiêu đề */}
      <TextField fullWidth label="Tiêu đề bài viết" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} sx={{ mb: 3 }} />

      {/* Ảnh đại diện */}
      <Box sx={{ mb: 2 }}>
        <InputLabel>Ảnh đại diện (Cover Image)</InputLabel>
        <Button variant="outlined" component="label">
          Tải ảnh lên
          <input hidden type="file" accept="image/*" onChange={handleCoverImageChange} />
        </Button>
        {coverImagePreview && (
          <Box mt={2}>
            <img src={coverImagePreview} alt="cover" style={{ width: "100%", borderRadius: 8 }} />
          </Box>
        )}
      </Box>

      {/* Tags */}
      <Box sx={{ mb: 3 }}>
        <InputLabel>Tag (nhập rồi Enter)</InputLabel>
        <form onSubmit={handleAddTag} style={{ marginBottom: 8 }}>
          <TextField
            size="small"
            variant="outlined"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag(e)}
            placeholder="VD: Nhiếp Ảnh, Đời Sống"
          />
        </form>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {tags.map((tag) => (
            <Chip key={tag} label={tag} onDelete={() => handleRemoveTag(tag)} />
          ))}
        </Stack>
      </Box>

      {/* Nội dung bài viết */}
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Nội dung bài viết</Typography>

        <TiptapToolbar editor={editor} onAddImage={addImage} />

        <Box border="1px solid #ccc" borderRadius="8px" p={2} sx={{ position: "relative" }}>
          <EditorContent editor={editor} />
          {uploadingImage && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundColor: "rgba(255,255,255,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
              }}
            >
              <CircularProgress size={40} />
            </Box>
          )}
        </Box>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSaveBlog} disabled={saving} startIcon={saving && <CircularProgress size={18} />}>
        {saving ? "Đang lưu..." : "Lưu bài viết"}
      </Button>
    </Box>
  );
};

export default BlogEditor;
