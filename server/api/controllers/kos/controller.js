import KosService from '../../services/kos.service';


export class Controller {
  
  getAllKos( req, res ) {
    let criteria = {
      ideaOwner : req.query.emailId
    }

    if(req.query.keyword) {
      criteria["$text"] = {
        "$search" : req.query.keyword
      }
    }
    KosService.getAllKos(criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
      .catch ( e => {
        res 
          .status(500)
          .json( { error : e });
      })
  }

  getKo(req, res) {
    let criteria = {
      _id : req.query.id
    }
    KosService.getKo(criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
      .catch ( e => {
        res 
          .status(500)
          .json( { error : e });
      })
    
  }


  updateKo( req, res ) {
    let criteria = {
      // _id : req.body.id
    }
    let updateObj = {
      "$set" : {
        ...req.body
      }
    }
    let options = {
      upsert : true,
      new : true
    }
    KosService.updateKo(criteria, updateObj, options)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
      .catch ( e => {
        res 
          .status(500)
          .json( { error : e });
      })
  }


  deleteKo( req, res) {
    let _criteria = {
      _id : req.query.id
    }
    KosService.deleteKo(_criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
      .catch ( e => {
        res 
          .status(500)
          .json( { error : e });
      })
  }

  createKo(req, res) {
    KosService.createKo(req.body)
      .then(r =>
        res
          .status(201)
          .json(r)
      )
      .catch ( e => {
        res 
          .status(500)
          .json( { error : e });
      })
  }



  async sortedKo(req, res) {
    let criteria = {
      ideaOwner : req.query.emailId
    }
    let projection = {

    }
    let options = {};
    switch (req.query.sortBy) {
      case "fundability":
        options = {
          sort : { fundability : -1 }
        }
        break;
      case "freshness":
        options = {
          sort : { freshness : 1 }
        }
        break;
      case "recent" : 
        options = {
          sort : { createdAt : -1}
        }
        break;
     
    }
    try {
      let data = await KosService.getAllKos(criteria, projection, options);
      console.log(data);
      res
        .status(200)
        .send(data);
    }
    catch(e) {
      console.log(e); 
      res
        .status(500)
        .send({error : e})
    }
    
  }


}





export default new Controller();
