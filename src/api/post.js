export const getPost = async (postId) => {
	const res = await fetch('http://localhost:3000/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			query: `query {Thread (id: ${postId}) {id title createdBy createdAt post totalComments voted  upVote downVote Comments { id postedBy commentUpVote commentDownVote body ReplyToCommentId voted}}}`,
		}),
	});

	if (!res.ok) {
		throw new Error('Network response was not ok');
	}

	return res.json();
};

export const upVotedComment = async ({
	id,
	commentUpVote,
	commentDownVote,
	commentVoted,
}) => {
	let queryMutation;

	switch (commentVoted) {
		case 1:
			queryMutation = `mutation { updateComment(id: ${id} commentUpVote: ${
				commentUpVote - 1
			} commentDownVote: ${commentDownVote} voted: 0) {id voted commentUpVote commentDownVote}}`;
			break;
		case 2:
			queryMutation = `mutation { updateComment(id: ${id} commentUpVote: ${
				commentUpVote + 1
			} commentDownVote: ${
				commentDownVote <= 0 ? commentDownVote : commentDownVote - 1
			} voted: 1) {id voted commentUpVote commentDownVote}}`;
			break;
		case 0:
			queryMutation = `mutation { updateComment(id: ${id} commentUpVote: ${
				commentUpVote + 1
			} commentDownVote: ${commentDownVote} voted: 1) {id voted commentUpVote commentDownVote}}`;
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
