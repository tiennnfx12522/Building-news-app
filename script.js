// phần 1 - tải headlines
var newsListBlock = document.querySelector("#news-block") // khai báo biến để xác định news block để thêm tin tức
var spinner = document.getElementById("spinner");
// Tạo hàm để lấy tin tức thông qua API
function getNews() {
    spinner.removeAttribute('hidden');
    const newsAPI = 'https://gnews.io/api/v4/top-headlines?&lang=en& token=b7b28fbd66609e64bc3caff3f30ce0ad' // khai báo biến để xác định url cho headlines

    fetch(newsAPI)          // fetch API và render nội dung tin tức để hiện thỉ lên website
        .then(function (response) {
            return response.json();
        })
        .then(modifyList);
}

// Execute hàm lấy tin tức
getNews();

// phần 2 updates bằng search

// Open the full screen search box
function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
}

// Close the full screen search box
function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
}

search.addEventListener("click", searchNews)


function searchNews() {
    let keyword = document.getElementById("inputKeyword");
    let topic = keyword.value;

    let start = document.getElementById("startDate");
    let startDate = start.value;

    let end = document.getElementById("endDate");
    let endDate = end.value;

    spinner.removeAttribute('hidden');

    const modApi = `https://gnews.io/api/v4/search?q=${topic}&from=${startDate}T00:00:00Z&to=${endDate}T00:00:00Z&lang=en&token=b7b28fbd66609e64bc3caff3f30ce0ad`
    closeSearch()
    newsListBlock.innerHTML = "";
    fetch(modApi)
        .then(function (response) {
            return response.json();
        })
        .then(modifyList);
}

//hàm thay đổi nội dung newsListBlock
function modifyList(data) {
    data.articles.forEach(article => {

        let li = document.createElement('li'); // tạo list element
        li.classList.add("row");

        let img = document.createElement('img'); // tạo img element
        img.setAttribute('src', article.image);
        img.classList.add("col-sm-4"); //add class vào img element
        img.classList.add("img-fluid")

        let div = document.createElement('div'); //tạo div element
        div.classList.add("col-sm-8");

        let a = document.createElement('a'); // tạo a element

        let h4 = document.createElement('p'); // tạo p element
        h4.classList.add("date"); //add class vào img element
        h4.textContent = `${article.publishedAt}`;

        let p = document.createElement('p'); // tạo p element
        p.classList.add("description"); //add class vào img element
        p.textContent = `${article.description}`;

        a.setAttribute('href', article.url) // thay đổi thuộc tính href của a
        a.setAttribute('target', '_blank') // thay đổi thuộc tính target của a
        a.textContent = article.title; // thay đổi nội dung của a

        newsListBlock.appendChild(li);
        li.appendChild(img);
        li.appendChild(div);
        div.appendChild(a);
        div.appendChild(h4);
        div.appendChild(p);

        spinner.setAttribute('hidden', '');
    })
}