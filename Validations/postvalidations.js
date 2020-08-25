import Joi from '@hapi/joi';

const postvalidation = data =>{
    const schema = Joi.object({
        Author_names: Joi.string().min(3).required(),
        Title: Joi.string().min(3).required(),
        Content: Joi.string().min(8).required()
});
   return schema.validate(data);
};

module.exports.postvalidation = postvalidation;