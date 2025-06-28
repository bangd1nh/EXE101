import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Container,
  Divider,
  Chip,
  Stack,
} from '@mui/material';

function ViewBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`/api/blogs/slug/${slug}`)
      .then(res => setBlog(res.data.data))
      .catch(err => console.error(err));
  }, [slug]);

  if (!blog) return <Typography>Đang tải bài viết...</Typography>;

  return (
    <Container maxWidth="md">
      <Box pt={5}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {blog.Title}
        </Typography>
        <Stack direction="row" spacing={1} mb={2}>
          {blog.Tags.map(tag => (
            <Chip key={tag} label={tag} size="small" />
          ))}
          <Typography variant="caption" color="text.secondary">
            {new Date(blog.CreatedAt).toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Typography>
        </Stack>
        {blog.CoverImage && (
          <Box component="img" src={blog.CoverImage} alt="cover" width="100%" borderRadius={2} mb={3} />
        )}
        <Divider sx={{ my: 3 }} />
        <Box dangerouslySetInnerHTML={{ __html: blog.ContentHTML }} />
      </Box>
    </Container>
  );
}

export default ViewBlogPage;
