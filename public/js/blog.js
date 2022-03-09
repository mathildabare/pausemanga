console.log('mon log');
const searchbar = document.querySelector('#search');


function searchbarFilter() {
     searchbar.addEventListener('keyup', filterCards);
}

searchbarFilter()

function filterCards() {
    let input, filter, listCard, card, i, txtValue, titre;

    input = document.getElementById('search')
    filter = input.value.toLowerCase()
    listCard = document.getElementById('listCard')
    card = listCard.getElementsByTagName('a')

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