/**
 * Setting current product state
 * @type {string} dev|prod
 */
global.environment = 'dev';

/**
 * Check current system environment
 * @returns {boolean}
 */
global.isDev = function () {

    /**
     * environment variables: dev/pro
     */

    if ('dev' === environment) {

        return true;

    }

    return false;

};
//TODO: make sure it would handle array of errors
global.handleError = function (err) {

    if (err && isDev())
        console.log(err);

};
/**
 * Default mongo connection path
 * @type {string}
 */
global.databaseUri = 'mongodb://localhost:27017/prwatechDB';