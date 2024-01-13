export const getThreads = async () => {
	const res = await fetch('http://localhost:3000/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: 'query getAllThread {allThreads {id title}}',
		}),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json();
};
