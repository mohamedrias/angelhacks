/**
* StampRegistry.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  connection: 'angelhacks',
  tableName: 'stamp_registry',
  migrate: 'alter',
  autoCreatedAt: true,
  autoUpdatedAt: false,
  attributes: {
    stamp_id: {
      type: 'integer',
      required: true
    },
    user_id: {
      type: 'integer',
      required: true
    },
    image_url: {
      type: 'string'
    },
    collect: {
      type: 'boolean',
      required: true
    },
    count: {
      type: 'integer'
    }
  },
  get: function(stamp_id, user_id, cb) {
    StampRegistry.findOne({
      stamp_id: stamp_id,
      user_id: user_id
    }).exec(function(error, data) {
      if (error) {
        return cb({error: true});
      }
      return cb(data);
    })
  },
  register: function(stamp_id, user_id, collect, cb) {
    var data;
    if (collect) {
      data = {
        stamp_id: stamp_id,
        user_id: user_id,
        collect: true,
        count: 0
      };
    }
    else {
      data = {
        stamp_id: stamp_id,
        user_id: user_id,
        collect: false
      };
    }
    StampRegistry.create(data).exec(function(error, data) {
      if (error) {
        return cb(error);
      }
      return cb(data);
    });
  },
  increment: function(stamp_id, user_id, cb) {
    StampRegistry.findOne({
      stamp_id: stamp_id, 
      user_id: user_id
    }).exec(function(error, data) {
      if (error) {
        return cb({error: true});
      }

      StampRegistry.update({
        stamp_id: stamp_id,
        user_id: user_id
      }, {
        count: data.count + 1
      }).exec(function(error, data) {
        if (error) {
          return cb({error: true});
        }

        return cb(data);
      });
    });
  },
  reset: function(stamp_id, user_id, cb) {
    StampRegistry.update({
      stamp_id: stamp_id,
      user_id: user_id
    }, {
      count: 0
    }).exec(function(error, data) {
      if (error) {
        return cb({error: true});
      }

      return cb(data);
    });
  },
  setImage: function(stamp_registry_id, image_url, cb) {
    StampRegistry.update({
      id: stamp_registry_id
    }, {
      image_url: image_url
    }).exec(function(error, data) {
      if (error) {
        return cb(error);
      }
      return cb(data);
    });
  }
};

