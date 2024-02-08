const express = require('express');
const connectDB = require('./configs/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require ("morgan")
const path = require ('path')

const PORT = process.env.PORT || 4000;
const app = express();

// connectDB();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

const authRouter = require('./controller/auth.controller');
const quizAddRouter = require('./controller/quizAdd.controller');
const displayQuizRouter = require('./controller/displayQuiz.controller');
const userDataRouter = require('./controller/userData.controller');
const defaultRouter = require('./App');

app.use('/', defaultRouter); 
app.use('/auth', authRouter);
app.use('/admin', quizAddRouter);
app.use('/quiz', displayQuizRouter);
app.use('/userResult', userDataRouter);

// static path file fild
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("+", function(req,res){
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server started on ${PORT}`);
  } catch (error) {
    console.error('Error starting the server:', error.message);
  }
});
