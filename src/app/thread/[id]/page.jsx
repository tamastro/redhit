import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import ThreadDetails from './posts';
import { getPost } from '@/api/post';
import getQueryClient from '@/utils/getQueryClient';

export default async function ThreadDetailsPage({ params }) {
	const queryClient = getQueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['threadDetails'],
		queryFn: () => getPost(params.id),
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<main>
			<HydrationBoundary state={dehydratedState}>
				<ThreadDetails params={params.id} />
			</HydrationBoundary>
		</main>
	);
}
