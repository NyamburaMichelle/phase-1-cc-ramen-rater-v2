const baseUrl = "http://localhost:3000/ramens";

function displayMenu() {
  fetch(baseUrl)
    .then(resp => resp.json())
    .then(data => {
      data.forEach(item => {
        const container = document.createElement('div');
        container.classList.add('ramen-item');

        const ramenName = document.createElement('h2');
        ramenName.classList.add('nameList');
        ramenName.innerHTML = item.name;

        const ramenRestaurant = document.createElement('p');
        ramenRestaurant.classList.add('restaurantList');
        ramenRestaurant.innerHTML = item.restaurant;

        const ramenImage = document.createElement('img');
        ramenImage.classList.add('detail-imageList');
        ramenImage.src = item.image;

        const ramenRating = document.createElement('p');
        ramenRating.id = 'rating-displayList';
        ramenRating.innerHTML = item.rating;

        const ramenComment = document.createElement('p');
        ramenComment.id = 'comment-displayList';
        ramenComment.innerHTML = item.comment;

        // Append new elements to the container
        container.appendChild(ramenName);
        container.appendChild(ramenRestaurant);
        container.appendChild(ramenImage);
        container.appendChild(ramenRating);
        container.appendChild(ramenComment);

        const ramenMenu = document.querySelector("#ramen-menu");
        ramenMenu.appendChild(container);
      });
      
      // After populating the menu, attach event listeners
      handleClick();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

const handleClick = () => {
  const ramenDetailImage = document.querySelector('.detail-image');
  const ramenDetailName = document.querySelector('.name');
  const ramenDetailRestaurant = document.querySelector('.restaurant');
  const ramenDetailRating = document.getElementById('rating-displayList');
  const ramenDetailComment = document.getElementById('comment-displayList');

  const cards = document.querySelectorAll('.ramen-item');
  //console.log(cards);

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const imageUrl = card.querySelector('.detail-imageList').src;
      const name = card.querySelector('.nameList').innerHTML;
      const restaurant = card.querySelector('.restaurantList').innerHTML;
      const rating = card.querySelector('#rating-displayList').innerHTML;
      const comment = card.querySelector('#comment-displayList').innerHTML;

      ramenDetailImage.src = imageUrl;
      ramenDetailName.innerHTML = name;
      ramenDetailRestaurant.innerHTML = restaurant;
      ramenDetailRating.innerHTML = rating;
      ramenDetailComment.innerHTML = comment;
    });
  });
};

// Call the displayMenu function only once
displayMenu();

// Display form contents
const submitButton = document.querySelector("#submit-button");

submitButton.addEventListener("click", function(e) {
  e.preventDefault();
  // Get values
  let name = document.querySelector("#new-name").value;
  let restaurant = document.querySelector("#new-restaurant").value;
  let image = document.querySelector("#new-image").value;
  let rating = document.querySelector("#new-rating").value;
  let comment = document.querySelector("#new-comment").value;
  
  let formData = {
    name: name,
    restaurant: restaurant,
    image: image,
    rating: rating,
    comment: comment
  };
  console.log(formData);
  fetch('http://localhost:3000/ramens', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
})
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle response from the server
        console.log('Server response:', data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error sending data to server:', error);
    });
})


;










