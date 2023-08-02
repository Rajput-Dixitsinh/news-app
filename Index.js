const API_KEY = "3884813714b44611a65aa107c75ab27c"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener("load", ()=>fetchnews("India"));
function reload(){
    window.location.reload()
}

async function fetchnews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    // bindData(data.articles);
    mergedata(data.articles);
}
function mergedata(articles){
    const cardContainer = document.getElementById('cards-container');
    const newsCardsTemp = document.getElementById('template-news-card');
    cardContainer.innerHTML = '';

    articles.forEach(article =>{
        if (!article.urlToImage) return;
        const cardClone = newsCardsTemp.content.cloneNode(true);
        fillDataCard(cardClone,article)
        cardContainer.appendChild(cardClone);
    })
}
  function fillDataCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTital = cardClone.querySelector('#news-title');
    const newsSrc = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTital.innerHTML= article.title;
    newsDesc.innerHTML= article.description;

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
        timeZone:"Asia/Jakarta"
    });
    cardClone.firstElementChild.addEventListener('click', ()=>{
        window.open(article.url, "_blank");
    })

    newsSrc.innerHTML = `${article.source.name}.${date}`


  }
    let curSelectedNav = null;

  function onNavItemsClick(id){
    fetchnews(id);
    const navItem =  document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav = navItem;
    curSelectedNav.classList.add('active')
  }
  
const  srcBtn = document.getElementById('src-btn');
const  srcText = document.getElementById('src-Text');
srcBtn.addEventListener('click' ,()=>{
const query = srcText.value;
if(!query){
    return;
}
fetchnews(query);
curSelectedNav.classList.remove('active');
curSelectedNav= null;



});
srcText.addEventListener('keydown', event => {
    if (event.key === "Enter") {
      srcBtn.click();
    }
  });

