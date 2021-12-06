# github-repo-fetch
a vanilla js code to diplay the top starred repos within the last month

# index html
main and simple html page to work as shell to display the results.
the main container to display the created repo-cards is a div with an id="container';

# css
to kepp a good layout the css is a grid layout

# js
first variable is a const link = to the unchanged part of the link

pageNo = , is to initiate the call;

line from 12 to 15 is optional if displaying the date is wanted

line from 23 to 32 is to manage the one digit months and add a 0 in front

dynamicFetchedDay get the date and substract a month.

actualLink = is the const link + the query criteria of date + the query to sort and limit

function getRepo(pageNo) is the main function that await for an answer{
![Screenshot 2021-12-06 184853](https://user-images.githubusercontent.com/19361143/144896130-8880babc-4624-4eef-9113-85c1c9285824.png)
the edge cases managed are :

    check if the elapsed  time is > minutes || hours|| dates
    
    check if there is a description or let it empty if the answer is null
    
    populate the container with a repo-card for the first 10 repos called
    
    and make sure that the loading bars are not displayed
}

getRepo(pageNo) to initialize the function


and onscroll{
  when the scroll reach the end of the page{
  ![Screenshot 2021-12-06 185111](https://user-images.githubusercontent.com/19361143/144896569-b01b44e9-705a-4c74-9c5c-98921b81df08.png)

    increment the pageNO
    change the loading bar display to inline-flex
    wait for 1500ms to allow the bar animation to be visible
    call the getrepo(pageNo) WHERE pageNoisincermented
    
  }
}
