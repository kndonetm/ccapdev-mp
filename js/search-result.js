var filterBtn = document.querySelector("#star-filter-dropdown");
var filterDropdownItems = document.querySelectorAll(".star-filter");

var storeToggle = document.querySelector("#store-toggle");
var reviewToggle = document.querySelector("#review-toggle");

var isStoreVisible = true;
var isReviewVisible = true;

var storeSectionResult = document.querySelector("#store-section-result");
var storeResultList = establishments;
var storeResultHTML = ``;

var reviewSectionResult = document.querySelector("#review-section-result");

updateStoreResultHTML();

filterDropdownItems.forEach((item) => {
    item.addEventListener('click', () => {
        filterBtn.innerHTML = item.innerHTML;

        if (item.innerHTML[0] == 'N') {
            storeResultList = establishments;
        }
        else {
            storeResultList = [];

            establishments.forEach((store) => {
                if(item.innerHTML[0] == store.rating[0]) {
                    storeResultList.push(store);
                }
            });
        }

        updateStoreResultHTML();
        showStore();
    });
});

storeToggle.addEventListener('click', () => {
    if(isStoreVisible) {
        hideStore();
    } else {
        showStore();
    }
});

reviewToggle.addEventListener('click', () => {
    if(isReviewVisible) {
        hideReview();
    } else {
        showReview();
    }
});

function updateStoreResultHTML() {
    storeResultHTML = `<ul class="list-unstyled m-0">`;

    if (storeResultList.length >= 1) {
        storeResultList.forEach((result) => {
            storeResultHTML += `<li class="m-0 p-0">
            <a href="#" class="text-decoration-none">
                <div class="row" >
                    <div class="card container d-flex flex-row m-2 p-0 gap-2">
                        <img class="result-image" src="${result.image}" alt="">
                        <div class="result-info d-flex flex-column w-90">
                            <p class="h3 m-0">${result.name}</p>
                            <p class="smaller-text text-wrap m-0">${result.shortdesc}</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>`;
        })
    
        storeResultHTML += `</ul>`;      
        storeSectionResult.innerHTML = storeResultHTML;
    }
    else {
        storeSectionResult.innerHTML = "No establishments found";
    }
}

function showStore() {
    isStoreVisible = true;

    storeToggle.innerHTML = "Hide"
    storeSectionResult.innerHTML = storeResultHTML;
}

function showReview() {
    isReviewVisible = true;

    reviewToggle.innerHTML = "Hide"
    reviewSectionResult.innerHTML = `
    <ul class="list-unstyled m-0">
        <li>
            <a href="#" class="text-decoration-none text-dark">
                <div class="row" >
                    <div class="card container d-flex flex-row m-2 p-0 gap-2">
                        <img class="result-image" src="../assets/user_pfp/bhozx_josh.png" alt="">
                        <div class="result-info d-flex flex-column w-90">
                            <p class="h3 m-0">McDonald's Classic Cheeseburger: A Timeless Delight! <span class="smaller-text">by Bh0zx JosH</span></p>
                            <p class="smaller-text text-wrap m-0">McDonald's has truly mastered the art of the classic cheeseburger. The perfectly seasoned beef patty, topped with a slice of melted cheese, nestled between two fluffy sesame seed buns is simply irresistible. The flavors are well-balanced, and the quality of ingredients shines through. It's a tried and true favorite that never fails to satisfy my cravings. The only reason I didn't give it a perfect five-star rating is that I wish the pickles were a bit more tangy. Nevertheless, McDonald's classic cheeseburger remains an iconic choice that always hits the spot.</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="text-decoration-none text-dark">
                <div class="row" >
                    <div class="card container d-flex flex-row m-2 p-0 gap-2">
                        <img class="result-image" src="../assets/user_pfp/errol09.png" alt="">
                        <div class="result-info d-flex flex-column w-90">
                            <p class="h3 m-0">Colonel Curry's Signature Chicken: A Spicy Delight!  <span class="smaller-text">by Errol09</span></p>
                            <p class="smaller-text text-wrap m-0">Colonel Curry's signature chicken is a fiery feast for the taste buds. The crispy exterior gives way to tender, juicy chicken that is infused with a blend of aromatic spices. The heat level is just right, providing a satisfying kick without overwhelming the palate. The only reason I didn't give it a perfect five-star rating is that I found it slightly greasier than I prefer. Nevertheless, Colonel Curry's signature chicken is a flavorful dish that will appease any spice lover.</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="text-decoration-none text-dark">
                <div class="row" >
                    <div class="card container d-flex flex-row m-2 p-0 gap-2">
                        <img class="result-image" src="../assets/user_pfp/jstn.png" alt="">
                        <div class="result-info d-flex flex-column w-90">
                            <p class="h3 m-0">Jollibee's Chickenjoy: A Crispy, Flavorful Delight! <span class="smaller-text">by ___Jstn</span></p>
                            <p class="smaller-text text-wrap m-0">Jollibee's Chickenjoy is the epitome of fried chicken perfection. The golden, crispy skin encases succulent, tender meat that is bursting with flavor. Each bite is a harmonious balance of savory and slightly sweet notes, thanks to their secret marinade. The chicken is always cooked to perfection, delivering that satisfying crunch with every bite. Jollibee's Chickenjoy is a true winner and a must-try for any fried chicken lover.</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="text-decoration-none text-dark">
                <div class="row" >
                    <div class="card container d-flex flex-row m-2 p-0 gap-2">
                        <img class="result-image" src="../assets/user_pfp/jomarzkii.png" alt="">
                        <div class="result-info d-flex flex-column w-90">
                            <p class="h3 m-0">Savory Delight: Ate Rica's Bacsilog is a Breakfast Winner! <span class="smaller-text">by Jomarzkii</span></p>
                            <p class="smaller-text text-wrap m-0">Ate Rica's Bacsilog is a breakfast dish that hits all the right notes. The combination of crispy bacon, fluffy garlic fried rice, and a perfectly cooked sunny-side-up egg creates a symphony of flavors. The bacon is savory and adds a satisfying crunch, while the garlic fried rice is fragrant and packed with taste. The runny yolk from the egg adds a creamy element that brings everything together. Ate Rica's Bacsilog is a definite winner for a hearty and delicious breakfast.</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <li>
            <a href="#" class="text-decoration-none text-dark">
                <div class="row" >
                    <div class="card container d-flex flex-row m-2 p-0 gap-2">
                        <img class="result-image" src="../assets/user_pfp/qwerty.png" alt="">
                        <div class="result-info d-flex flex-column w-90">
                            <p class="h3 m-0">Flavorful and Tender: 24Chicken's Signature Fried Chicken Delights! <span class="smaller-text">by &gt;QWERTY&lt;</span></p>
                            <p class="smaller-text text-wrap m-0">24Chicken's signature fried chicken is a true standout. The golden-brown crispy skin gives way to succulent and juicy meat that is packed with flavor. Each bite is a delightful combination of savory and aromatic notes that leave you craving for more. The chicken is expertly seasoned, resulting in a perfectly balanced taste. 24Chicken's signature fried chicken is a must-try for all fried chicken enthusiasts.</p>
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
    `
}

function hideStore() {
    isStoreVisible = false;

    storeToggle.innerHTML = "Show"
    storeSectionResult.innerHTML = ""
}

function hideReview() {
    isReviewVisible = false;

    reviewToggle.innerHTML = "Show"
    reviewSectionResult.innerHTML = ""
}