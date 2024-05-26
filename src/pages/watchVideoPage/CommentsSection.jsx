import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import InfiniteScroll from "../../components/InfiniteScroll";
import Comment from "../../components/watchVideoPage/Comment";
import { httpRequest } from "../../services/services";
import "./CommentsSection.scss";
import SwipeableCommentsSection from "./SwipeableCommentsSection";
import PropTypes from "prop-types";
import { formatCompactNumber } from "../../utils/utilityFunction";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/loader/Loader";

const initialCommentsState = {
	list: [],
	isLoading: true,
	nextPageToken: "",
	isDisabled: false,
};

const CommentsSection = ({ videoId, channelId, commentCount }) => {
	const isWideScreen = useMediaQuery("(min-width:1200px)");
	const { isLoggedIn } = useContext(AuthContext);
	const [comments, setComments] = useState(initialCommentsState);

	const { list, isLoading, nextPageToken, isDisabled } = comments;

	const getComments = useCallback(
		async ({ nextPageToken, abortController }) => {
			try {
				const queryParams = {
					part: "snippet",
					videoId: videoId,
					order: "relevance",
					pageToken: nextPageToken,
					returnEntireResponseWithStatusCode: true,
				};

				const response = await httpRequest({
					url: "/commentThreads",
					queryParams,
					abortController: abortController,
				});

				setComments((prevComments) => ({
					...prevComments,
					list: [...prevComments.list, ...response.items],
					isLoading: false,
					nextPageToken: response.nextPageToken,
				}));
			} catch (error) {
				if (error.response && error.response.status === 403) {
					setComments((prevComments) => ({
						...prevComments,
						isDisabled: true,
					}));
				} else {
					console.error("Failed to load comments:", error);
				}
			}
		},
		[videoId]
	);

	const loadMoreComments = () => {
		if (nextPageToken) {
			getComments({ nextPageToken: nextPageToken });
		}
	};

	const handleAddComment = async (event) => {
		event.preventDefault();
		const data = new FormData(event.target);
		const comment = data.get("newComment");

		if (comment === "") {
			return;
		}

		try {
			const queryParams = { part: "snippet" };
			const requestData = {
				snippet: {
					videoId: videoId,
					channelId: channelId,
					topLevelComment: {
						snippet: { textOriginal: comment },
					},
				},
			};
			const res = await httpRequest({
				url: "/commentThreads",
				method: "POST",
				queryParams,
				data: requestData,
			});
			if (res) {
				addNewCommentInList({ newComment: res });
			}
		} catch (error) {
			console.error("Failed to add comment:", error);
		}
	};

	const addNewCommentInList = ({ newComment }) => {
		setComments((prevComments) => ({
			...prevComments,
			list: [newComment, ...prevComments.list],
		}));
	};

	useEffect(() => {
		setComments(initialCommentsState);
		const abortController = new AbortController();
		getComments({ abortController: abortController });
		return () => {
			abortController.abort();
		};
	}, [getComments]);

	const renderItem = (comment) => (
		<Comment
			key={comment.id}
			snippet={comment.snippet.topLevelComment.snippet}
			commentId={comment.id}
			totalReplyCount={comment.snippet.totalReplyCount}
			addNewCommentInList={addNewCommentInList}
		/>
	);

	if (isDisabled) {
		return <h1>Comments are disabled</h1>;
	}

	const renderCommentsSection = () => (
		<>
			<Box className="addComment">
				<Box
					component="img"
					alt="Channel Thumbnail"
					src="https://placehold.jp/150x150.png"
					referrerPolicy="no-referrer"
				></Box>
				<form
					onSubmit={handleAddComment}
					style={{ display: "flex", width: "100%" }}
				>
					<TextField
						label="Add a comment..."
						variant="standard"
						name="newComment"
						sx={{ flex: "1" }}
						autoComplete="off"
						disabled={!isLoggedIn}
					/>
					<Button disabled={!isLoggedIn} type="submit" variant="contained">
						Comment
					</Button>
				</form>
			</Box>
			<Box className="commentsContainer">
				<InfiniteScroll
					items={list}
					fetchMoreData={loadMoreComments}
					renderItem={renderItem}
					isLoading={isLoading}
				/>
			</Box>
		</>
	);

	return isLoading ? (
		<Loader />
	) : (
		<>
			{isWideScreen ? (
				<Box className="commentsSection">
					<h1>{formatCompactNumber(commentCount)} Comments</h1>
					{renderCommentsSection()}
				</Box>
			) : (
				<SwipeableCommentsSection commentCount={commentCount}>
					<Box className="commentsSection">{renderCommentsSection()}</Box>
				</SwipeableCommentsSection>
			)}
		</>
	);
};

CommentsSection.propTypes = {
	videoId: PropTypes.string.isRequired,
	channelId: PropTypes.string.isRequired,
	commentCount: PropTypes.number.isRequired,
};

export default CommentsSection;
