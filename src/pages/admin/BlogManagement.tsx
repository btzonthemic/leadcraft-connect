import BlogPostEditor from "@/components/BlogPostEditor";
import { AdminLayout } from "@/components/layouts/AdminLayout";

const BlogManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Blog Management</h1>
        </div>
        <BlogPostEditor />
      </div>
    </AdminLayout>
  );
};

export default BlogManagement;