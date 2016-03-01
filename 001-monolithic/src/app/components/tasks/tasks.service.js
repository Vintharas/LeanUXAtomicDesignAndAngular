const TASKS_KEY = "tasks",
      ARCHIVED_TASKS_KEY = "archived tasks";

// TODO: unit test this
export class TasksService {
    constructor($log, localStorageService){
        'ngInject';
        
        Object.assign(this, {
            tasks: new Map(),
            archivedTasks: new Map(),
            localStorageService,
            $log
        });

        this.loadTasks();
    }

    loadTasks(){
        this.loadActiveTasks();
        this.loadArchivedTasks();
    }

    loadActiveTasks(){
        let tasks = this.localStorageService.get(TASKS_KEY);    
        if (tasks === null){
            this.initializeLocalStorage(TASKS_KEY, getInitialTasks());
            tasks = getInitialTasks();
        }
        this.$log.debug('restored tasks from local storage: ', tasks);
        tasks.forEach(t => this.tasks.set(t.id, t));
    }

    loadArchivedTasks(){
        let tasks = this.localStorageService.get(ARCHIVED_TASKS_KEY);    
        if (tasks === null){
            this.initializeLocalStorage(ARCHIVED_TASKS_KEY, []);
            tasks = [];
        }
        this.$log.debug('restored archived tasks from local storage: ', tasks);
        tasks.forEach(t => this.archivedTasks.set(t.id, t));
    }

    getTasks() {
        return [...this.tasks.values()];
    }

    getArchivedTasks(){
        return [...this.archivedTasks.values()];
    }

    saveTask(task){
        this.tasks.set(task.id, task);
        this.saveTasks();
    }

    archiveTask(task){
        this.tasks.delete(task.id);
        this.archivedTasks.set(task.id, task);
        this.saveTasks();
        this.saveArchivedTasks();
    }

    removeTask(task){
        this.tasks.delete(task.id);
        this.saveTasks();
    }

    saveTasks(){
        this.localStorageService.set(TASKS_KEY, [...this.tasks.values()]);
    }

    saveArchivedTasks(){
        this.localStorageService.set(ARCHIVED_TASKS_KEY, [...this.archivedTasks.values()]);
    }

    initializeArchivedTasks(){
        this.archivedTasks = this.localStorageService.get(ARCHIVED_TASKS_KEY);
        if (this.tasks === null){
            this.initializeLocalStorage(ARCHIVED_TASKS_KEY, []);
            this.archivedTasks = [];
        }
    }

    initializeLocalStorage(key, value){
        this.localStorageService.set(key, value);
    }

}

export function Task({title='', pomodoros=1, isActive=false}={}){
    return {
        title, 
        pomodoros,
        workedPomodoros: 0,
        isActive: isActive,
        id: guid()
    };
}

function getInitialTasks(){
    return [
      Task({ title: 'Write dissertation on ewoks', pomodoros: 3, isActive: true}),
      Task({ title: 'Buy flowers for Malin', pomodoros: 1, isActive: false})
    ];
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
