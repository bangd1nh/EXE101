import React from 'react';
import { Stack, IconButton, Tooltip } from '@mui/material';
import {
  Bold, Italic, Heading1, Heading2, List, ListOrdered,
  Image as ImageIcon, Undo, Redo
} from 'lucide-react';

const TiptapToolbar = ({ editor, onAddImage }) => {
  if (!editor) return null;

  return (
    <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
      <Tooltip title="Bold">
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive('bold') ? 'primary' : 'default'}
        >
          <Bold size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Italic">
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive('italic') ? 'primary' : 'default'}
        >
          <Italic size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 1">
        <IconButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          color={editor.isActive('heading', { level: 1 }) ? 'primary' : 'default'}
        >
          <Heading1 size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 2">
        <IconButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}
        >
          <Heading2 size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Bullet List">
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive('bulletList') ? 'primary' : 'default'}
        >
          <List size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Ordered List">
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive('orderedList') ? 'primary' : 'default'}
        >
          <ListOrdered size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Thêm ảnh">
        <IconButton onClick={onAddImage}>
          <ImageIcon size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Undo">
        <IconButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo size={18} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Redo">
        <IconButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo size={18} />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default TiptapToolbar;
