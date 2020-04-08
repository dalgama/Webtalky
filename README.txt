# csi3140-winter2020-project-csi3140project_don_olga

Team Member 1:
Name: Don Mariyan Dilanga Algama
Student Number: 8253677

Team Member 2:
Name: Olga Surzhok
Student Number: 8317010

Team Member 3:
Name: Artem Tarasov
Student Number: 8004991 

To run project:
- clone
- inside of root folder run: npm i
- inside of root folder run: npm run devStart
This will create local server that has conection to AWS database

Usage:
- Create atleast two users, or use already existant users: {user: test@test.com pwd: test} and {test123@test pwd: test123}
- log in two diferent account
- select topics
- start chating

Deliveriable 1:

Outline of the Application we will be building:
 - Post an anonymous note about a subject or event you are interested in and would like to start a conversation about (during this process the user will fill a field with the general subject of their note eg. Olympics2020).
 - Once the note is sent, you will receive a note with the same or closely related to your notes general subject sent by another (random) user and you may respond if you are interested in the notes topic.
 - Likewise a different user will recieve your note and will respond if they are interested in your notes topic. 
 - After someone receives your note (or you recieve someone's note), it changes into a chat platform between the two of users while keeping both users personal details anonymous.
 - The chat lifetime is entirely up to users, as long as they keep replying within a defined timeframe, the chat remains.
 - This platform's goal is to create a conversations between people who are interested in a common event or subject.

 Deliverable 2:

 - Technologies used for this deliverable:
	1. HTML
	2. CSS
 - Our site will contain 3 page:
 	1. Index.html is the home page.
 	2. Topic_select.html is the page the user will choose the topic to start a conversation.
 	3. Messeges.html is the page chat page for the users.
 - We chose the following colour palette for our site:
	#edf7fa
	#5f6caf
	#ffb677
	#ff8364
 - Our font-families of choice are:
	Verdana, sans-serif (body)
	Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif (paragraph, list, heading)
 
 Deliverable 3:

To implemt example call to our API in order to retrive an example data do call to https://u0bqxo1avb.execute-api.us-east-1.amazonaws.com/prod/

Current API route status is following:
	      /
		user/{id}
		supported calls:
			- get
			- post
			- delete
			- update
			
example call https://u0bqxo1avb.execute-api.us-east-1.amazonaws.com/prod/user/123

In progress: Msg, conversaton, topic table API implimentation
	
Deliverable 4:

- Chat works:
  - Users send and receive messages
  - Users notified every time a new user logs into the chat
  - Users notified when users log off
  - Withing the chat, each user is identified by their nickname
- Login system:
  - We have a signin system and a register system both are achieved by fetching and putting data to our database.
  - We also have feedback system for the client, to mention what state their account is in such as if they successfully 
    registered their account, logged in with the correct creditials or why their login didn't work.
- Information stored and retrieved from DDB
- Fully functional API to access data
- Updated test cases
