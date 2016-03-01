describe('TasksService', () => {
  let localStorageService;

  beforeEach(angular.mock.module('001Monolithic'));

  beforeEach(() => {
      localStorageService = {
          get: sinon.stub(),
          set: sinon.stub()
      };
      angular.mock.module(function($provide){
           $provide.value('localStorageService', localStorageService);
      });
  });

  describe("Given that we have tasks saved in local storage", () => {
      let tasks,
          archivedTasks;

      beforeEach(() => {
          tasks = [
            { title: 'Write dissertation on ewoks', pomodoros: 3, workedPomodoros: 0, isActive: true, id: 1}
          ]; 
          archivedTasks = [
            { title: 'Done done done done', pomodoros: 1, workedPomodoros: 10, isActive: false, id: 2}
          ];
          localStorageService.get.withArgs("tasks").returns(tasks);
          localStorageService.get.withArgs("archived tasks").returns(archivedTasks);
      });

      it("Should be able to retrieve them", inject((tasksService) => {
          // Arrange, Act
          const actualTasks = tasksService.getTasks();
          // Assert
          expect(actualTasks).toEqual(jasmine.arrayContaining([tasks[0]]));
      }));

      it("Should be able to retrieve archived tasks", inject((tasksService) => {
          // Arrange, Act
          const actualTasks = tasksService.getArchivedTasks();
          // Assert
          expect(actualTasks).toEqual(jasmine.arrayContaining([archivedTasks[0]]));
      }));

      it("should be able to save a task", inject((tasksService) => {
         // Arrange
         const newTask = { title: 'Eat tacos', pomodoros: 3, workedPomodoros: 0, isActive: true, id: 22}
         // Act
         tasksService.saveTask(newTask);
         // Assert 
         expect(localStorageService.set.calledOnce).toBe(true);
         expect(localStorageService.set.calledWith("tasks")).toBe(true);
         const call = localStorageService.set.getCall(0);
         expect(call.args[1]).toEqual(jasmine.arrayContaining([newTask]));
      }));

      it("should be able to archive a task", inject((tasksService) => {
         // Arrange
         const taskToArchive = { title: 'Write dissertation on ewoks', pomodoros: 3, workedPomodoros: 2, isActive: true, id: 1}
         // Act
         tasksService.archiveTask(taskToArchive);
         // Assert 
         expect(localStorageService.set.calledTwice).toBe(true);
         expect(localStorageService.set.calledWith("tasks")).toBe(true);
         expect(localStorageService.set.calledWith("archived tasks")).toBe(true);
         const callTasks = localStorageService.set.getCall(0);
         expect(callTasks.args[1]).toEqual([]);
         const callArchivedTasks = localStorageService.set.getCall(1);
         expect(callArchivedTasks.args[1]).toEqual(jasmine.arrayContaining([taskToArchive]));
      }));

      it("should be able to remove a task", inject((tasksService) => {
          // Arrange
         const taskToRemove = { title: 'Write dissertation on ewoks', pomodoros: 3, workedPomodoros: 2, isActive: true, id: 1}
         // Act
         tasksService.removeTask(taskToRemove);
         // Assert 
         expect(localStorageService.set.calledOnce).toBe(true);
         expect(localStorageService.set.calledWith("tasks")).toBe(true);
         const callTasks = localStorageService.set.getCall(0);
         expect(callTasks.args[1]).toEqual([]);
      }));

  });

  describe("Given that there are not tasks saved in local storage", () => {

      beforeEach(() => {
          localStorageService.get.withArgs("tasks").returns(null);
          localStorageService.get.withArgs("archived tasks").returns(null);
      });

      it("should initialize it with 2 tasks", inject((tasksService) => {
          // Arrange, Act
          const tasks = tasksService.getTasks();
          // Assert
          expect(tasks.length).toBe(2);
      }));

      it("Should have no archived tasks", inject((tasksService) => {
          // Arrange, Act
          const tasks = tasksService.getArchivedTasks();
          // Assert
          expect(tasks.length).toBe(0);
      }));
  });

});
