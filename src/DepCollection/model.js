export default class Model {
    _NAME_SPACE = '';
    _ModelDataSource = null;
    constructor(nameSpace, modelParameterObject) {
        super();
        if (!modelParameterObject) {
            console.error('modelParameterObject is undefined');
            return;
        }
        _NAME_SPACE = nameSpace ? nameSpace : '';
    };

    _

    getDataSource = () => {
        return _ModelDataSource;
    }
}