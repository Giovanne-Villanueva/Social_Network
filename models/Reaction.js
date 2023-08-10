const { Schema, Types } = require('mongoose');

const format = function(createdAt){
  //format date 
  const month = createdAt.getMonth();
  let data = ''
  if(month === 12){
    data = 'Dec'
  }
  else if(month === 11){
    data = 'Nov'
  }
  else if(month === 10){
    data = 'Oct'
  }
  else if(month === 9){
    data = 'Sep'
  }
  else if(month === 8){
    data = 'Aug'
  }
  else if(month === 7){
    data = 'Jul'
  }
  else if(month === 6){
    data = 'Jun'
  }
  else if(month === 5){
    data = 'May'
  }
  else if(month === 4){
    data = 'Apr'
  }
  else if(month === 3){
    data = 'Mar'
  }
  else if(month === 2){
    data = 'Feb'
  }
  else {
    data = 'Jan'
  }
  
  return ( (data) + (createdAt.getDate()) + (createdAt.getFullYear()) );
}

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: format
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;