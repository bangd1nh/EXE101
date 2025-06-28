import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BlogEditor from '../admin/BlogEditor';
import { toast } from "react-toastify";
import { Typography, Container, Paper } from '@mui/material';

const EditBlogPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/slug/${slug}`);
        setBlog(res.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu bài viết:', error);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleUpdate = async (formData) => {
    try {
      await axios.put(`/api/blogs/${slug}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Đã cập nhật bài viết!')
      navigate('/admin/blogs');
    } catch (err) {
        toast.error('Lỗi khi cập nhật bài viết')
    }
  };

  if (!blog) {
    return <Typography mt={5} align="center">Đang tải dữ liệu...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 5 }} elevation={3}>
        <Typography variant="h4" mb={3} fontWeight="bold">
          Chỉnh sửa bài viết
        </Typography>
        <BlogEditor
          onSave={handleUpdate}
          initialTitle={blog.Title}
          initialContent={blog.ContentHTML}
          initialCoverImage={blog.CoverImage}
          initialTags={blog.Tags || []}
        />
      </Paper>
    </Container>
  );
};

export default EditBlogPage;
