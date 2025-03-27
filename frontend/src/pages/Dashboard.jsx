import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { posts } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: myPosts, isLoading } = useQuery({
    queryKey: ['my-posts'],
    queryFn: posts.getMyPosts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome back, {user?.username}!
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-4 space-y-4">
              <Link
                to="/create"
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              >
                Create New Post
              </Link>
              <Link
                to="/my-posts"
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                View My Posts
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Recent Posts</h3>
            <div className="mt-4">
              {myPosts?.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {myPosts.slice(0, 3).map((post) => (
                    <li key={post._id} className="py-3">
                      <Link
                        to={`/posts/${post._id}`}
                        className="text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No posts yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Your Stats</h3>
            <div className="mt-4">
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Posts
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {myPosts?.length || 0}
                  </dd>
                </div>
                <div className="px-4 py-5 bg-gray-50 rounded-lg overflow-hidden sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Draft Posts
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {myPosts?.filter(post => post.status === 'draft').length || 0}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 