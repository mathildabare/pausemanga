console.log('mon log');
const searchbar = document.querySelector('#search');



function searchbarFilter() {
    //Barre de recherche 
    searchbar.addEventListener('keyup', filterCards);
    //console.log(resultatRecherche);
}
searchbarFilter()


// Barre de recherche fonction
function filterCards() {
    //Déclarer les variables
    let input, filter, listCard, card, i, txtValue, titre;
    //Donner des valeurs aux variables


    input = document.getElementById('search')
    //console.log('input', input);

    filter = input.value.toLowerCase()
    //console.log(filter);

    listCard = document.getElementById('listCard')
    //console.log(listCard);

    card = listCard.getElementsByTagName('a')
    //console.log(card);


    //Boucle

    for (i = 0; i < card.length; i++) {
        titre = card[i].getElementsByTagName('h4')[0]
        console.log(titre);

        txtValue = titre.textContent || titre.innerText


        if(txtValue.toLowerCase().indexOf(filter) > -1) {
            card[i].style.display = ''
        } else {

            card[i].style.display = 'none'
        }
    }
}
filterCards()