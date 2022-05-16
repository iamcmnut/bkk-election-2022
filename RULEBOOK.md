# CAMP Web App rulebook

## State management
- Only use Redux for the Application state changing.
- For the rest of data we can use internal state Freely.
- Use case example: in the swap component we can store all the pending state internally
but after the user finalizes and clicks to actually swap then we should dispatch the Redux's action to change our Application state.

## UI
- We decided to use `mui` (todo: insert more info)

## Project Structure
