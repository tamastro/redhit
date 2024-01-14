import {
	dehydrate,
	QueryClient,
	HydrationBoundary,
} from '@tanstack/react-query';
import { getThreads } from '../api/threadList';
import ThreadLists from './threads';
import Header from './header';

export default async function Home() {
	const queryClient = new QueryClient();
	await queryClient.prefetchInfiniteQuery({
		queryKey: ['threads'],
		queryFn: ({ pageParam = 0 }) => {
			const allThreadData = getThreads(pageParam);
			return allThreadData.data.allThreads;
		},
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<main>
			<Header />
			<HydrationBoundary state={dehydratedState}>
				<ThreadLists />
			</HydrationBoundary>
		</main>
	);
}
