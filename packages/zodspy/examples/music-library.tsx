import { MusicLibrarySchema } from "./music-library-schema";

export const musicLibrary = MusicLibrarySchema.parse({
  Title: "Music Library",
  Artists: [
    {
      Name: "Queen",
      Albums: [
        {
          Name: "A Night at the Opera",
          Genre: ["Rock"],
          ReleaseDate: "1975-11-21",
          Label: "EMI / Hollywood Records",
          Tracks: [
            { Title: "Death on Two Legs", Duration: "03:43", Writer: "Freddie Mercury" },
            { Title: "Lazing on a Sunday Afternoon", Duration: "01:08", Writer: "Freddie Mercury" },
            { Title: "I’m in Love with My Car", Duration: "03:05", Writer: "Roger Taylor" },
            { Title: "You’re My Best Friend", Duration: "02:50", Writer: "John Deacon" },
            { Title: "'39", Duration: "03:25", Writer: "Brian May" },
            { Title: "Sweet Lady", Duration: "04:01", Writer: "Brian May" },
            { Title: "Seaside Rendezvous", Duration: "02:13", Writer: "Freddie Mercury" },
            { Title: "The Prophet’s Song", Duration: "08:17", Writer: "Brian May" },
            { Title: "Love of My Life", Duration: "03:38", Writer: "Freddie Mercury" },
            { Title: "Good Company", Duration: "03:26", Writer: "Brian May" },
            { Title: "Bohemian Rhapsody", Duration: "05:55", Writer: "Freddie Mercury" },
            {
              Title: "God Save the Queen",
              Duration: "01:11",
              Writer: "Traditional, arr. Brian May",
            },
          ],
        },
        {
          Name: "A Day at the Races",
          Genre: ["Rock", "Pop"],
          ReleaseDate: "1976-12-10",
          Label: "EMI, Parlophone / Elektra, Hollywood",
          Tracks: [
            { Title: "Tie Your Mother Down", Duration: "04:48", Writer: "Brian May" },
            { Title: "You Take My Breath Away", Duration: "05:09", Writer: "Freddie Mercury" },
            { Title: "Long Away", Duration: "03:34", Writer: "Brian May" },
            { Title: "The Millionaire Waltz", Duration: "04:54", Writer: "Freddie Mercury" },
            { Title: "You and I", Duration: "03:25", Writer: "John Deacon" },
            { Title: "Somebody to Love", Duration: "04:56", Writer: "Freddie Mercury" },
            { Title: "White Man", Duration: "04:59", Writer: "Brian May" },
            { Title: "Good Old-Fashioned Lover Boy", Duration: "02:54", Writer: "Freddie Mercury" },
            { Title: "Drowse", Duration: "03:45", Writer: "Roger Taylor" },
            {
              Title: "Teo Torriatte (Let Us Cling Together)",
              Duration: "05:50",
              Writer: "Brian May",
            },
          ],
        },
      ],
    },
    {
      Name: "Tina Turner",
      Albums: [
        {
          Name: "Break Every Rule",
          Genre: ["Rock", "Pop", "Country", "R&B"],
          ReleaseDate: "1986-09-23",
          Label: "Capitol Records",
          Tracks: [
            { Title: "Typical Male", Duration: "04:18", Writer: "Terry Britten, Graham Lyle" },
            {
              Title: "What You Get Is What You See",
              Duration: "04:31",
              Writer: "Terry Britten, Graham Lyle",
            },
            { Title: "Two People", Duration: "04:11", Writer: "Terry Britten, Graham Lyle" },
            {
              Title: "Till The Right Man Comes Along",
              Duration: "04:11",
              Writer: "Terry Britten, Graham Lyle",
            },
            { Title: "Afterglow", Duration: "04:30", Writer: "Terry Britten, Graham Lyle" },
            { Title: "Girls", Duration: "04:56", Writer: "David Bowie, Erdal Kizilcay" },
            {
              Title: "Back Where You Started",
              Duration: "04:27",
              Writer: "Bryan Adams, Jim Vallance",
            },
            {
              Title: "Break Every Rule",
              Duration: "04:02",
              Writer: "Rupert Hine, Jeannette Obstoj",
            },
            { Title: "Overnight Sensation", Duration: "04:40", Writer: "Mark Knopfler" },
            { Title: "Paradise Is Here", Duration: "05:35", Writer: "Paul Brady" },
            { Title: "I'll Be Thunder", Duration: "05:21", Writer: "Hine, Obstoj" },
          ],
        },
      ],
    },
    {
      Name: "Billy Joel",
      Albums: [
        {
          Name: "River of Dreams",
          Genre: "Rock",
          ReleaseDate: "1993-08-10",
          Label: "Columbia",
          Tracks: [
            { Title: "No Man's Land", Duration: "04:48" },
            { Title: "The Great Wall of China", Duration: "05:45" },
            { Title: "Blonde Over Blue", Duration: "04:55" },
            { Title: "A Minor Variation", Duration: "05:36" },
            { Title: "Shades of Grey", Duration: "04:10" },
            { Title: "All About Soul", Duration: "05:59" },
            { Title: "Lullabye (Goodnight, My Angel)", Duration: "03:32" },
            { Title: "The River of Dreams", Duration: "04:05" },
            { Title: "Two Thousand Years", Duration: "05:19" },
            { Title: "Famous Last Words", Duration: "05:01" },
          ],
        },
      ],
    },
    {
      Name: "Green Day",
      Albums: [
        {
          Name: "American Idiot",
          Genre: ["Pop punk", "Punk rock"],
          ReleaseDate: "2004-09-20",
          Label: "Reprise",
          Tracks: [
            { Title: "American Idiot", Duration: "02:54" },
            { Title: "Jesus of Suburbia", Duration: "09:08" },
            { Title: "Holiday", Duration: "03:52" },
            { Title: "Boulevard of Broken Dreams", Duration: "04:20" },
            { Title: "Are We the Waiting", Duration: "02:42" },
            { Title: "St. Jimmy", Duration: "02:56" },
            { Title: "Give Me Novacaine", Duration: "03:25" },
            { Title: "She's a Rebel", Duration: "02:00" },
            { Title: "Extraordinary Girl", Duration: "03:33" },
            { Title: "Letterbomb", Duration: "04:05" },
            { Title: "Wake Me Up When September Ends", Duration: "04:45" },
            { Title: "Homecoming", Duration: "09:18" },
            { Title: "Whatsername", Duration: "04:14" },
          ],
        },
      ],
    },
  ],
});
