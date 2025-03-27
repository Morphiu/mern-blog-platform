import { useQuery } from '@tanstack/react-query';
import { posts } from '../services/api';
import PostCard from '../components/posts/PostCard';

const Home = () => {
  const { data: postsData, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: posts.getAll,
  });

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
        Error loading posts. Please try again later.
      </div>
    );
  }

  if (!postsData?.length) {
    return (
      <div className="text-center text-gray-600">
        No posts found. Be the first to create a post!
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {postsData.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Home; 