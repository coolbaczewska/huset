window.addEventListener("DOMContentLoaded", init);

function init() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    const search = urlParams.get("search");
    console.log(search)
    console.log(category)

    if (category) {
        getCategoryData(category)
    } else if(search){
        getSearchData()
    }

    else {
        getData();
    }
    getNavigation()


}







function getData() {
    //    console.log("getData")
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve?_embed&tags=34")
        .then(res => res.json())
        .then(handleData)
}

function getCategoryData(catId) {
    console.log(catId)
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve?_embed&categories=" + catId)
        .then(res => res.json())
        .then(handleData)
}

function getNavigation() {
    fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/categories?per_page=100")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            data.forEach(addLink)
        })
}

function addLink(oneItem) {
    console.log(oneItem.name)
    //    document.querySelector("nav").innerHTML += oneItem.name

    if (oneItem.parent === 41) {

        const link = document.createElement("a");
        link.textContent = oneItem.name;
        link.setAttribute("href", "category.html?category=" + oneItem.id);
        document.querySelector("nav").appendChild(link);
    }
}






function getSearchData() {

     const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search");

     console.log("getSearchData")

     fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve?embeded&search="+search)
         .then(res => res.json())
         .then(handleData)
 }




function handleData(myData) {
    console.log('heyyyyyyyy');
        console.log(myData)
    myData.forEach(showPost)
}

function showPost(post) {
    //    console.log(post)

    const template = document.querySelector(".eventsTemplate").content;
    const postCopy = template.cloneNode(true);

    const h1 = postCopy.querySelector("h1");
    h1.textContent = post.title.rendered;

    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");

    let imgPath;
    if(search){
         imgPath = post.image.guid;
    }else{
        imgPath = post._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url
//
    }

    console.log(imgPath)
    const img = postCopy.querySelector("#image");

    img.setAttribute("src", imgPath)
    img.setAttribute("alt", "Event" + post.title.rendered)



    const a = postCopy.querySelector("a");
    a.href = "subpage.html?id=" + post.id;

    const price = postCopy.querySelector("#price")
    price.textContent = post.price;

    const artist = postCopy.querySelector("#artist")
    artist.textContent = post.artist;

    const time = postCopy.querySelector("#time")
    time.textContent = post.time_and_date;

//    const description = postCopy.querySelector("#description")
//    description.textContent = post.description;

    const venue = postCopy.querySelector("#venue")
    venue.textContent = post.venue;

    //    const soldOut = postCopy.querySelector("#soldout")
    //    soldOut.booleanContent = post.soldout;

    //    if (post.soldout) {
    //        console.log("TRUE")
    //    }

    document.querySelector("#posts").appendChild(postCopy)

}



