import Joi from '@hapi/joi';

const messagevalidation = data =>{
    const schema = Joi.object({
        Names: Joi.string().min(3).required(),
        Email: Joi.string().min(8).required().email(),
        Message: Joi.string().min(8).required(),
        Comments: Joi.string().min(8).required()
});
   return schema.validate(data);
};

//module.exports.messsagevalidation = messagevalidation;
export default messagevalidation;