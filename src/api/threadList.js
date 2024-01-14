export const getThreads = async (page, sort) => {
	console.log('====================================');
	console.log('dalem', sort);
	console.log('====================================');
	const res = await fetch('http://localhost:3000/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query getAllThread {allThreads(perPage: 2 page: ${page} sortField: "${
				sort ? sort : 'id'
			}" sortOrder: "${
				sort ? 'desc' : 'asc'
			}") {id title createdBy createdAt post totalComments voted upVote downVote}}`,
		}),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json();
};

export const upVoted = async ({ id, upVote, downVote, voted }) => {
	let queryMutation;

	switch (voted) {
		case 1:
			queryMutation = `mutation { updateThread(id: ${id} upVote: ${
				upVote - 1
			} downVote: ${downVote} voted: 0) {id voted upVote downVote}}`;
			break;
		case 2:
			queryMutation = `mutation { updateThread(id: ${id} upVote: ${
				upVote + 1
			} downVote: ${
				downVote <= 0 ? downVote : downVote - 1
			} voted: 1) {id voted upVote downVote}}`;
			break;
		case 0:
			queryMutation = `mutation { updateThread(id: ${id} upVote: ${
				upVote + 1
			} downVote: ${downVote} voted: 1) {id voted upVote downVote}}`;
			break;
	}

	const res = await fetch('http://localhost:3000/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: queryMutation,
		}),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json();
};

export const downVoted = async ({ id, upVote, downVote, voted }) => {
	let queryMutation;

	switch (voted) {
		case 1:
			queryMutation = `mutation { updateThread(id: ${id} upVote: ${
				upVote <= 0 ? upVote : upVote - 1
			} downVote: ${downVote + 1} voted: 2) {id voted upVote downVote}}`;
			break;
		case 2:
			queryMutation = `mutation { updateThread(id: ${id} upVote: ${upVote} downVote: ${
				downVote - 1
			} voted: 0) {id voted upVote downVote}}`;
			break;
		case 0:
			queryMutation = `mutation { updateThread(id: ${id} upVote: ${upVote} downVote: ${
				downVote + 1
			} voted: 2) {id voted upVote downVote}}`;
			break;
	}

	const res = await fetch('http://localhost:3000/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: queryMutation,
		}),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json();
};
