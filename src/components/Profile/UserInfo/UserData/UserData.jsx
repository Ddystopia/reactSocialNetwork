import React, { useState, useEffect } from "react";
import classNames from "./UserData.module.css";

const UserData = ({ propStatus, authUserId, profile, updateUserStatus }) => {
	const [editMode, setEditMode] = useState(false);
	const [status, setStatus] = useState(propStatus);
	useEffect(() => {
		setStatus(propStatus);
	}, [propStatus]);

	const statusOnChange = (e) => {
		setStatus(e.target.value);
	};

	const anabelEditMode = () => {
		if (authUserId !== profile.userId) return;
		setEditMode(true);
	};

	const disableEditMode = () => {
		setEditMode(false);
		if (propStatus !== status) updateUserStatus(status || "");
	};

	return (
		<article className={classNames.user_info_text}>
			<h3>{profile.fullName || "-----"}</h3>
			<div>About me: {profile.aboutMe || "-----"}</div>
			<div className={classNames.statusContainer}>
				Status:
				{editMode ? (
					<div className={classNames.textarea}>
						<textarea
							autoFocus={true}
							onBlur={disableEditMode}
							type="text"
							value={status}
							onChange={statusOnChange}
						/>
					</div>
				) : (
					<div className={classNames.status} onDoubleClick={anabelEditMode}>
						{propStatus || "-----"}
					</div>
				)}
			</div>
			<div>
				Looking for a job:
				<div
					className={classNames.circle}
					style={{
						backgroundColor: profile.lookingForAJob ? "green" : "red",
					}}
				></div>
				{profile.lookingForAJobDescription || profile.lookingForAJob
					? "-----"
					: ""}
			</div>
		</article>
	);
};
export default UserData;
