# Web Design @cmda-minor-web 1819
> Demo: [Drag and Drop](https://wd.minor.vandijkstef.nl/)

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
	- Marijn will 'pick up' a card and move it to another column to set it to a different 'state'
- Reorder a card in a column
	- Marijn will 'pick up' a card and reorder it within the column to set a priority
- Edit/Update a card
	- Marijn will 'pick up' a card and change the title and/or its details
- Delete a card
	- Marijn will 'pick up' a card and throw it out.

In general, Marijn will be able to navigate using the WASD keys, and surrounding ones for actions, with the main one being space. A hand pointer shows where the foxus is, and provides feedback on (possible) actions. 


### Exclusive design principals (1.2.2)
> How am I using them?
- Study Situation
	- Need testing
- Ignore Conventions
	- I went for WASD-style navigation with all other controls close to that.
- Prioritise Identity
	- Pretty much nothing works with a mouse
- Add Nonsense
	- I'd like to try some different viewing angles or zooms on the kanban board and trying to recreate a real-world interaction.

### Principals of UI designs (1.3)
> Name a few, sketch it out -> Give variations
- Direct manipulation is best

- Progressive disclosure
- Help people inline
- A crucial moment: the zero state

### Features
- WASD/Arrow navigation
- Spacebar main action

### Testing
- How does Marijn respond to the application in its zero state
- How is Marijn achieving the tasks described in the user scenario
- How does he feel about the controls
- Anything else?

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