

    //API URL
    const link= "https://api.github.com/search/repositories?q=";

    
    let pageNo = 1;
    //an array where we push all the results for easier manipulation
    let newArr = [];
    let today = new Date();
    
    let month = today.getMonth() +1;
    let dynamicDAte = today.getFullYear()+'-'+month+'-'+today.getDate();
    let dynamicDAteDisplay = document.querySelector('#dynamicDate');
    // dynamicDAteDisplay.innerHTML = dynamicDAte;


    //dynamic Date to always fetch the last repos

    let fetchedDay = today.getDate();
    let fetchDayLink;
    //function to set the date correct for the fetch
    function day_of_the_month(fetchedDay)
    { 
        return (fetchedDay < 10 ? '0' : '') + fetchedDay;
    };

    function month_of_the_year(month)
    { 
        return (month < 10 ? '0' : '') + month;
    };
    
    let dynamicFetchedDay = today.getFullYear()+'-'+month_of_the_year(month -1)+'-'+day_of_the_month(fetchedDay);

    //the actual link with limit controls
    let actualLink = link +'created:>'+dynamicFetchedDay+'&sort=stars&order=desc&per_page=10' ;
//the function to fetch each
    async function getRepo(pageNo){
        const resultArray = await fetch(actualLink+ `&page=${pageNo}`);
        const data = await resultArray.json();
        for(let i = 0; i < 10; i++){

            let mainContainer = document.getElementById("container");
               var div = document.createElement("div");

               //elapsed time variation code start here
               let dayOFCreation = new Date(data.items[i].created_at).getTime();
               let milliseconds = Math.abs(today - dayOFCreation).toString();
               let seconds = parseInt(milliseconds / 1000);
               let minutes = parseInt(seconds / 60);
               let hours = parseInt(minutes / 60);
               let days = parseInt(hours / 24);
               let elapsedTime;
               if(days < 1){
                elapsedTime = hours+' hours';
               }else if(hours < 1){
                elapsedTime = minutes+' minutes'
               }
               else{
                   elapsedTime = days+ ' days'
               }
               //elapsed time variation code start here

               //in case of no description
               let description = (data.items[i].description != null) ? data.items[i].description : ' ';
               //in case of no description

               
               div.classList.add('repo-card');
               content = `
                        <img class="post-image"     src="${data.items[i].owner.avatar_url}" />
                        <div class="repo-details">
                            <h3 class="post-title">${data.items[i].name}</h3>
                            <!--<h4 class="post-category">${data.items[i].name}</h4>-->
                            <p class="post-description">${description}</p>
                            <div class="footer">
                              <p class="post-author">stars: ${data.items[i].stargazers_count}</p>
                              <p class="post-author">Open Issues ${data.items[i].open_issues}</p>
                              <p class="post-author">Published ${elapsedTime} ago by: ${data.items[i].owner.login}</p>
                            <div>  
                        </div>
                    `;
            //    content1 =`
            //        <div id="${data.items[i].id}" class="avatar">
            //            <img class="avatar_url" src="${data.items[i].owner.avatar_url}" alt="">
            //        </div>
            //        <div class="content">
            //            <h2 class="Repository_Name">${data.items[i].name}</h2>
            //            <p class="Description">${description}</p>
            //            <h4 class="stars">${data.items[i].stargazers_count}</h4>
            //            <h4 class="Issues">${data.items[i].open_issues}</h4>
            //            <p class="interval">Submitted ${elapsedTime} ago by: ${data.items[i].owner.login}</p>
            //        </div>
            //    `;
               div.innerHTML = content;
               mainContainer.appendChild(div);
        }
        document.querySelector('#bars').style.display = 'none';
        return today;
    };  
    
getRepo(pageNo)

window.addEventListener('scroll',() =>{
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight && pageNo < 20){
            pageNo += 1;
            document.querySelector('#bars').style.display = 'inline-flex';
            setTimeout(() => {
                getRepo(pageNo);
            }, 1500);
            return pageNo;
    }
});

