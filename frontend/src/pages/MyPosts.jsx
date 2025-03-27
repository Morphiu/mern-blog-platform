import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import PostCard from '../components/posts/PostCard';
import { posts } from '../services/api';

const MyPosts = () => {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: myPosts, isLoading } = useQuery({
    queryKey: ['my-posts'],
    queryFn: posts.getMyPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: posts.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['my-posts']);
      toast.success('Post deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    },
  });

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await deletePostMutation.mutateAsync(postId);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!myPosts?.length) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">No posts yet</h2>
        <p className="text-gray-600">Create your first post to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">My Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {myPosts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPosts; 