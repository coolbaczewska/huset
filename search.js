window.addEventListener("DOMContentLoaded", getData);

 function getData() {

     const urlParams = new URLSearchParams(window.location.search);
const search = urlParams.get("search");


     console.log("getData")
     fetch("http://dredesigns.dk/MyWordpress/wp-json/wp/v2/concerts_theatre_eve?embeded&search="+search)
         .then(res => res.json())
         .then(handleData)
 }

 function handleData(myData) {
     //    console.log(myData)
     myData.forEach(showPost)
 }

 function showPost(post) {
     console.log(post)

     const body = postCopy.querySelector("#body")
     body.innerHTML = post.content.rendered;

     const price = postCopy.querySelector("#price")
     price.textContent = post.price;

     const artist = postCopy.querySelector("#artist")
     artist.textContent = post.artist;

     const time = postCopy.querySelector("#time")
     time.textContent = post.time_and_date;

     const support = postCopy.querySelector("#support")
     support.textContent = post.support_artist;

     const description = postCopy.querySelector("#description")
     description.textContent = post.description;

     const venue = postCopy.querySelector("#venue")
     venue.textContent = post.venue;

     document.querySelector("#posts").appendChild(postCopy)

 }
