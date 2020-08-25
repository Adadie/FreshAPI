import Joi from '@hapi/joi';

const commentvalidation = data =>{
    const schema = Joi.object({
        Comments: Joi.string().min(2).required()
});
   return schema.validate(data);
};

module.exports.commentvalidation = commentvalidation;