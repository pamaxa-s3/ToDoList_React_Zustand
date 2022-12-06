import React from 'react';
import styles from './index.module.scss'
import { useToDoStore } from '../../data/stores/useToDoStore'
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';

export const App: React.FC = () => {

	const [
		tasks,
		createTask,
		updateTask,
		checkedTask,
		removeTask
	] = useToDoStore(state => [
		state.tasks,
		state.createTask,
		state.updateTask,
		state.checkedTask,
		state.removeTask
	])

	return (
		<article className={styles.article}>
			<h1 className={styles.articleTitle}>To Do App</h1>
			<section className={styles.articleSection}>
				<InputPlus
					onAdd={title => title && createTask(title)}
				/>
			</section>
			<section className={styles.articleSection}>
				{!tasks.length && (
					<p className={styles.articleText}>There is no one task</p>
				)}
				{tasks && tasks.sort((a, b) => a.isChecked > b.isChecked ? 1 : -1).map(({ id, isChecked, title }) => (
					<InputTask
						key={id}
						id={id}
						isChecked={isChecked}
						title={title}
						onDone={checkedTask}
						onEdited={updateTask}
						onRemoved={removeTask}
					/>
				))}
			</section>
		</article>
	);
}