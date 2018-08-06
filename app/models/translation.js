let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//translation schema definition
let TranslationSchema = new Schema(
  {
    langDirect: { type: String, required: true },
    wordFrom: { type: String, required: true },
    wordTo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },    
  }, 
  { 
    versionKey: false
  }
);

// Sets the createdAt parameter equal to the current time
TranslationSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

//Exports the TranslationSchema for use elsewhere.
module.exports = mongoose.model('translation', TranslationSchema);

