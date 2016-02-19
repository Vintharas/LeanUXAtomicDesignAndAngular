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

      it('should have an active task', () => {
          // Arrange, Act, Assert
          expect(vm.activeTask).toBeDefined();
      });

      it('should be able to add new tasks', () => {
        // Arrange, Act
        vm.addNewTask();
        // Assert
        expect(vm.tasks.length).toBe(3);
        const newTask = vm.tasks[2];
        expect(newTask).toEqual({
            title: '',
            pomodoros: 1,
            workedPomodoros: 0,
            isActive: false,
            rank: 0
        });
      });

      it('should be able to set which task is active', (done) => {

          inject(($rootScope) => {
          // Arrange
          vm.addNewTask();
          const newTask = vm.tasks[2];
          // Act
          $rootScope.$apply(() => {
          vm.setTaskAsActive(newTask);
          // Assert
          expect(newTask.isActive).toBe(true);
          expect(vm.activeTask).toBe(newTask);
          done();
          });
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

      it('should increase active task pomodoro count after completing a pomodoro', () => {
          // Arrange
          const pomodoroInMilliseconds = 25*60*1000;
          // Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          // Assert
          expect(vm.activeTask.workedPomodoros).toBe(1);
      });

      it('should start rest period after 25 minutes', () => {
          // Arrange
          const pomodoroInMilliseconds = 25*60*1000;
          // Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          // Assert
          expect(vm.resting).toBe(true);
      });

      it('should complete rest period after 5 minutes', () => {
          // Arrange
          const pomodoroInMilliseconds = 25*60*1000;
          const restInMilliseconds = 5*60*1000;
          // Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          interval.flush(restInMilliseconds);
          // Assert
          expect(vm.resting).toBe(false);
      });

      // set active task manually
      // set active task when there's only one task
      // each 4 long rest you get a 20 minute rest
      // drag and drop (change rank)
      // can't start pomodoro if there are no tasks

      afterEach(() => vm.cancelPomodoro());

  });

});
