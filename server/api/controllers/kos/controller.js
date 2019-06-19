import KosService from '../../services/kos.service';


export class Controller {
  


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
  }

  createKo(req, res) {
    KosService.createKo(req.body).then(r =>
      res
        .status(201)
        .json(r)
    );
  }
}


export default new Controller();
