export class MainController {
  constructor ($interval, $log) {
    'ngInject';
    const vm = this,
          currentTime = getPomorodoTime();

    Object.assign(vm, {
        // timer
        timeLeft: formatTime(currentTime),
        currentTime,
        // tasks
        tasks: getInitialTasks(),
        newTask: getNewTask(),
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
      if (this.currentTime === 0) this.completePomodoro();
      else this.timeLeft = formatTime(this.currentTime);
  }
  stopPomodoro(){
      this.performingTask = false;
      this.$interval.cancel(this.timerInterval);
  }
  completePomodoro(){
      this.stopPomodoro();
      this.resetPomodoroTimer();
  }
  addNewTask(){
      this.tasks.push(this.newTask);
      this.newTask = getNewTask();
  }
  resetPomodoroTimer(){
      this.currentTime = getPomorodoTime();
      this.timeLeft = formatTime(this.currentTime);
  }
}

function getInitialTasks(){
    return [
      { title: 'Write dissertation on ewoks', rank: 0, pomodoros: 3},
      { title: 'Buy flowers for Malin', rank: 1, pomodoros: 1 }
    ];
}

function getPomorodoTime(){
    return 25*60;
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
    return {
        title: '', 
        pomodoros: 1,
        workedPomodoros: 0
    };
}
