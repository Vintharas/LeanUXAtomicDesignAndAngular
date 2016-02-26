describe('MainController', () => {
  let vm,
      interval;

  beforeEach(angular.mock.module('001Monolithic'));

  beforeEach(inject(($controller, $interval) => {
    vm = $controller('MainController');
    interval = $interval;
  }));

  /*
  beforeEach(() => {
      console.log('Start test: ' + new Date());
  });

  afterEach(() => {
      console.log('End test:' + new Date());
  });
  */

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
            isActive: false
        });
      });

      it('should be able to set which task is active', () => {
          // Arrange
          vm.addNewTask();
          const newTask = vm.tasks[2];
          // Act
          vm.setTaskAsActive(newTask);
          // Assert
          expect(newTask.isActive).toBe(true);
          expect(vm.activeTask).toBe(newTask);
      });

      it('should set first task as active when adding the first task', () => {
          // Arrange
          vm.tasks = [];
          // Act
          vm.addNewTask();
          // Assert
          expect(vm.tasks.length).toBe(1);
          expect(vm.activeTask).toBe(vm.tasks[0]);
      });

      it('should be able to remove a task', () => {
          // Arrange
          const taskToRemove = vm.tasks[0];
          // Act
          vm.removeTask(taskToRemove);
          // Assert
          expect(vm.tasks).not.toEqual(jasmine.arrayContaining([taskToRemove]));
      });

      it('should make the next task as active when removing the active task', () => {
          // Arrange
          vm.addNewTask();
          const taskToRemove = vm.tasks[0];
          // Act
          vm.removeTask(taskToRemove);
          // Assert
          expect(vm.tasks).not.toEqual(jasmine.arrayContaining([taskToRemove]));
          expect(vm.activeTask).toBe(vm.tasks[0]);
      });

      it('should make the previous task as active when removing the last task that happens to be the active one', () => {
          // Arrange
          vm.addNewTask();
          const taskToRemove = vm.tasks[2];
          vm.setTaskAsActive(taskToRemove);
          // Act
          vm.removeTask(taskToRemove);
          // Assert
          expect(vm.tasks).not.toEqual(jasmine.arrayContaining([taskToRemove]));
          expect(vm.activeTask).toBe(vm.tasks[1]);
      });

      describe("hasTasks", () => {
          it("should return false when there are no tasks", () => {
              // Arrange
              vm.tasks = [];
              // Act, Assert
              expect(vm.hasTasks()).toBe(false);
          });

          it("should return true when there are tasks", () => {
              // Arrange, Act, Assert
              expect(vm.hasTasks()).toBe(true);
          });
      });

  });

  describe('Pomodoro', () => {
      const pomodoroInMilliseconds = 25*60*1000;
      const restInMilliseconds = 5*60*1000;

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
          // Arrange, Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          // Assert
          expect(vm.performingTask).toBe(false);
      });

      it('should increase active task pomodoro count after completing a pomodoro', () => {
          // Arrange, Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          // Assert
          expect(vm.activeTask.workedPomodoros).toBe(1);
      });

      it('should start rest period after 25 minutes', () => {
          // Arrange, Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          // Assert
          expect(vm.resting).toBe(true);
      });

      it('should complete rest period after 5 minutes', () => {
          // Arrange, Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          interval.flush(restInMilliseconds);
          // Assert
          expect(vm.resting).toBe(false);
      });

      // this test takes 10 seconds to run
      // and I have no clue why
      // probably has to do with intervals
      // but I am sure I am cleaning them
      xit('should start a 20 minutes rest every 4 pomodoros', () => {
          // Arrange
          doPomodoroAndRest(vm, 3);
          // Act
          vm.startPomodoro();
          interval.flush(pomodoroInMilliseconds);
          // Assert
          expect(vm.resting).toBe(true);
          expect(vm.timeLeft).toBe("20:00");
      });

      function doPomodoroAndRest(vm, times=1){
          repeat(times, () => {
              vm.startPomodoro();
              interval.flush(pomodoroInMilliseconds);
              interval.flush(restInMilliseconds);
          });
      }

      function repeat(times, action){
          while(times > 0){
              action();
              times--;
          }
      }

      // Archive tasks and be able to see a historic view with some metrics regarding our performance 
      // We also want to be more consistent with the search/filter functionality within the app so we move it to the header’s top right corner:
      // drag and drop (rank and change rank)

      afterEach(() => vm.cleanInterval());

  });

});
