describe('MainController', () => {
  let vm,
      interval;

  beforeEach(angular.mock.module('001Monolithic'));

  beforeEach(inject(($controller, $interval) => {
    vm = $controller('MainController');
    interval = $interval;
  }));

  describe('Tasks', () => {

      it('should define 2 initial tasks', () => {
        // Arrange, Act, Assert
        expect(angular.isArray(vm.tasks)).toBeTruthy();
        expect(vm.tasks.length).toBe(2);
      });

      it('should be able to add new tasks', () => {
        // Arrange
        vm.addNewTask();
        // Act, Assert
        expect(vm.tasks.length).toBe(3);
        const newTask = vm.tasks[2];
        expect(newTask).toEqual({
            title: '',
            pomodoros: 1,
            workedPomodoros: 0
        });
      });
  });

  describe('Pomodoro', () => {

      it('should start with a timer set to 25:00', () => {
        // Arrange, Act, Assert
        expect(vm.timeLeft).toBe("25:00");
      });

      it('should be able to start the pomodoro', () => {
        // Arrange, Act
        vm.startPomodoro();
        // Assert
        expect(vm.performingTask).toBe(true);
      });

      it('should update the pomodoro timer every second', () => {
        // Arrange, Act
        vm.startPomodoro();
        interval.flush(2000);
        // Assert
        expect(vm.timeLeft).toBe("24:58");
      });

      it('should be able to cancel the pomodoro', () => {
        // Arrange, Act
        vm.startPomodoro();
        vm.cancelPomodoro();
        // Assert
        expect(vm.performingTask).toBe(false);
      });

      it('should reset the pomodoro timer after cancelling', () => {
        // Arrange, Act
        vm.startPomodoro();
        interval.flush(2000);
        vm.cancelPomodoro();
        // Assert
        expect(vm.timeLeft).toBe("25:00");
      });

      it('should stop after 25 minutes', () => {
          // Arrange
          const pomodoroInMilliseconds = 25*60*1000;
          // Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          // Assert
          expect(vm.performingTask).toBe(false);
      });

      // increase active task pomodoro count
      // active task?
      // rest time
      // each 4 long rest...

      afterEach(() => vm.cancelPomodoro());

  });

});
