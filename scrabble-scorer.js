// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `\nPoints for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //


//initial prompt function
function initialPrompt() {
   let chosenWord = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   return chosenWord;
};


//scoring functions
let simpleScorer = function(word) {
   word = word.toLowerCase();
   let simpleScore = word.length;
   return simpleScore;
};

let vowelBonusScorer = function(word) {
   let vowelBonusScore = 0
   word = word.toLowerCase();

   for (let i = 0; i < word.length; i++) {
      if (word[i] === 'a' || word[i] === 'e' || word[i] === 'i' || word[i] === 'o' || word[i] === 'u') {
         vowelBonusScore += 3;
      } else {
         vowelBonusScore += 1;
      }
   }
   return vowelBonusScore;
};
let scrabbleScorer = function(word) {
   word = word.toLowerCase();
   let scrabbleScore = 0;

   for (let i = 0; i < word.length; i++) {
      for (let character in newPointStructure) {
         if (word[i].toLowerCase() === character) {
            scrabbleScore += newPointStructure[character];
         }
      }
   }

   return scrabbleScore;
};

// score algorithm array
const scoringAlgorithms = [
   {name: "Simple Score",
   description: "Each letter is worth 1 point",
   scorerFunction: simpleScorer},
   {name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer},
   {name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer}
];

//score prompt function
function scorerPrompt() {
   let id = Number(input.question("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: "));
   if (id === 0) {
      return scoringAlgorithms[0];
   } else if ( id === 1) {
      return scoringAlgorithms[1];
   } else if (id === 2) {
      return scoringAlgorithms[2];
   }
}


// transform function
function transform(oldStructure) {
   let newStructure = {};

   for (score in oldStructure) {
      for (let i = 0; i < oldStructure[score].length; i++) {
         newStructure[oldStructure[score][i].toLowerCase()] = Number(score);
      }
   }
   return newStructure;
};

let newPointStructure = transform(oldPointStructure);

//run program function
function runProgram() {
   let word = initialPrompt();
   let algorithm = scorerPrompt();
   console.log(`Score for '${word}': ${algorithm.scorerFunction(word)}`)
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
