import React from 'react';
import BlogEditor from '../admin/BlogEditor';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { Typography, Container, Paper } from '@mui/material';

function CreateBlogPage() {
  const navigate = useNavigate();

const handleSaveToBackend = async (formData) => {
  try {
    await axios.post('/api/blogs', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success('Bài viết đã được lưu!')
    navigate('/admin/blogs');
  } catch (error) {
    console.error('Lỗi khi lưu bài viết:', error);
  }
};


  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 5 }} elevation={3}>
        <Typography variant="h4" mb={3} fontWeight="bold">Tạo bài viết mới</Typography>
        <BlogEditor onSave={handleSaveToBackend} />
      </Paper>
    </Container>
  );
}

export default CreateBlogPage;