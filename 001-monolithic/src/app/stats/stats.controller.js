export class StatsController{
    constructor(tasksService){
        'ngInject';
        const archivedTasks = tasksService.getArchivedTasks();

        Object.assign(this, {
            archivedTasks, 
            searchTerm: ''
        }, getKPIs(archivedTasks));
    }

}


// this would've been awesome for testing haha
function getKPIs(tasks){
    const allEstimatedPomodoros = tasks
        .map(t => t.pomodoros)
        .reduce((a,t) => a + t, 0);
    const allWorkedPomodoros = tasks
        .map(t => t.workedPomodoros)
        .reduce((a,t) => a + t, 0);
    const pomodorosPerDay = tasks
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

    const totalsPerDay = Array.from(pomodorosPerDay.values())
        .reduce((a, t) => {
            return {
                pomodoros: a.pomodoros + t.pomodoros,
                workedPomodoros: a.workedPomodoros + t.workedPomodoros
            };
        },{pomodoros: 0, workedPomodoros: 0});

    const maxWorkedPomodorosPerDay = Array.from(pomodorosPerDay.values())
        .reduce((a, t) => {
            return a > t.workedPomodoros ? a : t.workedPomodoros;
        }, 0);

    return {
        averageEstimatedPomodoros: allEstimatedPomodoros/tasks.length,
        averageWorkedPomodoros: allWorkedPomodoros/tasks.length,
        averageEstimatedPomodorosPerDay: totalsPerDay.pomodoros/pomodorosPerDay.size,
        averageWorkedPomodorosPerDay: totalsPerDay.workedPomodoros/pomodorosPerDay.size,
        maxWorkedPomodorosPerDay
    }

}
