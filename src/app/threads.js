'use client';

import { getThreads } from '../api/threadList';
import { useQuery } from '@tanstack/react-query';

export default function ThreadLists() {
	// This useQuery could just as well happen in some deeper child to
	// the "HydratedPosts"-component, data will be available immediately either way
	const { data } = useQuery({
		queryKey: ['posts'],
		queryFn: getThreads,
	});

	// This query was not prefetched on the server and will not start
	// fetching until on the client, both patterns are fine to mix
	// const { data: otherData } = useQuery({
	// 	queryKey: ['posts-2'],
	// 	queryFn: getThreads,
	// });

	return JSON.stringify(data);
}
