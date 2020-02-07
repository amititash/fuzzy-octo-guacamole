import  KoService from '../../services/kos.service';

const uniqueIdeaNameModifier = async (req, res, next) => {
    if(!req.body.ideaName){
        next();
    }
    else {
        console.log("yyyyyyyyyyyyyyy");
        let count = 0;
        let ideaOwner = req.body.ideaOwner ;
        let criteria = {};

        let ideaName = req.body.ideaName ;
        criteria = {
            // "ideaName" : {
            // "$regex" : ideaName
            // },
            "ideaOwner" : ideaOwner
        }
        try {
            count = await KoService.countKo(criteria);
        }
        catch(e){
            console.log(e);
            next(e);
        }
        if(ideaName === "my-idea"){
            ideaName += `-${count}`
        }
        else {
            if(count){
                ideaName += `-${count}`
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