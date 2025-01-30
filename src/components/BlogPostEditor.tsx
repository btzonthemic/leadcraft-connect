import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface BlogPostFormData {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  slug: string;
}

const BlogPostEditor = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<BlogPostFormData>();
  const [isGenerating, setIsGenerating] = useState(false);

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

  const generateContent = async (type: 'title' | 'excerpt' | 'content', topic: string) => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-content', {
        body: { type, topic }
      });

      if (error) throw error;
      
      if (data.content) {
        setValue(type, data.content);
        toast.success(`Generated ${type} successfully!`);
      }
    } catch (error) {
      console.error('Error generating content:', error);
      toast.error(`Failed to generate ${type}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="title">Title</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => generateContent('title', 'heat pumps')}
            disabled={isGenerating}
          >
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Title
          </Button>
        </div>
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
        <div className="flex items-center justify-between">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => generateContent('excerpt', 'heat pumps')}
            disabled={isGenerating}
          >
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Excerpt
          </Button>
        </div>
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
        <div className="flex items-center justify-between">
          <Label htmlFor="content">Content</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            onClick={() => generateContent('content', 'heat pumps')}
            disabled={isGenerating}
          >
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Content
          </Button>
        </div>
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