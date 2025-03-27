import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { posts } from '../services/api';
import PostEditor from '../components/posts/PostEditor';

const CreatePost = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPostMutation = useMutation({
    mutationFn: posts.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      toast.success('Post created successfully!');
      navigate('/my-posts');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create post');
    },
  });

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await createPostMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <PostEditor onSubmit={handleSubmit} isLoading={isSubmitting} />
    </div>
  );
};

export default CreatePost; 