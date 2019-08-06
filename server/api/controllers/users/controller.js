import UsersService from '../../services/users.service';


export class Controller {
  

  getUser(req, res) {
    let criteria = {
      _id : req.query.id
    }
    UsersService.getUser(criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
    
  }

  getUserByEmail(req, res) {
    let criteria = {
      email : req.query.emailId
    }
    console.log(criteria);
    UsersService.getAllUsers(criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
    
  }


  updateUser( req, res ) {
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
    UsersService.updateUser(criteria, updateObj, options)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
  }


  deleteUser( req, res) {
    let _criteria = {
      _id : req.query.id
    }
    UsersService.deleteUser(_criteria)
      .then ( r => {
        res
          .status(200)
          .json(r);
      })
  }

  createUser(req, res) {
    UsersService.createUser(req.body).then(r =>
      res
        .status(201)
        .json(r)
    );
  }
}


export default new Controller();
