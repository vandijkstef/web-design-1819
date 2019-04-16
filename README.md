# Web Design @cmda-minor-web 1819
<!-- > Demo: Undefined -->

## Assignment (1.0)
Marijn - Design a Drag-and-Drop interface
How can you optimise a drag and drop interface for a user that can only use his keyboard and has a reduced motor skills?

For the assignment I've created a keyboard-only kanban board.

### Getting started

#### Prerequisites
- Some way to serve static files -or- a recent version of Node
- Some way to compile SCSS

#### Installation and development
The project is running statically from the `drag-and-drop` folder, though an Express/Node based server is included. Start things by using the default `npm install && npm start`.

SCSS compiling isn't done by this server, thus needs to be performed manually.

### User scenarios (1.2.1)
The user this app was created for is Marijn. He has reduced motor skills and therefor he cannot use fine pointing devices like a mouse. I know he uses a macbook with sticky keys enabled, and is able to work with a keyboard. Based on assumptions, I'm trying to keep control-buttons to a minimum, promoting re-use and avoiding combinations.
With this application, Marijn can manage a simple kanban board with cards. He should be able to perform the following tasks:
- Create a new card
	- Marijn will create a new card, give it a title, and place it in a column to his liking.
- Move a card to a different column
	- Marijn will 'pick up' a card and move it to another column
- Reorder a card in a column
	- Marijn will 'pick up' a card and reorder it within the column
- Edit/Update a card
	- Marijn will 'pick up' a card and change the title and/or its details
- Delete a card
	- Marijn will 'pick up' a card and throw it out.

In general, Marijn will be able to navigate using the WASD keys, and surrounding ones for actions, with the main one being space.



<!-- User scenarios describe in detail what users do on a website and specifically why they do it. 
A user scenario is like a short story of a person who visits a website with a certain motivation and a specific goal in mind. A good user scenario includes all information that is relevant to the process the user undergoes in order to reach his or her goal, and nothing more. -->

<!-- 1. Who is the user I’m designing for? 
2. What does this user want on my site? 
3. How is this user going to achieve his or her goals? 
4. (Why does this user come to my site and not anywhere else?) -->




### Exclusive design principals (1.2.2)
> How am I using them?
- Study Situation
- Ignore Conventions
- Prioritise Identity
- Add Nonsense

### Principals of UI designs (1.3)
> Name a few, sketch it out -> Give variations
- Direct manipulation is best

- Progressive disclosure
- Help people inline
- A crucial moment: the zero state

### Features
- WASD/Arrow navigation
- Spacebar main action

##### TODOS
I like lists

Key-bound stuff:
	- Q: Quickmenu
		- Q: Close
		- W: Move card to Done
		- E: Export/Download data as JSON
		- A: Add/Create/New
		- S: Settings
		- D: Delete pop-up
			- Shift + D: Delete
	- X: Delete pop-up
		- Shift + X: Delete
	- Z: Reverse
		- Shift + Z: Reverse reverse
	- C: Move card one column to the right

Other:
	- Zooming columns
	- Footer content?
	- Focus keys / Display key
	- Set favorites (on numbers?)
	- Controller support?




☕