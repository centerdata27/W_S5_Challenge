async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

// 🧠 Use async function to handle async/await logic
let learners =[];
let mentors = [];


  try  {
    // ❗ Use Promise.all to handle both requests concurrently
    const [learners1, mentors1] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),  // Request to Endpoint A
      axios.get('http://localhost:3003/api/mentors')    // Request to Endpoint B (mentors)
    
    ]);
// console.log(learners);

learners = learners1.data;
mentors = mentors1.data;
console.log(learners);
console.log(mentors);
  }
  catch (error) {
    // ❗ Handle any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
  console.log(learners);
  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
  // {
  //   id: 6,
  //   fullName: "Bob Johnson",
  //   email: "bob.johnson@example.com",
  //   mentors: [
  //     "Bill Gates",
  //     "Grace Hopper" 
  //   ]`
  // }
const newLearners= []
 learners.forEach(learner => {

  const results1= {
    ...learner, 
    mentors: learner.mentors.map( mentorId => { 
          const compt1 = mentors.find((person) => person.id == mentorId)
        return compt1.firstName +' '+ compt1.lastName;
      
     })
  }
  newLearners.push(results1);
 });
 console.log(newLearners);
  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'



  // 👇 ==================== TASK 3 START ==================== 👇


  for (let learner of newLearners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    card.classList.add('card');  //add class for styling    addding to under cards

    const heading = document.createElement('h3')
    heading.classList.add('learner-name'); // Add a class to the learner name heading
    heading.textContent = learner.fullName; 

    const email = document.createElement('div')
    email.classList.add('learner-email'); // Add a class for styling
    email.textContent = learner.email; // Set the learner's email

    const mentors = document.createElement('h4')
 
    mentors.textContent = 'Mentors'; // Set the text to "Mentors"

    const mentorsList = document.createElement('ul')
    mentorsList.classList.add('mentors-list'); // Add a class for styling  

  
        // Loop over the learner's mentors and create an <li> for each one
    
learner.mentors.forEach(mentorName => {
const li = document.createElement("li")
li.textContent = mentorName
mentorsList.appendChild(li)




})
       // Append all elements to the card
       card.appendChild(heading);
       card.appendChild(email);
       card.appendChild(mentors);


       mentors.classList.add("closed");
     
     
 
    
     

    

    // 👆 ==================== TASK 3 END ====================== 👆

    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    // 👆 WORK ONLY ABOVE THIS LINE 👆
    card.appendChild(mentorsList)
    card.dataset.fullName = learner.fullName
    cardsContainer.appendChild(card)

    card.addEventListener('click', evt => {
      const mentorsHeading = card.querySelector('h4')
      // critical booleans
      const didClickTheMentors = evt.target === mentorsHeading
      const isCardSelected = card.classList.contains('selected')
      // do a reset of all learner names, selected statuses, info message
      document.querySelectorAll('.card').forEach(crd => {
        crd.classList.remove('selected')
        crd.querySelector('h3').textContent = crd.dataset.fullName
      })
      info.textContent = 'No learner is selected'
      // conditional logic
      if (!didClickTheMentors) {
        // easy case, no mentor involvement
        if (!isCardSelected) {
          // selecting the card:
          card.classList.add('selected')
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      } else {
        // clicked on mentors, we toggle and select no matter what
        card.classList.add('selected')
        if (mentorsHeading.classList.contains('open')) {
          mentorsHeading.classList.replace('open', 'closed')
        } else {
          mentorsHeading.classList.replace('closed', 'open')
        }
        if (!isCardSelected) {
          // if card was not selected adjust texts
          heading.textContent += `, ID ${learner.id}`
          info.textContent = `The selected learner is ${learner.fullName}`
        }
      }
    })
  }

  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`
}

// ❗ DO NOT CHANGE THIS CODE. WORK ONLY INSIDE TASKS 1, 2, 3
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
