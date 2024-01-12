import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getThread } from '../api/threadList';

export default async function Home() {
	const { data } = await getThread();

	return JSON.stringify(data);
}
