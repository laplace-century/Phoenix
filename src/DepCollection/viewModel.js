import {DependenceManager} from './dependenceManager';

export default class ViewModel {
    _NAME_SPACE = '';
    OBSERVABLE_OBJECT = {};
    state={};

    constructor(nameSpace, viewModelParameterObject,observableObject){
        if (!viewModelParameterObject) {
            console.error('viewModelParameterObject is undefined');
            return;
        }
        this._NAME_SPACE = nameSpace ? nameSpace : '';

        if(!viewModelParameterObject.store){
            console.error('viewModelParameterObject.store is undefined');
            return;
        }

        if(!observableObject){
            console.error('observableObject is undefined');
            return;
        }

        this.state=this._collectDependence(viewModelParameterObject.store);
    }

    _collectDependence(store){
        const viewModelState = {};
        const keys = Object.keys(store);
        keys.forEach(key => {
           this._createDependence(key,store[key].handler,store[key].onComputedUpdate);
           
           viewModelState= {...{
                key: this.OBSERVABLE_OBJECT[key]
           }};
        });
        return viewModelState;
    }

    _createDependence(key,handler,onComputedUpdate){
        new DependenceManager(this.OBSERVABLE_OBJECT, key, handler, onComputedUpdate);
    }
}