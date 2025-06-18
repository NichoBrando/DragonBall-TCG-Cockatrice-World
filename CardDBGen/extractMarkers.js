// https://www.dbs-cardgame.com/fw/en/cardlist/?search=true&q=&category%5B%5D=&card_type%5B%5D=Energy+Marker&cost_min=0&cost_max=9&power_min=0&power_max=55000&combo_power_min=0&combo_power_max=10000

const elements = document.getElementsByClassName("lazy");

const results = [];
for (item of elements)
    {
        results.push({
            code: item.dataset.src.split('/').at(-1).replace('.webp', ''),
            cardName: item.alt,
            image: item.src
        })
    }
