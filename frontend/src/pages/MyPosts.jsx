import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { posts } from '../services/api';
import PostCard from '../components/posts/PostCard';

const MyPosts = () => {
  const queryClient = useQueryClient();

  const { data: userPosts, isLoading, error } = useQuery({
    queryKey: ['my-posts'],
    queryFn: posts.getMyPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: posts.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['my-posts']);
      queryClient.invalidateQueries(['posts']);
      toast.success('Post deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete post');
    },
  });

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePostMutation.mutateAsync(postId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading your posts. Please try again later.
      </div>
    );
  }

  if (!userPosts?.length) {
    return (
      <div className="text-center text-gray-600">
        You haven't created any posts yet. Create your first post!
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userPosts.map((post) => (
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