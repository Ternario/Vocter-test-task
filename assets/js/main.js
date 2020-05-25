let slider = document.querySelector("#slider");
let verticalSlider = document.querySelector("#verticalSlider");
let buttonTop = document.querySelector(".scrollUp");
let buttonDown = document.querySelector(".scrollDown");
let leftBtn = document.querySelector(".leftBtn");
let rightBtn = document.querySelector(".rightBtn");

let listElems;
let verticalListElems;

let position = 0; 
let countSlider = 0;
let widthSlider = 0;
let verticalPosition = 0;
let heightSlider = 227;
let verticalCountSlider = 3;

let windowWidth = () => {
    if(document.documentElement.clientWidth >= 1280) {
        widthSlider = 232;
        countSlider = 5;
    } else if(document.documentElement.clientWidth >= 1200) {
        widthSlider = 232;
        countSlider = 5;
    } else if(document.documentElement.clientWidth >= 1024) {
        widthSlider = 226;
        countSlider = 4;
    } else if(document.documentElement.clientWidth >= 992) {
        widthSlider = 160;
        countSlider = 5;
    } else if(document.documentElement.clientWidth >= 768) {
        widthSlider = 178;
        countSlider = 4;
    } else if(document.documentElement.clientWidth >= 576) {
        widthSlider = 176;
        countSlider = 3;
    } else if(document.documentElement.clientWidth >= 360) {
        widthSlider = 156;
        countSlider = 2;  
    }
}

window.addEventListener("resize", windowWidth());

let request = new XMLHttpRequest();
request.open("Get", "https://raw.githubusercontent.com/Ternario/Kaboodle/master/data.json" );
request.onloadend = function () {
    let data = JSON.parse(request.responseText);
    renderHTML(data);
};
request.send();

let renderHTML = (elem) => {

    for (i = 0; i < elem.length; i++) {

        let comingSoon = document.createElement("div");
        comingSoon.className = "comingSoon-slider__item";
        slider.append(comingSoon);

        let clonComingSoon = comingSoon.cloneNode(true)
        verticalSlider.appendChild(clonComingSoon);
        clonComingSoon.className = "mostPopular-slider__item " + elem[i].type;

        let link = document.createElement("a");
        link.className = "link";
        link.href = elem[i].link;
        comingSoon.append(link);

        let clonLink = link.cloneNode(true)
        clonComingSoon.appendChild(clonLink);
        clonLink.innerHTML = "Read more";

        let title = document.createElement("div");
        title.className = "title";
        title.innerHTML = elem[i].title;
        comingSoon.append(title);

        let year = document.createElement("div");
        year.className = "year";
        year.innerHTML = elem[i].year;
        comingSoon.append(year);

        let poster = document.createElement("img");
        poster.className = "poster";
        poster.src = elem[i].poster;
        comingSoon.append(poster);

        let clonPoster = poster.cloneNode(true)
        clonComingSoon.appendChild(clonPoster);

        let soon = document.createElement("div");
        soon.className = "soon";
        soon.innerHTML = "..."
        comingSoon.append(soon);

        let clonSoon = soon.cloneNode(true)
        clonSoon.className = "clonSoon";
        clonSoon.innerHTML = elem[i].rank || elem[i].expectations_count;
        clonComingSoon.append(clonSoon);

        let comingItems = document.createElement("div");
        comingItems.className = "comingItems";
        comingSoon.append(comingItems);

        let clonComingItems = comingItems.cloneNode(true)
        clonComingSoon.appendChild(clonComingItems);

        let clonTitle = title.cloneNode(true)
        clonComingItems.appendChild(clonTitle);

        let information = document.createElement("div");
        information.className = "information";
        clonComingItems.append(information)

        let content = document.createElement("div");
        content.className = "content";
        content.innerHTML = elem[i].content;
        clonComingItems.append(content);

        let itemsBar = document.createElement("div");
        itemsBar.className = "itemsBar";
        clonComingItems.append(itemsBar);

        let clonYear = year.cloneNode(true)
        information.appendChild(clonYear);

        let playMovie = document.createElement("a");
        playMovie.className = "playMovie";
        comingSoon.append(playMovie);

        let clonPlayMovie = playMovie.cloneNode(true)
        clonComingItems.appendChild(clonPlayMovie);

        let commentsCount = document.createElement("div");
        commentsCount.className = "commentsCount";
        commentsCount.innerHTML = elem[i].comments_count;
        comingItems.append(commentsCount);

        let clonCommentsCount = commentsCount.cloneNode(true)
        itemsBar.appendChild(clonCommentsCount);

        if (elem[i].rank) {
            let rank = document.createElement("div");
            rank.className = "rank";
            rank.innerHTML = elem[i].rank;
            comingItems.append(rank);

            let clonRank = rank.cloneNode(true)
            itemsBar.appendChild(clonRank);

        } else {
            let circle = document.createElement("div");
            circle.innerHTML = elem[i].expectations_count;
            circle.className = "expectations";
            comingItems.append(circle);

            let clonCircle = circle.cloneNode(true)
            itemsBar.appendChild(clonCircle);
        }

        let likesCount = document.createElement("div");
        likesCount.className = "likesCount";
        likesCount.innerHTML = elem[i].likes_count;
        comingItems.append(likesCount);

        let clonLikesCounte = likesCount.cloneNode(true)
        itemsBar.appendChild(clonLikesCounte);

        let director = document.createElement("div")
        director.className = "director";
        director.innerHTML = "Director: " + elem[i].director;
        information.append(director);

        let writer = document.createElement("div")
        writer.className = "writer";
        writer.innerHTML = "Writer: " + elem[i].writer;
        information.append(writer);

        let genres = document.createElement("div");
        genres.className = "genres";
        genres.innerHTML = "Genres:";
        information.append(genres);

        for (j = 0; j < elem[i].genres.length; j++) {
            let genresName = document.createElement("div")
            genresName.className = "genresName";
            genresName.innerHTML = elem[i].genres[j] + ";";
            genres.append(genresName);
        }   
    }
    
    listElems = document.querySelectorAll(".comingSoon-slider__item");
    verticalListElems = document.querySelectorAll(".mostPopular-slider__item")

    let nextSlide = () => {
        position = Math.max(position - widthSlider * countSlider, -widthSlider * (listElems.length - countSlider)) ;
        slider.style.marginLeft = position + "px";
    } 

    let prevSlide = () => {
        position = Math.min(position + widthSlider * countSlider, 0);
        slider.style.marginLeft = position + "px";
    }

    rightBtn.addEventListener("click", nextSlide);
    leftBtn.addEventListener("click", prevSlide);

    let goToTop = () => {
        verticalPosition = Math.min(verticalPosition + heightSlider * verticalCountSlider, 0);
        verticalSlider.style.marginTop = verticalPosition + "px";
    }

    let goToDown = () => {
        verticalPosition = Math.max(verticalPosition - heightSlider * verticalCountSlider, -heightSlider * (verticalListElems.length - verticalCountSlider)) ;
        verticalSlider.style.marginTop = verticalPosition + "px";
        
    }

    buttonTop.addEventListener("click", goToTop);
    buttonDown.addEventListener("click", goToDown);
}

//Attempt to insert dynamic rating


// let grade = document.createElement("div");
//         grade.className = "grade";
//         grade.innerHTML = '<svg class="progress-ring">'  + '<circle class="progress-ring__circle" stroke="#22CA71" stroke-width="8" cx="40" cy="40" r="32" fill="transparent" />' + '</svg>';
//         clonComingSoon.append(grade);

// let circle = document.querySelector(".progress-ring__circle");
//         let radius = circle.r.baseVal.value;
//         let circumference = 2 * Math.PI * radius;

//         circle.style.strokeDasharray = `${circumference} ${circumference}`;
//         circle.style.strokeDashoffset = circumference;
//         let setProgress = (percent) => {
//             let offset = circumference - percent / 100 * circumference;
//             circle.style.strokeDashoffset = offset;

//         }
//         setProgress(elem[i].rank * 10); 

