import { atom } from 'nanostores'

export const todos = atom([])
export function fetchTodos(todosAdd) {
    todos.set(todosAdd)
  }
