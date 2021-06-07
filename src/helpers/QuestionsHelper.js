//We define the logic behind components in helper files to keep components short and uncluttered!
//Here we export the fetch API call to get the questions from the trivia API
//This is an async function that returns a promise that we have to catch in any other file we want to use it in!
export const loadQuestions = async (
  //Here we set the parameters for the API URL
  //We define default values for the API URL
  amount = 10,
  category = 9,
  difficulty = "medium",
  type = "multiple"
) => {
  //Here we pass in parameters in the API call URL
  //Set the URL in abckticks `` and insert params with ${parameter}
  const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

  //Instead of using the fetch method and chaining the promises, we can use async and await to do the same with less code
  // If you await something, the function where the await is placed in needs to be an async function!
  //The await functions are placed in a try block at which end we listen for possible errors!
  try {
    //Here we await the response from fetching the url, then we await the destructured results from that res.json()
    const res = await fetch(url);
    const { results } = await res.json();
    //Here we know return the results from the function below that adjusts the API data to our own data structure!
    return convertQuestionsFromAPI(results);
  } catch (err) {
    console.error(err);
  }
};

//Here we place the whole structure adjustments from the API call to our data structure in the helper file!
const convertQuestionsFromAPI = (rawQuestions) => {
  //Here we use the map function to parse through the array and only return properties of interest for us
  return rawQuestions.map((loadedQuestion) => {
    const formattedQuestion = {
      question: loadedQuestion.question,
      //Here we define the property answerChoices by creating a new array with the spread operator passing in the incorrect answers array from the API call
      answerChoices: [...loadedQuestion.incorrect_answers],
    };
    //We want to pass in the correct answer at a random position into the answerChoices array
    //So the correct answer is not always in the same spot
    //For that we define a random number for the answer property of the formattedQuestion
    formattedQuestion.answer = Math.floor(Math.random() * 4);

    //The splice function allows us to insert the formattedQuestion.answer (the random place in the array) into the array of formattedQuestion.answerChoices
    // We basically tell the function where to insert (the array), what to delete (0 - nothing) and what to insert (loadedQuestion.correct_answer)
    formattedQuestion.answerChoices.splice(
      formattedQuestion.answer,
      0,
      loadedQuestion.correct_answer
    );
    //This way we have all the possible answers in the answerChoices array, and we know which is the right answer by the number of the answer property which is the right answer's place in the array
    return formattedQuestion;
  });
};
