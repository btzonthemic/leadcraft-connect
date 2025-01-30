import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  slug: string;
}

const BlogPostEditor = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BlogPostFormData>();

  const onSubmit = async (data: BlogPostFormData) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert([
          { 
            ...data,
            author_id: (await supabase.auth.getUser()).data.user?.id,
            published: false
          }
        ]);

      if (error) throw error;
      
      toast.success("Blog post created successfully!");
    } catch (error) {
      console.error('Error creating blog post:', error);
      toast.error("Failed to create blog post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter post title"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">URL Slug</Label>
        <Input
          id="slug"
          {...register("slug", { required: "Slug is required" })}
          placeholder="enter-url-slug"
        />
        {errors.slug && (
          <p className="text-sm text-red-500">{errors.slug.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          {...register("excerpt", { required: "Excerpt is required" })}
          placeholder="Brief description of the post"
          rows={3}
        />
        {errors.excerpt && (
          <p className="text-sm text-red-500">{errors.excerpt.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          {...register("category", { required: "Category is required" })}
          placeholder="e.g., Heat Pumps, Energy Efficiency"
        />
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          {...register("content", { required: "Content is required" })}
          placeholder="Write your blog post content here..."
          rows={10}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="submit">Save Draft</Button>
      </div>
    </form>
  );
};

export default BlogPostEditor;