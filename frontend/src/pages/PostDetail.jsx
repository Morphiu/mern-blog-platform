import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FiEdit2, FiArrowLeft } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import { posts } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => posts.getById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center text-red-600">
        Post not found or you don't have permission to view it.
      </div>
    );
  }

  const isAuthor = user?.id === post.author._id;

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4"
        >
          <FiArrowLeft className="mr-2" />
          Back to Posts
        </Link>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-500">
              <span>By {post.author.username}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          {isAuthor && (
            <Link
              to={`/edit/${post._id}`}
              className="btn btn-secondary flex items-center"
            >
              <FiEdit2 className="mr-2" />
              Edit Post
            </Link>
          )}
        </div>
      </div>

      <div className="prose max-w-none mb-8">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {post.status === 'draft' && (
        <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-md inline-block">
          This post is currently a draft
        </div>
      )}
    </article>
  );
};

export default PostDetail; 