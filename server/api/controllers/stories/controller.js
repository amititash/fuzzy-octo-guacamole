import StoriesService from '../../services/stories.service';


export class Controller {
  


  getStory(req, res) {
    let criteria = {
      _id : req.query.id
    }
    StoriesService.getStory(criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
    
  }


  updateStory( req, res ) {
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
    StoriesService.updateStory(criteria, updateObj, options)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
  }


  deleteStory( req, res) {
    let _criteria = {
      _id : req.query.id
    }
    StoriesService.deleteStory(_criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
  }

  createStory(req, res) {
    StoriesService.createStory(req.body).then(r =>
      res
        .status(201)
        .json(r)
    );
  }
}


export default new Controller();
