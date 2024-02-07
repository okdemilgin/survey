
// const mongoose = require("mongoose");

// const QuestionSchema = new mongoose.Schema({
//     question: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     options: {
//         type: [String],
//         default: []
//     }
// });

// const SurveySchema = new mongoose.Schema({
//     user: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     questions: [QuestionSchema], // Burada "questions" alanını güncelliyoruz
//     date: {
//         type: Date,
//         default: new Date()
//     }
// });

// module.exports = mongoose.model('survey', SurveySchema);

const mongoose = require("mongoose");

const OptionSchema = new mongoose.Schema({
    option: {
        type: String,
        required: true,
        trim: true
    }
});

const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: [OptionSchema] 
});

const SurveySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    questions: [QuestionSchema], // Anketin sorularını bir dizi olarak saklayın
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('survey', SurveySchema);
