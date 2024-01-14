import {
	dehydrate,
	QueryClient,
	HydrationBoundary,
} from '@tanstack/react-query';
import ThreadDetails from './posts';
import { getPost } from '@/api/post';

export default async function ThreadDetailsPage({ params }) {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['posts'],
		queryFn: () => getPost(params.id),
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<main>
			<HydrationBoundary state={dehydratedState}>
				<ThreadDetails />
			</HydrationBoundary>
		</main>
	);
}
