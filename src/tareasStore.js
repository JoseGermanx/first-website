import { atom } from 'nanostores'

export const tareas = atom([]);
export function addTarea(tarea) {
    tareas.set([...tareas.get(), tarea])
}