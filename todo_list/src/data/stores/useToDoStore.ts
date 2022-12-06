import { generateId } from './../helpers';
import create, { State, StateCreator } from 'zustand'

interface Task {
	id: string;
	isChecked: boolean;
	title: string;
	createdAt: number;
}

interface ToDoStore {
	tasks: Task[];
	createTask: (title: string) => void;
	checkedTask: (id: string, isChecked: boolean) => void;
	updateTask: (id: string, title: string) => void;
	removeTask: (id: string) => void;
}

function isToDoStore(object: any): object is ToDoStore {
	return 'tasks' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) =>
	config(
		(nextState, ...args) => {
			isToDoStore(nextState) && window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
			// console.log('  applying', args)
			set(nextState, ...args)
			// console.log('  new state', get())
		},
		get,
		api
	)


const getCurrentState = () => {
	try {
		const currentState = JSON.parse(window.localStorage.getItem('tasks') || '[]') as Task[];
		return currentState;
	} catch (error) {
		window.localStorage.setItem('tasks', '[]');
	}

	return [];
}

export const useToDoStore = create<ToDoStore>(localStorageUpdate((set, get) => ({
	tasks: getCurrentState(),

	createTask: (title) => {
		const { tasks } = get();
		const newTask = {
			id: generateId(),
			isChecked: false,
			title,
			createdAt: Date.now()
		}

		set({
			tasks: [newTask].concat(tasks)
		})
	},

	updateTask: (id: string, title: string) => {
		const { tasks } = get();
		set({
			tasks: tasks.map(task => ({
				...task,
				title: task.id === id ? title : task.title
			}))
		})
	},

	checkedTask: (id: string, isChecked: boolean) => {
		const { tasks } = get();
		set({
			tasks: tasks.map(task => ({
				...task,
				isChecked: task.id === id ? !isChecked : task.isChecked
			}))
		})
	},

	removeTask: (id: string) => {
		const { tasks } = get();
		set({
			tasks: tasks.filter(task => task.id !== id)
		})
	}
})))