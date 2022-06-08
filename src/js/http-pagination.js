import NewsApiService from "./api/news-service";
import "../css/http-pagination.css";

// пагинация - это метод возварата данных в определенном количестве на странице

const refs = {
  form: document.querySelector(".form__pagination"),
  list: document.querySelector(".list__pagination"),
  buttonShow: document.querySelector(".show-button__pagination"),
};

refs.form.addEventListener("submit", onSearch);
refs.buttonShow.addEventListener("click", onLoadMore);

// вызываем класс
const newsApiService = new NewsApiService();

// загружаем статьи при сабмите формы
function onSearch(event) {
  event.preventDefault();

  newsApiService.searchBar = event.currentTarget.elements.searchBar.value;
  if (newsApiService.searchBar === "") {
    return alert("Enter smth normal");
  }
  newsApiService.resetPage();
  newsApiService.fetchArticles().then(appendArticlesMarkup);
}

function onLoadMore() {
  newsApiService.fetchArticles().then(appendArticlesMarkup);
}

function appendArticlesMarkup(articles) {
  const markup = articles
    .map(({ urlToImage, title, author, description }) => {
      return `
  <li class="item__pagination">
    <a target="_blank" href="" rel="noopener norefferer"></a>
    <article class="articles">
      <img class="image__pagination" src=${urlToImage} alt="" width="480" />
      <h2>${title}</h2>
      <p>Posted by: ${author}</p>
      <p>${description}</p>
    </article>
  </li>`;
    })
    .join("");

  refs.list.insertAdjacentHTML("beforeend", markup);
}
