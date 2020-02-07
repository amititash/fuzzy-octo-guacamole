import  KoService from '../../services/kos.service';

const uniqueIdeaNameModifier = async (req, res, next) => {
    if(!req.body.ideaName){
        next();
    }
    else {
        console.log("yyyyyyyyyyyyyyy");
        let count = 0;
        let ideaName = req.body.ideaName || 'my-idea' ;
        let ideaOwner = req.body.ideaOwner ;
        let criteria = {
            "ideaName" : {
            "$regex" : ideaName
            },
            "ideaOwner" : ideaOwner
        }
        try {
            count = await KoService.countKo(criteria);
            if(count !== 0){
                ideaName = ideaName + `-${count}`
            }
            req.body.ideaName = ideaName;
            console.log("idea name to be saved", ideaName);
        }
        catch(e){
            console.log(e);
            next(e);
        }
        next()
    }
    
}


module.exports = {
    uniqueIdeaNameModifier
}