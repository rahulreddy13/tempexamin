import bcrypt   from 'bcrypt-nodejs'

export default class BcryptController {

    constructor() {

    }
    
    hash(password,saltrounds){

        return new Promise((resolve,reject) =>{
            bcrypt.genSalt(saltrounds, function (err, salt) {
                if (err) {
                    reject(err)
                }
                bcrypt.hash(password, salt, null, function (err, hash) {
                    if (err) {
                        reject(err)
                    }
                    resolve(hash)
                })
            })
        })
    }

    compare(password,hash){
        
        return new Promise((resolve,reject) =>{
            bcrypt.compare(password, hash, function (err, isMatch) {
                if (err) {
                    reject(err)
                }
                resolve(isMatch)
            })
        })
    }
   
}