'use client';

import { downVoted, getThreads, upVoted } from '../api/threadList';
import {
	useInfiniteQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import Card from './card';
import Classic from './classic';
import Compact from './compact';
import { useState } from 'react';

export default function ThreadLists() {
	const queryClient = useQueryClient();
	const [viewStyle, setViewStyle] = useState('card');
	const [sortThread, setSortThread] = useState('');

	const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: ['threads', sortThread],
			queryFn: async ({ pageParam = 0 }) => {
				const allThreadData = await getThreads(pageParam, sortThread);
				return allThreadData.data.allThreads;
			},
			getNextPageParam: (lastPage, allPages) =>
				lastPage.length === 2 ? allPages.length : undefined,
			initialPageParam: 0,
		});

	const upVotedMutation = useMutation({
		mutationFn: upVoted,
		onSettled: () => {
			return queryClient.invalidateQueries(['threads']);
		},
	});

	const downVotedMutation = useMutation({
		mutationFn: downVoted,
		onSettled: () => {
			return queryClient.invalidateQueries(['threads']);
		},
	});

	const upvotedAction = (payload) => {
		upVotedMutation.mutate(payload);
	};

	const downvotedAction = (payload) => {
		downVotedMutation.mutate(payload);
	};

	return (
		<>
			<div className='w-half bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
				<ul
					className='flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800'
					id='defaultTab'
					data-tabs-toggle='#defaultTabContent'
					role='tablist'
				>
					<li className='me-2'>
						<button
							id='about-tab'
							data-tabs-target='#about'
							type='button'
							role='tab'
							aria-controls='about'
							aria-selected='true'
							className='inline-block p-4 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 '
							onClick={() => {
								setSortThread('totalComments');
								return queryClient.invalidateQueries(['threads']);
							}}
						>
							HOT
						</button>
					</li>
					<li className='me-2'>
						<button
							type='button'
							role='tab'
							aria-controls='services'
							aria-selected='false'
							className='inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300'
							onClick={() => {
								setSortThread('upVote');
								return queryClient.invalidateQueries(['threads']);
							}}
						>
							TOP
						</button>
					</li>
					<li className='me-2'>
						<button
							type='button'
							role='tab'
							aria-controls='statistics'
							aria-selected='false'
							onClick={() => {
								setSortThread('id');
								return queryClient.invalidateQueries(['threads']);
							}}
							className='inline-block p-4 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300'
						>
							NEW
						</button>
					</li>
				</ul>
				<select
					name={'viewFilter'}
					id={'viewFilter'}
					onChange={(e) => setViewStyle(e.target.value)}
					className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
				>
					<option value='card'>Card</option>
					<option value='classic'>Classic</option>
					<option value='compact'>compact</option>
				</select>
			</div>
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
					} = threadData) => {
						switch (viewStyle) {
							case 'card':
								return (
									<Card
										id={id}
										title={title}
										createdBy={createdBy}
										createdAt={createdAt}
										post={post}
										totalComments={totalComments}
										voted={voted}
										upVote={upVote}
										downVote={downVote}
										upvotedAction={upvotedAction}
										downvotedAction={downvotedAction}
									/>
								);
								break;
							case 'classic':
								return (
									<Classic
										id={id}
										title={title}
										createdBy={createdBy}
										createdAt={createdAt}
										post={post}
										totalComments={totalComments}
										voted={voted}
										upVote={upVote}
										downVote={downVote}
										upvotedAction={upvotedAction}
										downvotedAction={downvotedAction}
									/>
								);
								break;
							case 'compact':
								return (
									<Compact
										id={id}
										title={title}
										createdBy={createdBy}
										createdAt={createdAt}
										post={post}
										totalComments={totalComments}
										voted={voted}
										upVote={upVote}
										downVote={downVote}
										upvotedAction={upvotedAction}
										downvotedAction={downvotedAction}
									/>
								);
								break;
						}
					},
				)}
			<button
				onClick={() => fetchNextPage()}
				disabled={isFetchingNextPage}
			>
				{isFetchingNextPage
					? 'loading'
					: hasNextPage
					? 'Load More'
					: 'Nothing more to load'}
			</button>
		</>
	);
}
