export class MainController {
  constructor ($interval, $log, tasksService) {
    'ngInject';
    const vm = this,
          currentTime = getPomodoroTime();

    Object.assign(vm, {
        // timer
        timeLeft: formatTime(currentTime),
        currentTime,
        // tasks
        tasks: tasksService.getInitialTasks(),
        newTask: tasksService.getNewTask(),
        hasTasks(){ return this.tasks.length > 0; },
        filterTerm: '',

        // services
        $interval,
        $log,
        tasksService
    });

    // angular and getters don't seem to work 
    // very well together
    vm.activeTask = this.tasks.find(t => t.isActive);
  }

  addNewTask(){
      this.tasks.push(this.newTask);
      if (this.tasks.length === 1) this.setTaskAsActive(this.newTask);
      this.newTask = this.tasksService.getNewTask();
  }

  removeTask(task){
      const index = this.tasks.indexOf(task);
      if (index !== -1){ 
          if (task.isActive) this.setNextTaskAsActive(index);
          this.tasks.splice(index,1); 
      }
  }

  setNextTaskAsActive(index){
      if (this.tasks.length > index + 1) this.setTaskAsActive(this.tasks[index+1]);
      else if (index > 0) this.setTaskAsActive(this.tasks[index-1]);
  }

  setTaskAsActive(task){
      const currentActiveTask = this.tasks.find(t => t.isActive);
      if (currentActiveTask) currentActiveTask.isActive = false;
      task.isActive = true;
      this.activeTask = task;
  }

  startPomodoro(){
      if (this.performingTask) throw new Error("Can't start a new pomodoro while one is already running");
      this.performingTask = true;
      this.setTimerInterval(getPomodoroTime());
  }

  cancelPomodoro(){
      this.stopPomodoro();
      this.resetPomodoroTimer();
  }

  advanceTimer(){
      this.$log.debug('advancing timer 1 second');
      this.currentTime -= 1;
      if (this.currentTime === 0) {
          if (this.performingTask) this.completePomodoro();
          else this.completeRest();
      }
      else this.timeLeft = formatTime(this.currentTime);
  }

  stopPomodoro(){
      this.performingTask = false;
      this.cleanInterval();
  }

  completePomodoro(){
      this.activeTask.workedPomodoros++;
      this.stopPomodoro();
      this.startRest();
  }

  startRest(){
      this.resting = true;
      this.setupRestTime();
      this.setTimerInterval(getRestTime(this.activeTask));

  }
  setTimerInterval(seconds){
      //console.log('create interval');
      this.cleanInterval(); // make sure we release all intervals
      this.timerInterval = this.$interval(this.advanceTimer.bind(this), 1000, seconds);
  }

  completeRest(){
      this.cleanInterval();
      this.resting = false;
      this.resetPomodoroTimer();
  }

  cleanInterval(){
      if (this.timerInterval) {
          //console.log('stopping interval');
          this.$interval.cancel(this.timerInterval);
          this.timerInterval = null;
      }
  }

  resetPomodoroTimer(){
      this.setTime(getPomodoroTime());
  }

  setupRestTime(){
      this.setTime(getRestTime(this.activeTask));
  }

  setTime(time){
      this.currentTime = time;
      this.timeLeft = formatTime(this.currentTime);
  }
}

function getPomodoroTime(){
    return 25*60;
}
function getRestTime(activeTask){
    if (activeTask.workedPomodoros % 4 === 0) return 20*60;
    return 5*60;
}

function formatTime(time){
    const minutesLeft = Number.parseInt(time/60),
          secondsLeft = Math.round((time/60 - minutesLeft) * 60),
          formattedMinutesLeft = formatDigits(minutesLeft),
          formattedSecondsLeft = formatDigits(secondsLeft);
    return `${formattedMinutesLeft}:${formattedSecondsLeft}`

}

function formatDigits(digits){
    return digits < 10 ? "0" + digits : digits;
}

