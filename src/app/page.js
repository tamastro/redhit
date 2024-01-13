import {
	dehydrate,
	QueryClient,
	HydrationBoundary,
} from '@tanstack/react-query';
import { getThreads } from '../api/threadList';
import ThreadLists from './threads';

export default async function Home() {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ['threads'],
		queryFn: getThreads,
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<main>
			<h1>REDHIT</h1>
			<HydrationBoundary state={dehydratedState}>
				<ThreadLists />
			</HydrationBoundary>
		</main>
	);
}
