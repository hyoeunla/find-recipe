document.cookie = "cookie1=soo; SameSite=Lax";
document.cookie = "cookie2=soo";
document.cookie = "cookie3=hoo; SameSite=None;Secure";
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const API_KEY = config.apikey;

// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(
    `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/100/RCP_NM=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      let html = "";
      if (data.COOKRCP01.row) {
        data.COOKRCP01.row.forEach((meal) => {
          console.log(meal);
          html += `
            <div class="meal-item" data-name = "${meal.RCP_NM}">
                <div class="meal-img">
                    <img src="${meal.ATT_FILE_NO_MAIN}" alt="food">
            </div>
            <div class="meal-name">
                <h3>${meal.RCP_NM}</h3>
                <a href="#" class=
                "recipe-btn">레시피 보기</a>
              </div>
            </div>
        
            `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "원하는 레시피를 찾을 수 없습니다! 다시 검색해주세요!";
        mealList.classList.add("notFound");
      }

      mealList.innerHTML = html;
    });
  const inputr = document.getElementById("search-input").value;
  console.log("in", inputr);
}

function getMealRecipe(e) {
  e.preventDefault();
  console.log(e.target);
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/json/1/100/RCP_NM=${mealItem.dataset.name}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.COOKRCP01.row));
  }
}

function mealRecipeModal(meal) {
  console.log(meal);
  meal = meal[0];
  let html = `
  <h2 class="recipe-title">${meal.RCP_NM}</h2>
            <p class="recipe-category">${meal.RCP_PAT2}</p>
            <div class="recipe-instruct">
              <h3>만드는법:</h3>
              <p>${meal.MANUAL01}</p>
              <p>${meal.MANUAL02}</p>
              <p>${meal.MANUAL03}</p>
              <p>${meal.MANUAL04}</p>
              <p>${meal.MANUAL05}</p>
              <p>${meal.MANUAL06}</p>
              <p>${meal.MANUAL07}</p>
              <p>${meal.MANUAL08}</p>
              <p>${meal.MANUAL09}</p>
              <p>${meal.MANUAL10}</p>
            </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
