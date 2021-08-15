//function to display the favourites movies
function showFavouritesList(){
    let movieList = document.getElementById('movies_list');
    let favList = document.getElementById('favourites_movies');
    let favBtn = document.getElementById('display_favourites');
    let movieBtn = document.getElementById('display_movies');
    favList.style.display="block";
    movieList.style.display="none";
    favBtn.style.backgroundColor="blue";
    movieBtn.style.backgroundColor="grey";
    if(favList.childElementCount>1){
        let noChild=document.getElementById('no_child');
        noChild.style.display='none';
    }
}
//function to display all movies
function showMoviesList(){
    let movieList = document.getElementById('movies_list');
    let favList = document.getElementById('favourites_movies');
    let favBtn = document.getElementById('display_favourites');
    let movieBtn = document.getElementById('display_movies');
    favList.style.display="none";
    movieList.style.display="block";
    favBtn.style.backgroundColor="grey";
    movieBtn.style.backgroundColor="blue";
}
//function to add the movie into favourites list with functionality
function addToFavouritesList(e){
    console.log(e);
    let wish = document.getElementById(e.id);
    if(wish.innerText == "Favourite"){
    let favouritesMovies = document.getElementById('favourites_movies');
    let parent = e.parentNode.parentNode.children;
    let id = e.parentNode.parentNode.getAttribute('id');
    console.log(e.parentNode.parentNode.getAttribute('id'));
    let item = document.createElement('div');
    item.classList.add('item');
    item.setAttribute('id',`fav${id}`);
    let moviePoster = document.createElement('div');
    moviePoster.classList.add('movie_poster');
    let moviePosterImage = parent[0].children;
    let image = document.createElement('img');
    image.src = moviePosterImage[0].src;
    image.alt="movie_poster";
    moviePoster.appendChild(image);
    item.appendChild(moviePoster);
    let movieInfo = document.createElement('div');
    movieInfo.classList.add('movie_info');
    let mi = parent[1].children;
    let movieTitle = mi[0].firstChild.data;
    let movie_title = document.createElement('p');
    movie_title.classList.add('movie_title');
    movie_title.appendChild(document.createTextNode(movieTitle));
    let moviePlot = mi[1].firstChild.data;
    let movie_plot = document.createElement('p');
    movie_plot.classList.add('movie_plot');
    movie_plot.appendChild(document.createTextNode(moviePlot));
    let movie_wish = document.createElement('p');
    movie_wish.classList.add('movie_fav');
    movie_wish.setAttribute('id',`movie_wish${id}`);
    movie_wish.addEventListener('click',function(){
        item.remove();
        wish.innerText="Favourite";
        //movie_wish.classList.add("movie_wish");
        wish.style.backgroundColor="blue";
        if(favouritesMovies.childElementCount==1){
            let noChild=document.getElementById('no_child');
            noChild.style.display='block';
        }
    });
    movie_wish.appendChild(document.createTextNode("Unfavourite"));
    movieInfo.appendChild(movie_title);
    movieInfo.appendChild(movie_plot);
    movieInfo.appendChild(movie_wish);
    item.appendChild(movieInfo);
    favouritesMovies.appendChild(item);
    //console.log(favouritesMovies.childElementCount);
       wish.innerText="Unfavourite";
       wish.style.backgroundColor="red";

       moviePoster.addEventListener('click',()=>{
        changeTab(movieTitle);
    })
   }else{
       wish.innerText="Favourite";
       wish.style.backgroundColor="blue";
       let favouritesMovies = document.getElementById('favourites_movies');
       let id = e.parentNode.parentNode.getAttribute('id');
       let item = document.getElementById(`fav${id}`);
       favouritesMovies.removeChild(item);
       if(favouritesMovies.childElementCount==1){
        let noChild=document.getElementById('no_child');
        noChild.style.display='block';
    }
   }
}

//function to search for the movie and get the detail to show the result
async function search_movie(){
    let formField = document.getElementById('form_field');
    formField.addEventListener('submit', (e)=>{
        e.preventDefault();
    })
    let movie = document.getElementById('movie').value;
    let movieResponse = await fetch(`https://www.omdbapi.com/?apikey=3ca5df7&t=${movie}`);
    let data = await movieResponse.json();
    console.log(data);
    let searchContainer = document.getElementById('search_container');
    searchContainer.setAttribute("id","search_container");
    let searchResult = document.createElement('div');
    searchResult.classList.add('search_result');
    let searchPoster = document.createElement('div');
    searchPoster.classList.add('search_poster');
    let image = document.createElement('img');
    image.src=data.Poster;
    searchPoster.appendChild(image);
    let movieInfo = document.createElement('div');
    movieInfo.classList.add('movie_information');
    let searchTitle = document.createElement('p');
    searchTitle.classList.add('search_title');
    searchTitle.appendChild(document.createTextNode(data.Title));
    movieInfo.appendChild(searchTitle);
    let searchRating = document.createElement('p');
    searchRating.classList.add('search_rating');
    searchRating.appendChild(document.createTextNode(data.imdbRating));
    movieInfo.appendChild(searchRating);
    let searchAdd = document.createElement('p');
    searchAdd.classList.add('search_add');
    searchAdd.appendChild(document.createTextNode("Add"));
    searchAdd.addEventListener('click', ()=>{
        console.log(data);
        let moviesList = document.getElementById('movies_list');
        console.log(moviesList.childElementCount);
        let count = moviesList.childElementCount + 1;
        let item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('id',count);
        let moviePoster = document.createElement('div');
        moviePoster.classList.add('movie_poster');
        moviePoster.addEventListener('click',()=>{
            showDetail(`movie_detail${count}`);
        })
        let mpImage = document.createElement('img');
        mpImage.src=data.Poster;
        mpImage.alt=data.Title;
        moviePoster.appendChild(mpImage);
        let movieInformation = document.createElement('div');
        movieInformation.classList.add('movie_info');
        let movieTitle = document.createElement('p');
        movieTitle.classList.add('movie_title');
        movieTitle.appendChild(document.createTextNode(data.Title));
        let moviePlot = document.createElement('p');
        moviePlot.classList.add('movie_plot');
        moviePlot.appendChild(document.createTextNode(data.Plot));
        let movieLike =document.createElement('p');
        movieLike.classList.add('movie_wish');
        movieLike.setAttribute('id',`movie_wish${count}`);
        movieLike.appendChild(document.createTextNode("Favourite"));
        movieLike.addEventListener('click', ()=>{
            addToFavouritesList(movieLike);
            console.log(movieLike.id);
        });

        movieInformation.appendChild(movieTitle);
        movieInformation.appendChild(moviePlot);
        movieInformation.appendChild(movieLike);
        item.appendChild(moviePoster);
        item.appendChild(movieInformation);

        moviesList.appendChild(item);

        let movieDetail = document.createElement('div');
        movieDetail.classList.add('movie_detail');
        movieDetail.setAttribute('id',`movie_detail${count}`);
        
        let childContainer = document.createElement('div');
        childContainer.classList.add('child_container');
        
        let ccH3=document.createElement('h3');
        ccH3.addEventListener('click',()=>{
            hideDetail(`movie_detail${count}`);
        })
        ccH3.appendChild(document.createTextNode('Cancel'));
        
        let movieImage = document.createElement('div');
        movieImage.classList.add('movie_image');
      
        let miImage = document.createElement('img');
        miImage.src=data.Poster;
        movieImage.appendChild(miImage);
        
        let movieDetailInformation=document.createElement('div');
        movieDetailInformation.classList.add('movie_detail_information');
        
        let mdTitle=document.createElement('div');
        mdTitle.classList.add('title');
        let mdTitleH1=document.createElement('h1');
        mdTitleH1.appendChild(document.createTextNode("Title"));
        mdTitleP=document.createElement('p');
        mdTitleP.appendChild(document.createTextNode(data.Title));
        mdTitle.appendChild(mdTitleH1);
        mdTitle.appendChild(mdTitleP);

        let mdDirectors=document.createElement('div');
        mdDirectors.classList.add('directors');
        let mdDirectorsH1=document.createElement('h1');
        mdDirectorsH1.appendChild(document.createTextNode("Directors"));
        mdDirectorsP=document.createElement('p');
        mdDirectorsP.appendChild(document.createTextNode(data.Directors));
        mdDirectors.appendChild(mdDirectorsH1);
        mdDirectors.appendChild(mdDirectorsP);

        let mdActors=document.createElement('div');
        mdActors.classList.add('actors');
        let mdActorsH1=document.createElement('h1');
        mdActorsH1.appendChild(document.createTextNode("Actors"));
        mdActorsP=document.createElement('p');
        mdActorsP.appendChild(document.createTextNode(data.Actors));
        mdActors.appendChild(mdActorsH1);
        mdActors.appendChild(mdActorsP);

        let mdAwards=document.createElement('div');
        mdAwards.classList.add('awards');
        let mdAwardsH1=document.createElement('h1');
        mdAwardsH1.appendChild(document.createTextNode("Awards"));
        mdAwardsP=document.createElement('p');
        mdAwardsP.appendChild(document.createTextNode(data.Awards));
        mdAwards.appendChild(mdAwardsH1);
        mdAwards.appendChild(mdAwardsP);

        let mdPlot=document.createElement('div');
        mdPlot.classList.add('plot');
        let mdPlotH1=document.createElement('h1');
        mdPlotH1.appendChild(document.createTextNode("Plot"));
        mdPlotP=document.createElement('p');
        mdPlotP.appendChild(document.createTextNode(data.Plot));
        mdPlot.appendChild(mdPlotH1);
        mdPlot.appendChild(mdPlotP);

        movieDetailInformation.appendChild(mdTitle);
        movieDetailInformation.appendChild(mdDirectors);
        movieDetailInformation.appendChild(mdActors);
        movieDetailInformation.appendChild(mdAwards);
        movieDetailInformation.appendChild(mdPlot);

        childContainer.appendChild(ccH3);
        childContainer.appendChild(movieImage);
        childContainer.appendChild(movieDetailInformation);

        movieDetail.appendChild(childContainer);

        moviesList.appendChild(movieDetail);

        searchResult.remove();
        document.getElementById('movie').value='';
    })
    movieInfo.appendChild(searchAdd);
    let cancel = document.createElement('p');
    cancel.classList.add('cancel');
    cancel.appendChild(document.createTextNode("Cancel"));
    cancel.addEventListener('click',()=>{
        searchResult.remove();
        document.getElementById('movie').value='';
    });
    movieInfo.appendChild(cancel);
    searchResult.appendChild(searchPoster);
    searchResult.appendChild(movieInfo);
    searchContainer.appendChild(searchResult);
    console.log(searchContainer);
}
//to make the search result visible
function show_related_search(){
    let searchContainer = document.getElementById('search_container');
    let child = searchContainer.firstElementChild;
    console.log(child);
    if(child){
        child.remove();
    }else{
        console.log("nothing to remove");
    }
}
//to display the detail of the movie
function showDetail(e){
    let movieDetail=document.getElementById(e);
    movieDetail.style.display="block";
    console.log(e);
}
//to hide the detail of the movie
function hideDetail(e){
    let movieDetail=document.getElementById(e);
    movieDetail.style.display="none";
}