// export interface TodoRequest { 
// 	title?: string;
//  	isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
//  } 

 export type TodoRequest  = Partial<Omit<Todo, 'id' | 'created'>>


// или так type TodoRequest = Partial<Omit<Todo, "id" | "created">>;



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

// export type todoInfoFilter = "all" | "inWork" | "completed";

 export enum todoInfoFilterEnum {
	all = 'all',
	inWork = 'inWork',
	completed = 'completed'
}

