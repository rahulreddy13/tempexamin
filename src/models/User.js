import Schema from "./Schema"

export default class User extends Schema {

    constructor() {

        super();

        this.modelname = 'Users';
        this.collectionname = 'Users';

        this.schemaobject = {

             Email         : { type: String, unique: true, required: true },
             Password      : { type: String, required: true },
             Referal_Code  : { type: String, required: true },
             Referer_Code  : { type: String, required: true },
             Refered_Users : { type: Array}
        };
    }

}