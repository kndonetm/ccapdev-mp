let establishmentsHTML = '';

establishments.forEach((establishment) => {
    establishmentsHTML +=  `
    <div class="col-lg-3">
        <a href="${establishment.link}">
            <div class="content">
                <div class="img-parent"><img src="${establishment.image}" alt=""></div>
                <div class="mt-3">
                    <div class="d-flex justify-content-between">
                        <span class="bold">${establishment.name}</span>
                        <div>
                            <i class="fas fa-star me-2"></i><span class="regular">${establishment.rating}</span>
                        </div>
                    </div>
                    <span class="subtext">${establishment.type1}<br>${establishment.type2}</span>
                </div>
            </div>
        </a>
    </div>`
});
console.log(establishmentsHTML)

document.querySelector('.js-establishments-grid').innerHTML = establishmentsHTML;