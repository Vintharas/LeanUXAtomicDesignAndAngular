export class StatsController{
    constructor(tasksService, $scope){
        'ngInject';
        const archivedTasks = tasksService.getArchivedTasks();

        Object.assign(this, {
            archivedTasks, 
            searchTerm: '',
            // services
            tasksService,
        }, getKPIs(archivedTasks));

        $scope.$watch('stats.searchTerm', searchTerm => {
            const filteredTasks = this.archivedTasks
                .filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase())); 
            Object.assign(this, getKPIs(filteredTasks));
        });
    }

    removeTask(task){
        const index = this.archivedTasks.indexOf(task);
        if (index !== -1){ 
            this.archivedTasks.splice(index,1); 
            this.tasksService.removeArchivedTask(task);
        }
    }
}

// this would've been awesome for testing haha
function getKPIs(tasks){
    if (tasks.length === 0) return NO_TASKS_KPIS;

    const allEstimatedPomodoros = getAllEstimatedPomodoros(tasks);
    const allWorkedPomodoros = getAllWorkedPomodoros(tasks);

    const pomodorosPerDay = getPomodorosPerDay(tasks);
    const totalsPerDay = getTotalsPerDay(pomodorosPerDay);
    const maxWorkedPomodorosPerDay = getMaxWorkedPomodorosPerDay(pomodorosPerDay);

    return {
        averageEstimatedPomodoros: allEstimatedPomodoros/tasks.length,
        averageWorkedPomodoros: allWorkedPomodoros/tasks.length,
        averageEstimatedPomodorosPerDay: totalsPerDay.pomodoros/pomodorosPerDay.size,
        averageWorkedPomodorosPerDay: totalsPerDay.workedPomodoros/pomodorosPerDay.size,
        maxWorkedPomodorosPerDay
    }

}

const NO_TASKS_KPIS = {
    averageEstimatedPomodoros: 0,
    averageWorkedPomodoros: 0,
    averageEstimatedPomodorosPerDay: 0,
    averageWorkedPomodorosPerDay: 0,
    maxWorkedPomodorosPerDay: 0 
}

function getAllEstimatedPomodoros(tasks){
    return tasks
        .map(t => t.pomodoros)
        .reduce((a,t) => a + t, 0);
}

function getAllWorkedPomodoros(tasks){
    return tasks
        .map(t => t.workedPomodoros)
        .reduce((a,t) => a + t, 0);
}

function getPomodorosPerDay(tasks){
    return tasks
        .reduce((d,t) => {    
             if (!d.has(t.timestamp.toDateString())){
                d.set(t.timestamp.toDateString(), {pomodoros: t.pomodoros, workedPomodoros: t.workedPomodoros});
             } else {
                const pomodorosThisDay = d.get(t.timestamp.toDateString());
                pomodorosThisDay.pomodoros += t.pomodoros;
                pomodorosThisDay.workedPomodoros += t.workedPomodoros;
             }
             return d;
        }, new Map());
}

function getTotalsPerDay(pomodorosPerDay){
    return Array.from(pomodorosPerDay.values())
        .reduce((a, t) => {
            return {
                pomodoros: a.pomodoros + t.pomodoros,
                workedPomodoros: a.workedPomodoros + t.workedPomodoros
            };
        },{pomodoros: 0, workedPomodoros: 0});
}

function getMaxWorkedPomodorosPerDay(pomodorosPerDay) {
    return Array.from(pomodorosPerDay.values())
        .reduce((a, t) => {
            return a > t.workedPomodoros ? a : t.workedPomodoros;
        }, 0);
}

