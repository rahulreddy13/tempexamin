export default class Schema {

    constructor() {
        this.modelname = null;
        this.collectionname = null;
        this.schemaobject = null;
    }

    schema() {
        return this._schema = new _mongoose.Schema(this.schemaobject, {collection: this.collectionname});
    }

    model() {
        return this._model = _mongoose.model(this.modelname, this.schema());
    }

}