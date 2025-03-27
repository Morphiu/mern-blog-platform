import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { posts } from '../services/api';
import PostEditor from '../components/posts/PostEditor';

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ['post', id],
    queryFn: () => posts.getById(id),
    enabled: !!id,
  });

  const updatePostMutation = useMutation({
    mutationFn: (data) => posts.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      queryClient.invalidateQueries(['my-posts']);
      queryClient.invalidateQueries(['post', id]);
      toast.success('Post updated successfully!');
      navigate('/my-posts');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update post');
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await updatePostMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingPost) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-600">
        Post not found or you don't have permission to edit it.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <PostEditor
        post={post}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default EditPost; 