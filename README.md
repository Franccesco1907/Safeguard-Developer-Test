# SafeGuard Privacy Angular exercises

Angular 18 app with notes, a draggable taskboard, smallest-integer and weather exercises.

Run `npm ci`, then `npm start`; open `http://localhost:4200`.
Build with `npm run build`. The checked-in specs need a configured Karma/Jasmine test setup; there is no npm test script.
Weather uses geolocation and `weatherApiKey` in `src/environments/environment.ts`; any browser API key is visible to clients.
Notes are stored in browser localStorage.
