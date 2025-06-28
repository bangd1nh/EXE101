import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Container, Divider, Chip, Stack, CircularProgress } from "@mui/material";

function ViewBlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`https://exe202-backend-e32f.onrender.com/api/blogs/slug/${slug}`)
      .then((res) => setBlog(res.data.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blog) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Box pt={5}>
        {/* Tiêu đề */}
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {blog.Title}
        </Typography>

        {/* Tag và ngày */}
        <Stack direction="row" spacing={1} mb={2} alignItems="center" flexWrap="wrap">
          {blog.Tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" />
          ))}
          <Typography variant="caption" color="text.secondary">
            {new Date(blog.CreatedAt).toLocaleDateString("vi-VN", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Stack>

        {/* Ảnh cover */}
        {blog.CoverImage && (
          <Box component="img" src={blog.CoverImage} alt="cover" width="100%" borderRadius={2} mb={3} sx={{ objectFit: "cover" }} />
        )}

        <Divider sx={{ my: 3 }} />

        {/* Nội dung */}
        <Box
          className="blog-content"
          sx={{
            lineHeight: 1.9,
            fontSize: "1.05rem",
            color: "text.primary",

            // Ảnh
            "& img": {
              maxWidth: "100%",
              borderRadius: 2,
              my: 2,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            },

            // Caption
            "& img + p, & img + em, & img + i, & img + span": {
              display: "block",
              textAlign: "center",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: "gray",
              mt: -1,
              mb: 2,
            },

            // Khi dùng figure (nếu sau này làm)
            "& figure": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "24px 0",
            },

            "& figure img": {
              maxWidth: "100%",
              borderRadius: 2,
            },

            "& figure figcaption": {
              textAlign: "center",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: "gray",
              marginTop: "4px",
            },

            // Heading
            "& h1": {
              fontSize: "2rem",
              fontWeight: "bold",
              mt: 4,
              mb: 2,
            },
            "& h2": {
              fontSize: "1.75rem",
              fontWeight: "bold",
              mt: 3,
              mb: 1.5,
            },
            "& h3": {
              fontSize: "1.5rem",
              fontWeight: "bold",
              mt: 2.5,
              mb: 1.2,
            },
            "& p": {
              mb: 2,
            },
            "& ul, & ol": {
              pl: 4,
              mb: 2,
            },
            "& blockquote": {
              borderLeft: "4px solid #ccc",
              paddingLeft: 2,
              color: "text.secondary",
              fontStyle: "italic",
              mb: 2,
            },
            "& a": {
              color: "#1976d2",
              textDecoration: "underline",
              "&:hover": {
                color: "#1565c0",
              },
            },
          }}
          dangerouslySetInnerHTML={{ __html: blog.ContentHTML }}
        />
      </Box>
    </Container>
  );
}

export default ViewBlogPage;
