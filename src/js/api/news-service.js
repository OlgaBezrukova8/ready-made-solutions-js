const API_KEY = "4330ebfabc654a6992c2aa792f3173a3";
const BASE_URL = "https://newsapi.org/v2";

const options = {
  headers: {
    Authorization: API_KEY,
  },
};

export default class NewsApiService {
  constructor() {
    this.searchBar = "";
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/everything?q=${this.searchBar}&language=en&pageSize=5&page=${this.page}`;
    let test;

    return fetch(url, options)
      .then((response) => response.json())
      .then(({ articles }) => {
        // обновляем страницу (увеличиваем количество)
        this.incrementPage();
        return articles;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get bar() {
    return this.searchBar;
  }

  set bar(newBar) {
    this.searchBar = newBar;
  }
}
