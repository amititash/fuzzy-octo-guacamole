import KosService from '../../services/kos.service';


export class Controller {
  
  getAllKos( req, res ) {
    let criteria = {
      owner : req.query.emailId
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
          .json( { error : true });
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
          .json( { error : true });
      })
    
  }


  updateKo( req, res ) {
    let criteria = {
      _id : req.body.id
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
          .json( { error : true });
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
          .json( { error : true });
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
          .json( { error : true });
      })
  }
}


export default new Controller();
