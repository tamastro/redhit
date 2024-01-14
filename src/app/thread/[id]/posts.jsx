'use client';

import { getPost, upVotedComment } from '@/api/post';
import { downVoted, upVoted } from '@/api/threadList';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { find } from 'lodash';

const ThreadDetails = ({ params }) => {
	const { data } = useQuery({
		queryKey: ['posts'],
		queryFn: () => getPost(params.id),
	});

	const upVotedCommentAction = useMutation({
		mutationFn: upVotedComment,
		onSettled: () => {
			return queryClient.invalidateQueries(['posts']);
		},
	});

	const upVotedAction = useMutation({
		mutationFn: upVoted,
		onSettled: () => {
			return queryClient.invalidateQueries(['posts']);
		},
	});

	const downVotedAction = useMutation({
		mutationFn: downVoted,
		onSettled: () => {
			return queryClient.invalidateQueries(['posts']);
		},
	});
	const router = useRouter();

	const {
		id,
		title,
		createdBy,
		createdAt,
		post,
		downVote,
		upVote,
		voted,
		Comments,
	} = data.data.Thread;
	return (
		<>
			<button
				type='button'
				className='px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				onClick={() => router.push('/')}
			>
				<svg
					className='w-6 h-6 text-gray-800 dark:text-white'
					aria-hidden='true'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 8 14'
				>
					<path
						stroke='currentColor'
						stroke-linecap='round'
						stroke-linejoin='round'
						stroke-width='2'
						d='M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13'
					/>
				</svg>
				Back
			</button>
			<div className='w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
				<div className='flex items-center justify-between mb-9'>
					<h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
						{title}
					</h5>
					<button
						type='button'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={() =>
							upVotedAction.mutate({ id, upVote, downVote, voted })
						}
					>
						<svg
							className={
								data.data.Thread.voted !== 1
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
					</button>
					{upVote - downVote}
					<button
						type='button'
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={() =>
							downVotedAction.mutate({ id, upVote, downVote, voted })
						}
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
					</button>
				</div>
				<div className='flow-root'>
					<ul
						role='list'
						className='divide-y divide-gray-200 dark:divide-gray-700'
					>
						<li className='py-3 sm:py-4'>
							<div className='flex items-center'>
								<div className='flex-1 min-w-0 ms-4'>
									<p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
										{post.body}
									</p>
									<p className='text-sm text-gray-500 truncate dark:text-gray-400'>
										{post.postedBy} - {post.postedat}
									</p>
								</div>
							</div>
						</li>

						<label
							for='message'
							class='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
						>
							Add Comment
						</label>
						<textarea
							id='message'
							rows='4'
							class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							placeholder='Write your thoughts here...'
						></textarea>
						<button
							type='button'
							class='px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						>
							Comment
						</button>

						{Comments.map(
							({
								body,
								commentDownVote,
								commentUpVote,
								id: comment_id,
								postedBy,
								ReplyToCommentId,
								voted: commentVoted,
							}) => {
								return (
									<Suspense fallback='...loading'>
										<li
											className='py-3 sm:py-4'
											key={comment_id}
										>
											{ReplyToCommentId && (
												<div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'>
													<p className='font-normal text-gray-700 dark:text-gray-200'>
														{
															find(Comments, {
																id: ReplyToCommentId.toString(),
															}).body
														}
													</p>
													<p className='text-xs font-italic text-gray-700 dark:text-gray-400'>
														{
															find(Comments, {
																id: ReplyToCommentId.toString(),
															}).postedBy
														}
													</p>
												</div>
											)}
											<div className='flex items-center '>
												<div className='flex-shrink-0'>
													<img className='w-8 h-8 rounded-full' />
												</div>
												<div className='flex-1 min-w-0 ms-4'>
													<p className='text-sm font-medium text-gray-900 truncate dark:text-white'>
														{body}
													</p>
													<p className='text-sm text-gray-500 truncate dark:text-gray-400'>
														posted by {postedBy}
													</p>
												</div>
												<div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
													<button
														type='button'
														className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
														onClick={() =>
															upVotedCommentAction.mutate({
																id,
																commentUpVote,
																commentDownVote,
																commentVoted,
															})
														}
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
													</button>
													{commentUpVote - commentDownVote}
													<button
														type='button'
														className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
													</button>
												</div>
											</div>
										</li>
									</Suspense>
								);
							},
						)}
					</ul>
				</div>
			</div>
		</>
	);
};

export default ThreadDetails;
