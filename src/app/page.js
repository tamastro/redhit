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
	await queryClient.prefetchQuery({
		queryKey: ['threads'],
		queryFn: getThreads,
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
