'use client';

import { downVoted, getThreads, upVoted } from '../api/threadList';
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';

export default function ThreadLists() {
	const queryClient = useQueryClient();

	const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
		queryKey: ['threads'],
		queryFn: async ({ pageParam = 0 }) => {
			const allThreadData = await getThreads(pageParam);
			return allThreadData.data.allThreads;
		},
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length === 2 ? allPages.length : undefined,
		initialPageParam: 0,
	});

	const upVotedAction = useMutation({
		mutationFn: upVoted,
		onSettled: () => {
			return queryClient.invalidateQueries(['threads']);
		},
	});

	const downVotedAction = useMutation({
		mutationFn: downVoted,
		onSettled: () => {
			return queryClient.invalidateQueries(['threads']);
		},
	});

	return (
		<>
			{data?.pages
				.flat()
				.map(
					({
						id,
						title,
						createdBy,
						createdAt,
						post,
						totalComments,
						voted,
						upVote,
						downVote,
					}) => {
						return (
							<div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
								<p className='text-xs text-gray-900 dark:text-white'>
									Thread by {createdBy} - {createdAt}
								</p>
								<a href='#'>
									<h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
										{title}
									</h5>
								</a>
								<p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
									{post.body}
								</p>
								<a
									href='#'
									className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								>
									Read more
									<svg
										className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 14 10'
									>
										<path
											stroke='currentColor'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											d='M1 5h12m0 0L9 1m4 4L9 9'
										/>
									</svg>
								</a>
								<button
									type='button'
									className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
									onClick={() =>
										upVotedAction.mutate({ id, upVote, downVote, voted })
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

									<span className='sr-only'>Icon description</span>
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
									<span className='sr-only'>Icon description</span>
								</button>
								<p className='text-xs font-black text-gray-900 dark:text-white'>
									{totalComments} comments
								</p>
							</div>
						);
					},
				)}
			<button
				onClick={() => fetchNextPage()}
				disabled={isFetchingNextPage}
			>
				{isFetchingNextPage ? 'loading' : 'NEXT'}
			</button>
		</>
	);
}
