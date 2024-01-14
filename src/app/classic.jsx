import { useMutation } from '@tanstack/react-query';
import { downVoted, upVoted } from '../api/threadList';
import { Suspense } from 'react';

const Classic = ({
	id,
	title,
	createdBy,
	createdAt,
	post,
	totalComments,
	voted,
	upVote,
	downVote,
	upvotedAction,
	downvotedAction,
}) => {
	return (
		<Suspense fallback='loading'>
			<div className='max-w p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
				<p className='text-xs text-gray-900 dark:text-white'>
					Thread by {createdBy} - {createdAt}
				</p>
				<a href={`/thread/${id}`}>
					<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
						{title}
					</h5>
				</a>
				<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
					{post && post.body}
				</p>
				<button
					type='button'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					onClick={() => upvotedAction({ id, upVote, downVote, voted })}
				>
					<svg
						className={
							voted !== 1
								? 'w-6 h-6 text-gray-800 dark:text-black'
								: 'w-6 h-6 text-gray-800 dark:text-white'
						}
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 10 14'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M5 13V1m0 0L1 5m4-4 4 4'
						/>
					</svg>

					<span className='sr-only'>Icon description</span>
				</button>
				{upVote - downVote}
				<button
					type='button'
					className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
					onClick={() => downvotedAction({ id, upVote, downVote, voted })}
				>
					<svg
						className={
							voted !== 2
								? 'w-6 h-6 text-gray-800 dark:text-black'
								: 'w-6 h-6 text-gray-800 dark:text-white'
						}
						aria-hidden='true'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 10 14'
					>
						<path
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M5 1v12m0 0 4-4m-4 4L1 9'
						/>
					</svg>
					<span className='sr-only'>Icon description</span>
				</button>
				<p className='text-xs font-black text-gray-900 dark:text-white'>
					{totalComments} comments
				</p>
			</div>
		</Suspense>
	);
};

export default Classic;
