async function sprintChallenge5() { // Note the async keyword so you can use `await` inside sprintChallenge5
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇
  // 👇 WORK ONLY BELOW THIS LINE 👇

  // 👇 ==================== TASK 1 START ==================== 👇

  // 🧠 Use Axios to GET learners and mentors.
  // ❗ Use the variables `mentors` and `learners` to store the data.
  // ❗ Use the await keyword when using axios.

// 🧠 Use async function to handle async/await logic

  try {
    // ❗ Use Promise.all to handle both requests concurrently
    const [learners, mentors] = await Promise.all([
      axios.get('http://localhost:3003/api/learners'),  // Request to Endpoint A
      axios.get('http://localhost:3003/api/mentors')    // Request to Endpoint B (mentors)
    ]);
    
  }
  catch (error) {
    // ❗ Handle any errors that occur during the fetch
    console.error('Error fetching data:', error);
  }
  // 👆 ==================== TASK 1 END ====================== 👆

  // 👇 ==================== TASK 2 START ==================== 👇

  // 🧠 Combine learners and mentors.
  // ❗ At this point the learner objects only have the mentors' IDs.
  // ❗ Fix the `learners` array so that each learner ends up with this exact structure:
   {[{
   "id": 6,
    "fullName": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "mentorIds": [17, 78] // Mentor IDs
  
   }]}

  // 👆 ==================== TASK 2 END ====================== 👆

  const cardsContainer = document.querySelector('.cards')
  const info = document.querySelector('.info')
  info.textContent = 'No learner is selected'


  // 👇 ==================== TASK 3 START ==================== 👇

  for (let learner of learners) { // looping over each learner object

    // 🧠 Flesh out the elements that describe each learner
    // ❗ Give the elements below their (initial) classes, textContent and proper nesting.
    // ❗ Do not change the variable names, as the code that follows depends on those names.
    // ❗ Also, loop over the mentors inside the learner object, creating an <li> element for each mentor.
    // ❗ Fill each <li> with a mentor name, and append it to the <ul> mentorList.
    // ❗ Inspect the mock site closely to understand what the initial texts and classes look like!

    const card = document.createElement('div')
    const heading = document.createElement('h3')
    const email = document.createElement('div')
    const mentorsHeading = document.createElement('h4')
    const mentorsList = document.createElement('ul')


    for (let learner of learners) {
      // Create the card container for the learner
      const card = document.createElement('div');
      card.classList.add('card'); // Add a class to the card (for styling)
    
      // Create the heading element for the learner's name
      const heading = document.createElement('h3');
      heading.classList.add('learner-name'); // Add a class to the learner name heading
      heading.textContent = learner.fullName; // Set the learner's full name
    
      // Create the email display
      const email = document.createElement('div');
      email.classList.add('learner-email'); // Add a class for styling
      email.textContent = learner.email; // Set the learner's email
    
      // Create a heading for the mentor section
      const mentorsHeading = document.createElement('h4');
      mentorsHeading.classList.add('mentors-heading'); // Add a class for styling
      mentorsHeading.textContent = 'Mentors'; // Set the text to "Mentors"
    
      // Create the list that will hold mentor names
      const mentorsList = document.createElement('ul');
      mentorsList.classList.add('mentors-list'); // Add a class for styling
    
      // Loop over the learner's mentors and create an <li> for each one
      for (let mentorId of learner.mentorIds) {
        // Find the mentor's name based on the mentorId (using a mentorMap or a similar data structure)
        const mentor = mentors.find(m => m.id === mentorId); // Assuming mentors is an array of mentor objects
        
        if (mentor) {
          const mentorItem = document.createElement('li'); // Create an <li> for each mentor
          mentorItem.textContent = mentor.fullName; // Set the mentor's name as text
          mentorsList.appendChild(mentorItem); // Append the <li> to the mentorsList
        }
      }
    
      // Append all elements to the card
      card.appendChild(heading);
      card.appendChild(email);
      card.appendChild(mentorsHeading);
      card.appendChild(mentorsList);
    
      // Finally, append the card to the cards container (you may need to have this element in your HTML)
      cardsContainer.appendChild(card);
    }
    

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
