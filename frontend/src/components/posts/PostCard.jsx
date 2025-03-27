import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';

const PostCard = ({ post, onDelete }) => {
  const { user } = useAuth();
  const isAuthor = user?.id === post.author._id;

  return (
    <article className="card hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            <Link to={`/posts/${post._id}`} className="hover:text-primary-600">
              {post.title}
            </Link>
          </h2>
          <div className="flex items-center text-gray-500">
            <span>By {post.author.username}</span>
            <span className="mx-2">•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        {isAuthor && (
          <div className="flex space-x-2">
            <Link
              to={`/edit/${post._id}`}
              className="text-gray-500 hover:text-primary-600"
            >
              <FiEdit2 className="w-5 h-5" />
            </Link>
            <button
              onClick={() => onDelete(post._id)}
              className="text-gray-500 hover:text-red-600"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      <div className="prose max-w-none mb-4">
        <p className="text-gray-600 line-clamp-3">
          {post.content}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Link
          to={`/posts/${post._id}`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Read more →
        </Link>
        {post.status === 'draft' && (
          <span className="text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
            Draft
          </span>
        )}
      </div>
    </article>
  );
};

export default PostCard; 