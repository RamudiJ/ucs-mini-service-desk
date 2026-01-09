#USC Mini Service Desk

This is a modern, responsive support ticket management system built with React and plain CSS. In summary this web application allows the user to create and manage requests with local data presistence.

Features:
Dahboard contains summary of the real time counters for total, open, in progress and resolved tickets.
Can create tickets and form validation is added accordingly.
Can view the all the tickets in a ticket list and can search tickets by title.
Can filter tickets by status and priority.
Additionally, can sort oout tickets by newest or oldest.
Also can get detailed ticket information.
Can update the ticket status as open, in progress or resolved.
Can add internal notes to tickets.
Can export the ticket as csv.
Dark mode is available.

Tech Stack:
React(Vite)
React Router
CSS
Local Storage

Setup Instructions:
Clone the repository.
Navigate to the project folder.
Run `npm install`
After that run `npm run dev`

Deployement:
https://ucs-mini-service-desk.vercel.app/

Known Limitations:
 Data is stored using browser localStorage.
 No real user authentication or backend API.
