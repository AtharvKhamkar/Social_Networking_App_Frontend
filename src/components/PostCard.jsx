import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { heartIcon } from '../assets';
import commentIcon from '../assets/comment.png';
import likeIcon from '../assets/like.png';
import sendRequestIcon from '../assets/send_request.png';
import shareIcon from '../assets/share.png';
import { fetchComments } from '../features/comment/commentRequest';
import { selectComments } from '../features/comment/commentSlice';
import { likePost } from '../features/postRequest';
import { selectAuth } from '../features/userSlice';
import CommentBox from './CommentBox';

const PostCard = ({ post, avatar }) => {
  const [liked, setLiked] = useState(post.like_status);
  const [showComment, setShowComment] = useState(false);
  const [like_count, setLike_count] = useState(post.like_count);
  const dispatch = useDispatch();

  const auth = useSelector(selectAuth);

  const likeHandler = () => {
    setLiked(!liked);
    setLike_count((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    dispatch(likePost({ token: auth.token, Id: post._id }));
  };

  const commentHandler = () => {
    setShowComment(!showComment);
    dispatch(fetchComments({ token: auth.token, postId: post._id }));
  };

  const allPostComments = useSelector(selectComments);
  console.log(allPostComments);
  return (
    <div className='w-full bg-white rounded-lg p-4 text-gray-400'>
      <div className='flex justify-between items-center my-2'>
        <div className='flex gap-4'>
          <img
            src={avatar}
            alt='profile-image'
            className='rounded-full w-12 h-12 object-cover'
          />
          <div>
            <p className='text-gray-500 font-semibold'>{post.owner}</p>
            <p className='text-sm'>New York, CA</p>
          </div>
        </div>
        <div className='flex items-center justify-center rounded-full bg-[#e1f9fc] w-10 h-10'>
          <img src={sendRequestIcon} alt='send-request' className='w-5 h-5' />
        </div>
      </div>
      <p className='text-gray-500'>{post.description}</p>
      <div>
        <img
          src={post.content}
          className='rounded-lg w-full h-auto object-cover'
        />
      </div>
      <div className='flex justify-between'>
        <div className='flex mt-4 mb-2 items-center gap-2 text-gray-500'>
          <button onClick={likeHandler}>
            {liked === true ? (
              <button>
                <img src={heartIcon} alt='heart-icon' className='w-4 h-4' />
              </button>
            ) : (
              <img src={likeIcon} alt='like-icon' className='w-4 h-4' />
            )}
          </button>
          <span
            className={`text-sm mr-4 inline-block transition-transform duration-200 ease-in-out ${
              liked ? 'scale-125' : 'scale-100'
            }`}
          >
            {post.like_count}
          </span>
          <button>
            <img src={commentIcon} alt='comment-icon' className='w-5 h-5' />
          </button>
          <span className='text-sm'>{post.comment_count}</span>
        </div>
        <div className='my-4'>
          <img src={shareIcon} alt='share-icon' className='w-4 h-4' />
        </div>
      </div>
      <button onClick={commentHandler} className='mb-2'>
        View all {post.comment_count} comments
      </button>
      {showComment && (
        <div>
          <hr />
          {allPostComments.map((comment) => (
            <CommentBox
              key={comment._id}
              userName={comment.commentBy}
              comment={comment.content}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
