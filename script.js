const list =  [
    { numero: 1, lienimage: "images/minigirafe.jpg", titre: "Mini Girafe" , prix: 50},
    { numero: 2, lienimage: "images/minisanglier.jpg", titre: "Mini Sanglier", prix: 35},
    { numero: 3, lienimage: "images/miniescargot.jpg", titre: "Mini Escargot" , prix: 30},
	{ numero: 4, lienimage: "images/minirenard.jpg", titre: "Mini Renard", prix: 40},
	{ numero: 5, lienimage: "images/miniherisson.jpg", titre: "Mini Herisson", prix: 70},
	{ numero: 6, lienimage: "images/minilapin.jpg", titre: "Mini Lapin", prix : 30},
	{ numero: 7, lienimage: "images/minigneaux.jpg", titre: "Mini Agneaux", prix : 15},
	{ numero: 8, lienimage: "images/minipoulpe.jpg", titre: "Mini Poulpe", prix : 50},
	{ numero: 9, lienimage: "images/minibambi.webp", titre: "Mini Bambi", prix : 15},
	{ numero: 9, lienimage: "images/minielephant.jpg", titre: "Mini éléphant", prix : 18},
	{ numero: 10, lienimage: "images/minivache.jpg", titre: "Mini vache", prix : 23},
	{ numero: 11, lienimage: "images/minikoala.jpg", titre: "Mini koala", prix : 45},
	{ numero: 12, lienimage: "images/minisinge.jpg", titre: "Mini singe", prix : 27},
	{ numero: 12, lienimage: "images/minipieuvre.jpg", titre: "Grande Pieuvre", prix : 120},
	{ numero: 12, lienimage: "images/minilion.jpg", titre: "mini Lion", prix : 30}
];
let basket = []
body = document.querySelector('body');
body.style.backgroundColor = "#fff9f2"

let header = document.createElement('header')
header.classList = "bg-yellow-500 shadow bg-opacity-50 rounded-b-2xl";
body.appendChild(header)

let centerDiv = document.createElement('div')
centerDiv.classList = "max-w-7xl mx-auto p-4 flex items-center space-x-10 justify-between"
header.appendChild(centerDiv)

let homeLink = document.createElement('a')
homeLink.classList = "flex space-x-6 items-center flex-grow"
centerDiv.appendChild(homeLink)

let icon = document.createElement('img')
icon.classList = "h-16"
icon.src = "images/logo.png"
homeLink.appendChild(icon)

let h1 = document.createElement('h1')
h1.classList = "font-medium text-2xl"
h1.textContent = "Peluche Land"
homeLink.appendChild(h1)

let date = document.createElement('p')
date.classList = "font-small text-gray-600"
setInterval("date.textContent = afficherheure()", 1000)
centerDiv.appendChild(date)

let searchDiv = document.createElement('div')
centerDiv.appendChild(searchDiv)

let label = document.createElement('label')
label.textContent = "Recherche :"
label.for = "search_input"
searchDiv.appendChild(label)

let input = document.createElement('input')
input.classList = "input-medium border-2 rounded-xl border-gray-200 ml-2 bg-transparent px-2 py-1"
input.type = "search"
input.addEventListener("keyup", () =>{
    let inputText = input.value.toLowerCase()
    filtre(inputText)
})
searchDiv.appendChild(input)

let openBasketButton = document.createElement('button')
openBasketButton.classList = "py-1 px-4 bg-yellow-500 rounded-lg"
openBasketButton.id = "openBasketButton"
openBasketButton.textContent = "Panier"
openBasketButton.setAttribute("onclick","openBasket()")
centerDiv.appendChild(openBasketButton)

let container = document.createElement('div');
container.classList = "max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
body.appendChild(container)

let articles = document.createElement('div')
articles.classList = "grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
container.appendChild(articles)


for (let i = 0; i < list.length; i++) {
    let article = document.createElement("div")
    article.classList = "article group p-6 bg-yellow-500 bg-opacity-50 rounded-lg"
    article.id = list[i]['numero']
    articles.appendChild(article)

    let imgContainer = document.createElement('div')
    imgContainer.classList = "w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
    article.appendChild(imgContainer)

    let img = document.createElement('img')
    img.src = list[i]['lienimage']
    imgContainer.appendChild(img)

    let h3 = document.createElement('h3')
    h3.classList = "mt-4 text-sm text-gray-700"
    h3.textContent = list[i]['titre']
    article.appendChild(h3)

    let p = document.createElement('p')
    p.classList = "mt-1 text-lg font-medium text-gray-900"
    p.textContent = list[i]['prix'] + "€"
    article.appendChild(p)

    let addToBasketButton = document.createElement('button')
    addToBasketButton.classList = "bg-yellow-500 py-1 px-3 rounded-lg hover:bg-green-500"
    addToBasketButton.textContent = "Ajouter au panier"
    addToBasketButton.setAttribute("onclick","addToBasket(this)")
    article.appendChild(addToBasketButton)
}


function addToBasket(button){
    // console.log("function launch");
    let articleDiv = button.parentNode
    let articleId = articleDiv.id
    // console.log(articleId)
    let newArticle = true
    basket.forEach(function(element) {
        // console.log(element);
        if(element.articleNumero == articleId){
            newArticle = false
            element.quantity ++
        }
    })
    if(newArticle == true){
        basket.push(
            {articleNumero: articleId, quantity: 1}
        )
    }
    let articlesQuantity = 0
    for (let i = 0; i < basket.length; i++) {
        articlesQuantity += basket[i]['quantity']
        console.log(basket[i]['quantity']);
    }
    document.getElementById("openBasketButton").textContent = "Panier " + articlesQuantity
}

// crée au div panier avec tout les article dedan
function openBasket(){
    if(document.getElementById("basket")){
        document.getElementById("basket").remove()
        document.getElementById("backgroundDiv").remove()
    }
    else{
        let backgroundDiv = document.createElement("div")
        backgroundDiv.id = "backgroundDiv"
        backgroundDiv.classList = "fixed inset-0 bg-dark"
        backgroundDiv.setAttribute("onclick","openBasket()")
        body.appendChild(backgroundDiv)


        let basketDiv = document.createElement("div")
        basketDiv.id = "basket"
        basketDiv.classList = "p-4 w-300 absolute rounded-xl shadow"
        basketDiv.style.backgroundColor = "#ffb856"
        basketDiv.style.backgroundColor = "#fff"
        basketDiv.style.top = "100px"
        basketDiv.style.right = "16px"
        body.appendChild(basketDiv)

        let basketArticlesDiv = document.createElement('div')
        basketArticlesDiv.classList = "p-4"
        basketDiv.appendChild(basketArticlesDiv)

        let basketTopSection = document.createElement('div')
        basketTopSection.classList = "flex justify-between"
        basketArticlesDiv.appendChild(basketTopSection)

        let h2 = document.createElement('h2')
        h2.classList = "text-lg font-medium text-grey-900"
        h2.textContent = "Mon panier"
        basketTopSection.appendChild(h2)

        let closeButton = document.createElement('button')
        closeButton.classList = ""
        closeButton.innerHTML = '<svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>'
        closeButton.setAttribute("onclick","openBasket()")
        basketTopSection.appendChild(closeButton)

        let basketArticlesSection = document.createElement('div')
        basketArticlesSection.classList = "mt-8"
        basketArticlesDiv.appendChild(basketArticlesSection)

        let ul = document.createElement('ul')
        ul.classList = "-my-4 divide-y devide-gray-200"
        basketArticlesSection.appendChild(ul)

        let SubTotal = 0
        basket.forEach(element => {
            // console.log(element)
            let id = element.articleNumero
            let elementQuantity = element.quantity 
            let elementTitre = ""
            let elementPrice = 0
            let elementImg = ""
            for (let i = 0; i < list.length; i++) {
                if (list[i]['numero'] == id) {
                    elementTitre = list[i]['titre']
                    elementPrice = list[i]['prix']
                    elementImg = list[i]['lienimage']
                }
            }

            SubTotal += elementPrice * elementQuantity

            let li = document.createElement('li')
            li.classList = "py-6 flex"
            ul.appendChild(li)

            let imgContainer = document.createElement('div')
            imgContainer.classList = "flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden"
            li.appendChild(imgContainer)

            let img = document.createElement('img')
            img.classList = "w-full h-full object-center object-cover"
            img.src = elementImg
            imgContainer.appendChild(img)

            let descDiv = document.createElement('div')
            descDiv.classList = "ml-4 flex-1 flex flex-col"
            li.appendChild(descDiv)

            let nameAndPriceDiv = document.createElement('div')
            nameAndPriceDiv.classList = "flex justify-between text-base font-medium text-gray-900"
            descDiv.appendChild(nameAndPriceDiv)

            let h3 = document.createElement('h3')
            h3.textContent = elementTitre
            nameAndPriceDiv.appendChild(h3)

            let price = document.createElement('p')
            price.classList = "ml-4"
            price.textContent = elementPrice + "€"
            nameAndPriceDiv.appendChild(price)

            let quantityAndRemoveButton = document.createElement('div')
            quantityAndRemoveButton.classList = "flex-1 flex items-end justify-between text-sm"
            descDiv.appendChild(quantityAndRemoveButton)

            let quantity = document.createElement('p')
            quantity.classList = "text-grey-500"
            quantity.textContent = elementQuantity
            quantityAndRemoveButton.appendChild(quantity)

            let removeButton = document.createElement('button')
            removeButton.classList = "font-medium text-yellow-500 hover:text-yellow-400"
            removeButton.textContent = "supprimer"
            removeButton.setAttribute("onclick", `removeToBasket(${id})`)
            quantityAndRemoveButton.appendChild(removeButton)

        });
        let subtotalDiv = document.createElement('div')
        subtotalDiv.classList = "border-t border-gray-200 py-6 px-4 sm:px-6"
        basketDiv.appendChild(subtotalDiv)

        let subtotal = document.createElement('div')
        subtotal.classList = "flex justify-between text-base font-medium text-gray-900"
        subtotalDiv.appendChild(subtotal)

        let pSubtotal = document.createElement('p')
        pSubtotal.textContent = "Total"
        subtotal.appendChild(pSubtotal)

        let priceSubtotal = document.createElement('p')
        priceSubtotal.textContent = SubTotal
        subtotal.appendChild(priceSubtotal)
    }
}

// supprime l'article du panier 
function removeToBasket(numero) {
    console.log(numero);
    console.log("basket.length", basket.length);
    for (let i = 0; i < basket.length; i++) {
        console.log(i);
        if (basket[i]['articleNumero'] == numero) {
            console.log(basket[i]['articleNumero']);
            basket.splice(i, 1)
            openBasket()
            openBasket()
        }
    }
    let articlesQuantity = 0
    for (let i = 0; i < basket.length; i++) {
        articlesQuantity += basket[i]['quantity']
        console.log(basket[i]['quantity']);
    }
    document.getElementById("openBasketButton").textContent = "Panier " + articlesQuantity
}

// masque les articles qui dont le nom et le prix ne corresponde pas a la recherche ?
function filtre(inputText) {
    let articles = document.querySelectorAll('.article')
    articles.forEach(article => {
        let articleText = article.querySelector('h3').innerText.toLowerCase() + " " + article.querySelector('p').innerText.toLowerCase()
        articleText.match(inputText) ? article.style.display = "block" : article.style.display = "none" 
    });
}

function afficherheure() {
    let now = new Date();
    let heure = now.getHours();
    if (heure < 10) {
        heure = "0" + heure;
    }
    let minute = now.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    let seconde = now.getSeconds();
    if (seconde < 10) {
        seconde = "0" + seconde;
    }
    return heure + "h" + minute + "m" + seconde
}