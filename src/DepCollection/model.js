export default class Model {
    _NAME_SPACE = '';
    _ModelDataSource = null;
    constructor(nameSpace, modelParameterObject) {
        if (!modelParameterObject) {
            console.error('modelParameterObject is undefined');
            return;
        }
        this._NAME_SPACE = nameSpace ? nameSpace : '';

        this._CreateObservable(modelParameterObject);
    };

    

    _CreateObservable = (modelParameterObject) => {
        if(!modelParameterObject.data){
            console.error('modelParameterObject is undefined');
            return;
        }
        this._ModelDataSource=modelParameterObject.data;
        if (Array.isArray(this._ModelDataSource)) {
            this._ModelDataSource.forEach(obj => {
                _CreateObservable()
        });
        } else if (isTypeOf(this._ModelDataSource, "object")) {
            _CreateObservable()
        }else {
            console.log('不存在数据直接是一个值');
        }

        

    }
}