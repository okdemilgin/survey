
const SurveySchema = require('../models/survey.js');

const getSurveys = async(req,res) => {
 try {
 const getSurveys = await SurveySchema.find();//tüm verileri getir.

 res.status(200).json(getSurveys)

 } catch (error) {
    res.status(500).json({message: error.message})
 }
}

// const createSurvey = async(req,res) => {
//     try {
//     const newSurvey = await SurveySchema.create(req.body);
   
//     res.status(200).json(newSurvey)
   
//     } catch (error) {
//        res.status(500).json({message: error.message})
//     }
//    }
const createSurvey = async (req, res) => {
   try {
       console.log(req.body);
       const { user, title, questions } = req.body;
       const newSurvey = await SurveySchema.create({ user, title, questions });

       res.status(200).json(newSurvey);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

   const updateSurvey = async(req,res) => {
    try {
        const {id} = req.params;
    const update= await SurveySchema.findByIdAndUpdate(id, req.body, {new:true});
   
    res.status(200).json(update)
   
    } catch (error) {
       res.status(500).json({message: error.message})
    }
   }

   const deleteSurvey = async(req,res) => {
    try {
        const {id} = req.params;

     await SurveySchema.findByIdAndRemove(id);
   
    res.status(200).json({message:"deletion successful."})
   
    } catch (error) {
       res.status(500).json({message: error.message})
    }
   }

   module.exports = {getSurveys, createSurvey, updateSurvey, deleteSurvey}

