import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import { FiSave, FiEye } from 'react-icons/fi';

const PostEditor = ({ post, onSubmit, isLoading }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [tags, setTags] = useState(post?.tags || []);
  const [newTag, setNewTag] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      status: post?.status || 'draft',
    },
  });

  const content = watch('content');

  const handleAddTag = (e) => {
    e.preventDefault();
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, tags });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className="btn btn-secondary flex items-center"
          >
            <FiEye className="mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </button>
          <button
            type="submit"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={isLoading}
            className="btn btn-primary flex items-center"
          >
            <FiSave className="mr-2" />
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            className="input"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          {isPreview ? (
            <div className="prose max-w-none p-4 border rounded-md bg-white">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <textarea
              className="input min-h-[400px]"
              {...register('content', { required: 'Content is required' })}
            />
          )}
          {errors.content && (
            <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-primary-600 hover:text-primary-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddTag} className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              className="input flex-1"
            />
            <button
              type="submit"
              className="btn btn-secondary"
            >
              Add
            </button>
          </form>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            className="input"
            {...register('status')}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default PostEditor; 