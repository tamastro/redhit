'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import getQueryClient from './getQueryClient';

const Provider = ({ children }) => {
	const [queryClient] = useState(() =>
		getQueryClient({
			defaultOptions: {
				queries: {
					staleTime: 60 * 1000,
				},
			},
		}),
	);
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
};

export default Provider;
