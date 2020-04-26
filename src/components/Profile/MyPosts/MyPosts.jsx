import React from "react";
import classNames from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
	const postMessages = props.data
		.map((item) => (
			<Post
				message={item.message}
				header={item.header}
				likesCount={item.likesCount}
				id={item.id}
				key={item.id}
			/>
		))
		.reverse();

	const changeTextareaValue = (event) => {
		const value = event.target.value;
		props.changeTextareaValue(value)
	};
	const addPost = () => {
		props.addPost();
	};

	return (
		<div className={classNames.posts}>
			<h2>My posts</h2>
			<form name="newPost" className="newPost">
				<textarea
					placeholder="Type new post"
					onChange={changeTextareaValue}
					value={props.textareaValue}
				/>
				<input onClick={addPost} value="Send" type="button" />
			</form>
			<section>{postMessages}</section>
		</div>
	);
};
export default MyPosts;
