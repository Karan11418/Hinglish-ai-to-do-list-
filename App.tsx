
import React, { useState, useCallback } from 'react';
import { Task, Status, Priority } from './types';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

const initialTasks: Task[] = [
    { id: '1', title: 'Design the new dashboard UI', description: 'Use Figma to create mockups', status: Status.IN_PROGRESS, priority: Priority.HIGH, tags: ['design', 'ui/ux'], createdAt: new Date(Date.now() - 86400000).toISOString(), dueDate: new Date(Date.now() + 86400000 * 2).toISOString() },
    { id: '2', title: 'Setup the CI/CD pipeline', description: 'Use GitHub Actions', status: Status.TODO, priority: Priority.URGENT, tags: ['devops'], createdAt: new Date().toISOString() },
    { id: '3', title: 'Submit weekly report', description: 'Summarize the team\'s progress', status: Status.DONE, priority: Priority.MEDIUM, tags: ['reporting'], createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), dueDate: new Date(Date.now() - 86400000).toISOString() },
    { id: '4', title: 'Kal 5pm review PR', description: 'Review the pull request for the new feature.', status: Status.TODO, priority: Priority.HIGH, tags: ['code-review'], createdAt: new Date().toISOString(), dueDate: new Date(Date.now() + 86400000).toISOString() },
];

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);

    const addTask = useCallback((parsedTask: { title: string; dueDate?: string; priority?: Priority; tags?: string[] }) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: parsedTask.title,
            status: Status.TODO,
            priority: parsedTask.priority || Priority.MEDIUM,
            tags: parsedTask.tags || [],
            dueDate: parsedTask.dueDate,
            createdAt: new Date().toISOString(),
        };
        setTasks(prevTasks => [newTask, ...prevTasks]);
    }, []);

    const updateTaskStatus = useCallback((taskId: string, newStatus: Status) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );
    }, []);

    const deleteTask = useCallback((taskId: string) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-6 lg:p-8">
                <div className="max-w-4xl mx-auto mb-8">
                    <TaskInput onAddTask={addTask} />
                </div>
                <TaskList tasks={tasks} onUpdateTaskStatus={updateTaskStatus} onDeleteTask={deleteTask} />
            </main>
        </div>
    );
};

export default App;
