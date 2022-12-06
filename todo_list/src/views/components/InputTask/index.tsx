import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

interface InputTaskProps {
	id: string;
	title: string;
	isChecked: boolean;
	onDone: (id: string, isChecked: boolean) => void;
	onEdited: (id: string, title: string) => void;
	onRemoved: (id: string) => void;
}

export const InputTask: FC<InputTaskProps> = ({ id, title, isChecked, onDone, onEdited, onRemoved }) => {

	const [checked, setChecked] = useState(isChecked);
	const [isEditMode, setIsEditMode] = useState(false);
	const [value, setValue] = useState(title);
	const editTitleInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		isEditMode && editTitleInputRef?.current?.focus();
	}, [isEditMode])

	return (
		<div className={`${styles.inputTask} ${isChecked ? styles.inputTaskDone : null}`}>
			<label htmlFor="task" className={styles.inputTaskLabel}>
				<input
					type="checkbox"
					className={styles.inputTaskCheckbox}
					name="isDone"
					checked={checked}
					disabled={isEditMode}
					onChange={(e) => {
						setChecked(e.target.checked);
						onDone(id, isChecked)
					}}
				/>
				{
					isEditMode ?
						<input
							type='text'
							className={styles.inputTaskTitleEdit}
							value={value}
							ref={editTitleInputRef}
							onChange={e => setValue(e.target.value)}
							onKeyDown={e => {
								if (e.key === 'Enter') {
									onEdited(id, value)
									setIsEditMode(false);
								}
							}}
						/> :
						<h3 className={styles.inputTaskTitle}>{title}</h3>
				}
			</label>
			{
				isEditMode ?
					<button
						aria-label='Edit'
						className={`${styles.inputTaskButton} ${styles.inputTaskButtonEditDone}`}
						onClick={() => {
							onEdited(id, value);
							setIsEditMode(false);
						}}
					/> :
					<button
						aria-label='Edit'
						className={`${styles.inputTaskButton} ${styles.inputTaskButtonEdit}`}
						disabled={isChecked}
						onClick={() => {
							setIsEditMode(true);
						}}
					/>
			}
			<button
				aria-label='Remove'
				className={`${styles.inputTaskButton} ${styles.inputTaskButtonRemove}`}
				onClick={() => confirm('Are you sure?') && onRemoved(id)}
			/>
		</div>
	)
}