import KosService from '../../services/kos.service';
import CompanyService from '../../services/companies.service'
import { resolve } from 'path';

export class Controller {

  async getNumberedKos(req, res) {
    let sortBy = {};
    let requiredField = "fundability";
    switch (req.query.sortBy) {
      case "fundability":
        sortBy = { fundability : -1 }
        requiredField = "fundability"
        break;
      case "freshness":
        sortBy =  { freshness : 1 }
        requiredField = "freshness"

        break;
      case "recent" :
        sortBy = { createdAt : -1 }
        requiredField = "recent"
        break;
    }
    console.log(requiredField);
    let pipeline = [
      {
        "$match" : {
          ideaOwner : req.query.emailId
        }
      },
      {
        "$sort" : sortBy
      },
      {
        "$project" : {
          ideaDescription : 1,
          [`${requiredField}`] : 1,
          freshness_criteria : 1
        }
      }
    ];
    let data = [];
    try {
      data = await KosService.aggregateKos(pipeline);
    }
    catch(e) {
      console.log(e);
      res.send({error : e});
    }
    let numbering = 1;
    // number the kos for reference in bot
    data.forEach ( element => element.serial = numbering ++);
    res.send(data);
  }


  async getKoCount(req, res) {
    let criteria = {
      ideaOwner : req.query.emailId
    }
    let data = {
      koCount : 0
    }
    try {
      data.koCount = await KosService.countKo(criteria);
    }
    catch(e){
      console.log(e);
      res.send({error : e});
    }
    res.send(data);
  }

  async getAllKos( req, res ) {
    let criteria = {
      ideaOwner : req.query.emailId
    }

    if(req.query.keyword) {
      criteria["$text"] = {
        "$search" : req.query.keyword
      }
    }
    let projection = {
      ideaDescription : 1
    }
    let numbering = 1;
    let data = [];
    try {
      let response = await KosService.getAllKos(criteria, projection);
      response.forEach( element => {
        element = element.toObject();
        element.serial = numbering++;
        data.push(element);
      })
      res.send(data);
    }
    catch(e) {
      res
        .status(500)
        .json( { error : e.message });
    }
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
      _id : req.body.id
    }
    // let criteria = {};
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
        console.log(e);
        res
          .status(500)
          .json( { error : e.message });
      })
  }


  async deleteKo( req, res) {
    let criteria = {
      _id : req.query.id
    }
    KosService.deleteKo(criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
      .catch ( e => {
        res
          .status(500)
          .json( { error : e.message });
      })
  }

  async deleteAllKos(req, res) {
    let criteria = {
      ideaOwner : req.query.emailId
    };

    try {
      let response = await KosService.deleteAllKos(criteria);
      res
        .status(200)
        .json(response);
    }
    catch(e){
      res
        .status(500)
        .json( {error : e.message});
    }

  }

  async createOrUpdateKo(req, res) {
    if(req.body._id){
      // _id present, implies we are updating
      let criteria = {
        _id : req.body._id
      };
      delete req.body._id;
      let update = {
        $set : {
          ...req.body
        }
      };
      let options = {
        new : true
      }

      KosService.updateKo(criteria, update, options)
        .then(r =>
          res
            .status(201)
            .json(r)
        )
        .catch ( e => {
          res
            .status(500)
            .json( { error : e.message });
        })
    }


    else {
      // _id not present, implies creating new ko
      let company = {};
      try {
        let companyData = {
          name : req.body.top_competitor,
          description : req.body.topCompetitorUserDescription
        }
        company = await CompanyService.createCompany(companyData);
      }
      catch(e){
        console.log(e.message);
        throw e;
      }
      req.body.topCompetitors = [company._id]
      KosService.createKo(req.body)
        .then(r =>
          res
            .status(201)
            .json(r)
        )
        .catch ( e => {
          res
            .status(500)
            .json( { error : e.message });
        })
      }
  }



  async sortedKo(req, res) {
    let criteria = {
      ideaOwner : req.query.emailId,
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
        .send({error : e.message})
    }

  }


}





export default new Controller();
