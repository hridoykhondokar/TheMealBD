var inputMeal = document.getElementById('inputMealName');
var inputMealValue = inputMeal.value;


function searchFood() {
    inputMealValue = inputMeal.value;
    if (inputMealValue == '') {
        return alert('please enter your food');
    } 
    else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMealValue}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const mealName = data.meals;
            mealInfo(mealName);
        })

        .catch(err => {
            alert('Please, check your spell!')
            document.getElementById('inputMealName').value = ''
        })
    }
    
}



function mealInfo(mealHere) {
   const foodMainDiv = document.getElementById('main-food')
    mealHere.forEach(food => {
        const foodDiv = document.createElement('div');
            foodDiv.className = 'each-food';
            const foodInfo = `
            <img onclick="mealDetails('${food.strMeal}')" src="${food.strMealThumb}">
            <h5>${food.strMeal}</h5>
        `;
        foodDiv.innerHTML = foodInfo;
        foodMainDiv.appendChild(foodDiv);
    });
    
}

  const mealDetails = name => {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then(res => res.json())
      .then(data => {
          inputMealDetails(data.meals)
      })
  }

  const inputMealDetails = inputDetails => {
      document.getElementById("all-main-data").style.display ='none';
      document.getElementById('mealDetails').style.display ='block';

    const foodContain = document.getElementById('mealDetails');
    inputDetails.forEach(details=> {
        const detailsDiv = document.createElement('div');
        detailsDiv.id = 'detail-div'
        const detailsInfo = `
            <img src="${details.strMealThumb}">
            <h3>${details.strMeal}</h3>
            <h4>Ingredients</h4>
        <li class="text"><i class="fas fa-check-square"></i>${details.strMeasure1}  ${details.strIngredient1}</li>
        <li class="text"><i class="fas fa-check-square"></i>${details.strMeasure2}  ${details.strIngredient2}</li>
        <li class="text"><i class="fas fa-check-square"></i>${details.strMeasure3}  ${details.strIngredient3}</li>
        <li class="text"><i class="fas fa-check-square"></i>${details.strMeasure4}  ${details.strIngredient4}</li>
        <li class="text"><i class="fas fa-check-square"></i>${details.strMeasure5}  ${details.strIngredient5}</li>
        <li class="text"><i class="fas fa-check-square"></i>${details.strMeasure6}  ${details.strIngredient6}</li
        `
        detailsDiv.innerHTML = detailsInfo;
        foodContain.appendChild(detailsDiv);
    })

  }
  
  

document.getElementById('searchMeal').addEventListener('click', function(){
    searchFood();
    document.getElementById('inputMealName').value = '';
    document.getElementById('main-food').innerHTML = '';
 })