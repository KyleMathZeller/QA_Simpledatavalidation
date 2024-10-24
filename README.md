
# QA data validation exercise in Playwrite

This project was done as an interview question for a QA developer position and I figured that it would be prudent to add it here if someone wants to see my competence in that area.

This was my first time working with Playwrite so I did need to read a fair amount of documentation so if you have tips and tricks on opimizing my code I would love to hear it as I am still vary much a novice. 

To run this project you use the JS nod program and run it by typing node index.js into the terminal
## Project Requirments

For this project we were tasked to write a simple validation process only modifying the index.js file we were provided. I took this to assume I needed to code the project in Javascript so I brushed of my skills for that.

They also required that we use Microsofts Playwrite which given my current coding set up was easiest for me to do the project in Visual Studio Code.

For the project, they wanted the program to navigate to the provided hyperlink to newest articles on Hacker (https://news.ycombinator.com/newest), and from there they wanted data validation that the top 100 newest articles were properly in order.

There was an allowance to add any library that you wished to the coding process so when I came across a need to do a deep-merge in the project I included the lodash library.
## Problems I encountered

While working on this project I needed to read a lot of documentation. I had not coded in Javascript in about 6 months so I needed to brush up on some methods and syntaxs. On top of that with no prior experience with Playwrite I had to read a LOT.

After getting through the inital troubles of setting up the enviorment for the first time. I started working on the process, one of the more confusing things I encounted is array's work very differently in Javascript versus Python which I have been coding in mostly along with C#. 

When programming my first scrapping algorithm I realized after a quick period that my repo card that I iterated through to grab my data through CSS tags, did not include all the data I needed particularly the date of article posting via "td.subtext". So I spent a small amount of time thinking about how to include come through a combination, however after a couple minutes I realized...I am doing this 100 times, once. The differnce in the O(n) is marginal if this needs to be massively implemented then I can refine the method.

I implemented a save to JSON function as I wanted to manually validate the data as well which I knew would also be helpful for troubleshooting my code as well as possible functionality for a customer in theory if they wanted to see older reports of the data validation

So I implemented the two scrapes and then wrote a quick navigation code to advance to the next 30 article so more reading, this is something I have never done before so I simply had to find the methods I needed to make it work.

Then I ran into first and really only biggest issue. My object arrays were not merging nicely. Drats the double scrape came back to get me. After much reading on merging objects and arrays I realized I need to deep merge the objects. Rather then write the code I found the lodash library and proceed, challenege overcame!

Once I had all my methods and my data properly parsing, all that was left was to write out the fairly simple boolean logic of do both rank and time posted line up? This was quick and eary and VIOLA. 

For a bit of further validation, I introduced an error log and then intentionally fused with the boolean logic and data recieved to check that the program would indeed catch errors since edge cases can sneak through when everything works too well. Satified with my rudementry program I crisen it done.

Thanks for looking at my work I would love feedback as again this was my first time working in Playwrite.

-Kyle
