export class TasksService {
    constructor($log){
        'ngInject';
        $log.debug('task service loaded');
    }

    getNewTask(){
        return Task();
    }

    getInitialTasks() {
        return [
          Task({ title: 'Write dissertation on ewoks', pomodoros: 3, isActive: true}),
          Task({ title: 'Buy flowers for Malin', pomodoros: 1, isActive: false})
        ];
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
