import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserRole } from "../services/user.js";
import { Card, CardMedia, CardContent, Typography, Chip, Stack, Box, Button } from "@mui/material";
import { Pencil } from "lucide-react";

function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const isAdmin = getUserRole() === "ADMIN";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        const sorted = res.data.data.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
        setBlogs(sorted);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const getBlogDetailPath = (slug) => {
    return isAdmin ? `/admin/blogs/${slug}` : `/blogs/${slug}`;
  };

  if (!blogs.length) return null;

  const [featuredBlog, ...otherBlogs] = blogs;

  return (
    <Box className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={5}>
        <Typography variant="h4" fontWeight="bold">
          Blogs
        </Typography>

        {isAdmin && (
          <Button variant="contained" onClick={() => navigate("/admin/create-blog")}>
            Tạo bài viết mới
          </Button>
        )}
      </Stack>

      {/* Featured Blog */}
      <Card
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          mb: 8,
          boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: "0 12px 32px rgba(0,0,0,0.1)",
          },
          cursor: "pointer",
        }}
      >
        <CardMedia
          component={Link}
          to={getBlogDetailPath(featuredBlog.Slug)}
          image={featuredBlog.CoverImage || "/default-cover.jpg"}
          alt={featuredBlog.Title}
          sx={{ width: "100%", height: { xs: 220, md: 360 }, objectFit: "cover" }}
        />

        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
            <Typography
              component={Link}
              to={getBlogDetailPath(featuredBlog.Slug)}
              variant="h5"
              fontWeight={800}
              sx={{ color: "#f97316", textDecoration: "none", "&:hover": { textDecoration: "underline" } }}
            >
              {featuredBlog.Title}
            </Typography>

            {isAdmin && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<Pencil size={16} />}
                onClick={() => navigate(`/admin/blogs/${featuredBlog.Slug}/edit`)}
              >
                Edit
              </Button>
            )}
          </Stack>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {stripHTML(featuredBlog.ContentHTML).slice(0, 300)}...
          </Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={1}>
            {(featuredBlog.Tags || []).map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  bgcolor: "grey.100",
                  fontSize: "0.75rem",
                  borderRadius: 1,
                }}
              />
            ))}
          </Stack>

          <Typography variant="caption" color="text.secondary">
            {formatDate(featuredBlog.CreatedAt)}
          </Typography>
        </CardContent>
      </Card>

      {/* Other Blogs */}
      <Stack spacing={4}>
        {otherBlogs.map((blog) => (
          <Card
            key={blog.Slug}
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              },
            }}
          >
            <CardMedia
              component={Link}
              to={getBlogDetailPath(blog.Slug)}
              image={blog.CoverImage || "/default-cover.jpg"}
              alt={blog.Title}
              sx={{
                width: 180,
                height: 120,
                objectFit: "cover",
                flexShrink: 0,
              }}
            />

            <CardContent sx={{ flex: 1 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="start">
                <Box>
                  <Typography
                    component={Link}
                    to={getBlogDetailPath(blog.Slug)}
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{ color: "#f97316", textDecoration: "none" }}
                  >
                    {blog.Title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} className="line-clamp-2">
                    {stripHTML(blog.ContentHTML)}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {(blog.Tags || []).map((tag) => (
                      <Chip key={tag} label={tag} size="small" sx={{ bgcolor: "grey.100", fontSize: "0.75rem" }} />
                    ))}
                  </Stack>

                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                    {formatDate(blog.CreatedAt)}
                  </Typography>
                </Box>

                {isAdmin && (
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Pencil size={16} />}
                    sx={{ mt: 1 }}
                    onClick={() => navigate(`/admin/blogs/${blog.Slug}/edit`)}
                  >
                    Edit
                  </Button>
                )}
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

// Helpers
const stripHTML = (html) => (html || "").replace(/<[^>]+>/g, "");

const formatDate = (date) =>
  new Date(date).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default BlogListPage;
