

 export type TodoRequest  = Partial<Omit<Todo, 'id' | 'created'>>





export interface Todo { 
	id: number;
	title: string;
	created: string; // ISO date string 
	isDone: boolean; 
}

export interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data: T[]
	info?: N
	meta: {
		totalAmount: number
	}
}


 export enum TodoInfoFilterEnum {
	ALL = 'all',
	IN_WORK = 'inWork',
	COMPLETED = 'completed'
}

export  type TempTodo = Omit<Todo, 'id'> & { id: number | string };

