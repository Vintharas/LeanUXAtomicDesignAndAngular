export class MainController {
  constructor ($interval, $log) {
    'ngInject';
    const vm = this,
          currentTime = getPomodoroTime();

    Object.assign(vm, {
        // timer
        timeLeft: formatTime(currentTime),
        currentTime,
        // tasks
        tasks: getInitialTasks(),
        newTask: getNewTask(),
        get activeTask(){
            return this.tasks.find(t => t.isActive);
        },
        $interval,
        $log
    });
  }

  startPomodoro(){
      this.performingTask = true;
      this.timerInterval = this.$interval(this.advanceTimer.bind(this), 1000);
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
      this.$interval.cancel(this.timerInterval);
  }
  completePomodoro(){
      this.activeTask.workedPomodoros++;
      this.stopPomodoro();
      this.startRest();
  }
  startRest(){
      this.resting = true;
      this.setupRestTime();
      this.timerInterval = this.$interval(this.advanceTimer.bind(this), 1000);
  }
  completeRest(){
      this.resting = false;
      this.resetPomodoroTimer();
  }
  addNewTask(){
      this.tasks.push(this.newTask);
      this.newTask = getNewTask();
  }
  resetPomodoroTimer(){
      this.setTime(getPomodoroTime());
  }
  setupRestTime(){
      this.setTime(getRestTime());
  }
  setTime(time){
      this.currentTime = time;
      this.timeLeft = formatTime(this.currentTime);
  }
}

function getInitialTasks(){
    return [
      Task({ title: 'Write dissertation on ewoks', rank: 0, pomodoros: 3, isActive: true}),
      { title: 'Buy flowers for Malin', rank: 1, pomodoros: 1, isActive: false}
    ];
}

function getPomodoroTime(){
    return 25*60;
}
function getRestTime(){
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

function getNewTask () {
    return Task();
}

function Task({title='', pomodoros=1, isActive=false, rank=0}={}){
    return {
        title, 
        pomodoros,
        workedPomodoros: 0,
        isActive: isActive,
        rank
    };
}

