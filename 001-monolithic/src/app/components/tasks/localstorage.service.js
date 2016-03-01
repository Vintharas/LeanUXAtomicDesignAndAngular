export class LocalStorageService{
    constructor(){
    'ngInject';
    }

    get(key){
        return angular.fromJson(localStorage.getItem(key));
    }

    set(key, value){
        localStorage.setItem(key, angular.toJson(value));
    }
}
