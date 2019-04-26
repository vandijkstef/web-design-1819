# Web Design @cmda-minor-web 1819
> Demo: [Drag and Drop](https://wd.minor.vandijkstef.nl/)

## Assignment (1.0)
Marijn - Design a Drag-and-Drop interface
How can you optimise a drag and drop interface for a user that can only use his keyboard and has a reduced motor skills?

For the assignment I've created a keyboard-only kanban board.

### Getting started

#### Prerequisites
- Some way to serve static files -or- a recent version of Node
- Some way to compile SCSS (for development)

#### Installation and development
The project is running statically from the `drag-and-drop` folder, though an Express/Node based server is included. Start things by using the default `npm install && npm start`.

SCSS compiling isn't done by this server, thus needs to be performed manually. Compiled CSS is included in the repo.

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

In general, Marijn will be able to navigate using the WASD keys, and surrounding ones for actions, with the main one being space. A hand pointer shows where the focus is, and provides feedback on (possible) actions. Mouse interactions are ignored.

#### Feedback notes
Apparently Marijn is able to use a mouse, but he needs huge click targets. I kept using just the keyboard since I felt he had a lower error rate and I didn't want to compensate by making huge/oversized lay-out elements, resulting in a childish feel.

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

#### A crucial moment: the zero state
> The first time experience with an interface is crucial, yet often overlooked by designers. In order to best help our users get up to speed with our designs, it is best to design for the zero state, the state in which nothing has yet occurred. This state shouldn't be a blank canvas…it should provide direction and guidance for getting up to speed. Much of the friction of interaction is in that initial context…once people understand the rules they have a much higher likelihood of success.

Since this application isn't using much of the known browser patterns, I opted for full-screen overlay hinting the main control structure. It tells you how to navigate (WASD for arrows) and interact (using spacebar). Additionally, it tells you that using your mouse isn't required at all.

Should the screen lose focus this same screen is used with a "Focus lost" warning. While losing focus can be a manual (motor-disabled) error, it could also mean Marijn is continuing coding and coming back to the board after, essentially creating a "zero-point-one"-state.

#### Direct manipulation is best
> The best interface is none at all, when we are able to directly manipulate the physical objects in our world. Since this is not always possible, and objects are increasingly informational, we create interfaces to help us interact with them. It is easy to add more layers than necessary to an interface, creating overly-wrought buttons, chrome, graphics, options, preferences, windows, attachments, and other cruft so that we end up manipulating UI elements instead of what's important. Instead, strive for that original goal of direct manipulation…design an interface with as little a footprint as possible, recognizing as much as possible natural human gestures. Ideally, the interface is so slight that the user has a feeling of direct manipulation with the object of their focus.

While this principle is focusing on not adding any (graphical) fancy-ness and trusting on default behaviours, this wasn't usable for Marijn. By using a hand with several states (open, closed/grabbing, pointing) as a pointer, I essentially recreated a mouse-pointer that feels like a hand to enable 'real-world' direct manipulation for Marijn in a way he isn't able to actually do in the real world. The idle state has a slight animation, showing a 'disconnect' between the hand and the targeted item. If an item is picked up, the hand grabs the item and loses the small animation.

Just like a regular mouse pointer would, the icon changes based on the context:


#### Progressive disclosure
> Show only what is necessary on each screen. If people are making a choice, show enough information to allow them the choice, then dive into details on a subsequent screen. Avoid the tendency to over-explain or show everything all at once. When possible, defer decisions to subsequent screens by progressively disclosing information as necessary. This will keep your interactions more clear.

A lot of the controls included are only displayed when it's actually possible to use them. Additionally, when you open a card, it takes up most of the screen space, dimming out everything else. See *Help people inline* for examples.

#### Help people inline
> In ideal interfaces, help is not necessary because the interface is learnable and usable. The step below this, reality, is one in which help is inline and contextual, available only when and where it is needed, hidden from view at all other times. Asking people to go to help and find an answer to their question puts the onus on them to know what they need. Instead build in help where it is needed…just make sure that it is out of the way of people who already know how to use your interface.

Combined with progressive disclosure, I provide various inline hinting of controls, shown when usable.

### Features
- WASD/Arrow navigation
- Spacebar main action
- Managing cards
- Setting favorites (hotkeys)

#### Missing/Wanted features
- Creating a new card
- Deleting a card
- Quick-menu showing available actions (under Q)
- Undo action
- Card options with non-textlike input fields (select, radio, checkbox etc)
- Sound FX

### Testing
**How does Marijn respond to the application in its zero state?**  
His first response was a smile, and saying that it looks like something from the 80's. He liked the retro touch of the design, so I kept that.

**How is Marijn achieving the tasks described in the user scenario? / How does Marijn feel about the controls**  
During the first test, Marijn was getting the controls immediatly, and was throwing cards around the board like it was nothing. Also he was able to find how to open a card a read it's details. At that time, it wasn't possible to edit the details.  
During the second test, Marijn remembered the project, pressed space to start using it and then went on using the arrow keys over the WASD keys. While arrow key are also functional, he started using the (not-used) enter key because he was defaulting to arrow keys. This gave him some frustration since he felt like it was worse then last week, but nohting was actually changed in this part of the controls. For me this was an experience of changing context and/or attention during testing.  
The main goal to find out during the second test was to see if Marijn could easily switch between 'navigation-mode' and 'writing-mode' to update card details. While he did understand the control pattern I gave him, he urged me to implement the ENTER and TAB keys for this interaction.

**Anything else?**  
To ease navigation, I've created the option to add (numbered) hotkeys to a card. Without explaining the feature, but just asking to explore it, he created a hotkey for a card and immediatly understood how he could use this to quickly jump to cards.

### Last test's results
The last test showed some flaws in the control scheme over the first test. While this was mainly to do with Marijn's attention being lower during the second test, it does need improvement. Here his main points of feedback and my intended actions:
- Why can't I use the enter key?
	- I overlooked this since I focused on WASD navigation. While I definitly should implement the enter key contextually (meaning it will have the same action as `space` on one state, but a totally different one on another state) I would also (subtly) show a message that the app is optimised for WASD/Space over Arrow/Enter
- How can I open a card?
	- I was surprised he actually asked this, since he was doing this just fine the week before. When u 'grab' a card, it shows a text `Press E to open` which was shortened to `E to open` for the second text. I should provide a more consistent way to show control-keys, mainly by just updating their style.

☕
