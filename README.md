## Project Description

I will build a 2D RPG game using HTML5, CSS and vanilla javascript. For the first phase I want to build a single map, a single character and a single enemy with whom the character can do battle. The character will be a dwarf and the enemy a troll. The map will be a forrest in which the user must circumnavigate trees and rocks. When the user arrives to the page, they will be prompted with instructions and a button to start the game. The dwarf can be controlled with the up, down, right, and left arrows and can swing a battle ax with the enter button. When he approaches the edge of the screen, more of the map will appear. The objective is to reach an endpoint, a door out of the level. Obstacles near the end will funnel you to where a troll is hidden who will appear and begin to attack you. If you vanquish the troll, you can then exit the level. If time permits, the troll will drop loot which you can add to your inventory. The crux of the project, in my opinion, is the AI that controls the troll. I am fairly certain of how to write everything else. All images will be procured from open-sources, including the sprites used for the animations of the dwarf and the troll.

## Project Links

https://jeremystubbs.github.io/Project4

## Wireframes

- https://imgur.com/gallery/mqciSTS

#### MVP

- A main character who the user can make move left, right, up, and down through the webpage and swing a battle axe.
- A forrest background that the main character can interact with
- An enemy controlled with whom the main character can interact
- Hit points for main character and enemy

#### PostMVP

- Health bars for both the main character and the enemy
- An inventory and loot
- Multiple levels
- Multiple enemies
- AI for enemy

## Components

| Component          |                                     Description                                      |
| ------------------ | :----------------------------------------------------------------------------------: |
| First screen       |                       Alert with instructions and start button                       |
| Map                |       Includes traversable grass, and obstacles in the form of trees and rocks       |
| Main character     |               Sprites for motion and attack and javascript control UI                |
| Enemy construction |               Sprites for motion and attack and javascript control UI                |
| Enemy AI           | Artificial Intelligence that make the enemy attack when you have gotten close enough |
| End                |                End animation/notification and option to restart level                |

## Time/Priority Matrix

| Component                   | Priority | Estimated Time | Time Invested | Actual Time |
| --------------------------- | :------: | :------------: | :-----------: | :---------: |
| Main character - Animations |    H     |      6hrs      |      hrs      |     hrs     |
| Main character - Control    |    H     |      6hrs      |      hrs      |     hrs     |
| Map - HTML/CSS              |    H     |      6hrs      |      hrs      |     hrs     |
| Enemy - Animations          |    H     |     4 hrs      |      hrs      |     hrs     |
| Enemy - AI                  |    H     |     12 hrs     |      hrs      |     hrs     |
| Battle parameters           |    H     |      4hrs      |      hrs      |     hrs     |
| End Animation               |    M     |      3hrs      |      hrs      |     hrs     |
| Restart level button        |    M     |      3hrs      |      hrs      |     hrs     |

| Total | - | 44 hrs | hrs | 30 hrs |

## Additional Libraries

TBD

## Code Snippet

TBD
