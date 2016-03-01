const TASKS_KEY = "tasks",
      ARCHIVED_TASKS_KEY = "archived tasks";

// TODO: unit test this
export class TasksService {
    constructor($log, localStorageService){
        'ngInject';
        
        Object.assign(this, {
            localStorageService
        });
    }

    getNewTask(){
        return Task();
    }

    getTasks() {
        if (!this.tasks){ 
            this.initializeTasks();
        }
        return [...this.tasks];
    }

    archiveTask(task){
        const index = this.tasks.indexOf(task);
        if (index !== -1){
            this.tasks.splice(task, 1);
        }
        this.archivedTasks.push(task);
        this.saveArchivedTasks();
    }

    saveTasks(){
        this.localStorageService.set(TASKS_KEY, this.tasks);
    }

    saveArchivedTasks(){
        this.localStorageService.set(ARCHIVED_TASKS_KEY, this.archivedTasks);
    }

    initializeTasks(){
        this.tasks = this.localStorageService.get(TASKS_KEY);
        if (this.tasks === null){
            this.initializeLocalStorage(TASKS_KEY, getInitialTasks());
            this.tasks = getInitialTasks();
        }
    }

    initializeArchivedTasks(){
        this.archivedTasks = this.localStorageService.get(ARCHIVED_TASKS_KEY);
        if (this.tasks === null){
            this.initializeLocalStorage(ARCHIVED_TASKS_KEY, []);
            this.archivedTasks = [];
        }
    }

    initializeLocalStorage(key, value){
        this.localStorageService.set(TASKS_KEY, getInitialTasks());
    }

}

function Task({title='', pomodoros=1, isActive=false}={}){
    return {
        title, 
        pomodoros,
        workedPomodoros: 0,
        isActive: isActive
    };
}

function getInitialTasks(){
    return [
      Task({ title: 'Write dissertation on ewoks', pomodoros: 3, isActive: true}),
      Task({ title: 'Buy flowers for Malin', pomodoros: 1, isActive: false})
    ];
}

