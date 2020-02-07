import  KoService from '../../services/kos.service';
const crypto = require('crypto');

const uniqueIdeaNameModifier = async (req, res, next) => {
    if(!req.body.ideaName){
        next();
    }
    else {
        let randomString = crypto.randomBytes(6).toString('hex');
        console.log("yyyyyyyyyyyyyyy");
        let count = 0;
        let ideaOwner = req.body.ideaOwner ;
        let criteria = {};

        let ideaName = req.body.ideaName ;
        
        if(ideaName === "my-idea"){
            criteria = {
                "ideaName" : ideaName,
                "ideaOwner" : ideaOwner
            }
            try {
                count = await KoService.countKo(criteria);
            }
            catch(e){
                console.log(e);
                next(e);
            }
            ideaName += `_${randomString}`;
            ideaName += `_${count}`  
        }
        else {
            criteria = {
                "ideaName" : ideaName,
                "ideaOwner" : ideaOwner
            }
            try {
                count = await KoService.countKo(criteria);
            }
            catch(e){
                console.log(e);
                next(e);
            }
            if(count){
                ideaName += `_${randomString}`;
                ideaName += `_${count}`   
            }
        }
        req.body.ideaName = ideaName;
        console.log("idea name to be saved", ideaName);
        next()
    }
    
}


module.exports = {
    uniqueIdeaNameModifier
}