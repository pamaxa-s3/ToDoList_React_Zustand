import React, { FC, useCallback, useState } from 'react'
import styles from './index.module.scss'

interface InputPlusProps {
	onAdd: (title: string) => void;
}

export const InputPlus: FC<InputPlusProps> = ({ onAdd }) => {

	const [inputValue, setInputValue] = useState('');
	const addTask = useCallback(() => {
		onAdd && onAdd(inputValue);
		setInputValue('');
	}, [inputValue]);

	return (
		<div className={styles.inputPlus}>
			<input type="text"
				className={styles.inputPlusValue}
				value={inputValue}
				placeholder='Type your text here...'
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={e => e.key === 'Enter' && addTask()}
			/>
			<button
				className={styles.inputPlusButton}
				aria-label='Add'
				onClick={addTask}
			/>
		</div>
	)
}