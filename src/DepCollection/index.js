import {
    inject as injectFn
} from '../View/index';
import {
    Model
} from './model';
export default class Phoenix {
    _NAME_SPACE = '';

    ViewModelDataSource = null;
    _ModelInstance = null;

    constructor() {
        super();
    };

    init(nameSpace) {
        _NAME_SPACE = nameSpace;
    }

    Model = (modelParameterObject) => {
        _ModelInstance = new Model(_NAME_SPACE, modelParameterObject);
    }

    ViewModel = (viewModelParameterObject) => {

    }

    inject = () => injectFn(ViewModelDataSource);
}