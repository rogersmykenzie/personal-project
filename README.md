Video Battle
=======

## Purpose

The purpose of this project was to tone the skills I had learned with the SERN stack as well as test how well I could pick up new technologies on the fly. 

## About the Site

The inspiration for video battle comes from the subreddit r/youtubehaiku where users can post short funny videos that can be upvoted or downvoted. I used to frequent the subreddit and desired to recreate the idea into its own dedicated website. It was used as a personal project for my time at DevMountain, and was created in 12 days.

One of the things I found interesting was the measurement of "funniness". I liked the idea of being able to view the top video on the leaderboard as the most consistently "tested" against other videos to be found funnier. This was why I implemeneted the battle feature to be random, as it would provide for a more accurate and unbiased test.

## Technologies Used
I started out with React.js, Node.js, Express, Redux, and SQL. I set up my initial SQL database but then decided to test my abilities by picking a new database technology - something I hadn't used before. I ended up picking Firebase for my database, since there is a lot in the Firebase Suite that is useful in Web Development. I figured it could be a good stepping stone into some of the other features.

Along with this I integrated Material-UI, SASS, Chart.js, and some GSAP, all of which I had never used before. It was a challenging experience definitely, but it was one I learned a lot from. 

## Pictures

![Battle Screen](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/video-battle%2Fbattle_screen_vb.png?alt=media&token=63c6547a-201b-468f-bdb1-7f02805f310e)

This is the Battle Screen. Two user-uploaded videos are randomly selected for battle. The current user can vote for one video (the one they think is funnier), after which the process starts again and they get two new videos to recreate the process.

![Leaderboard](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/video-battle%2Fleaderboard_vb.png?alt=media&token=1a6e2ad4-ff1f-42fc-bfc9-72d2abd09013)

This is the Leaderboard Page. Here videos are placed in rank based on the number of votes they have recieved in battle.

![Search Result](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/video-battle%2Fsearch_result_page_vb.png?alt=media&token=2bb6fa75-386f-4970-9108-7080c6b3f570)

You may have also forseen the problem of users wanting to see videos they've seen before. This was easily remedied with search functionality, however if users could still vote on the videos when they found them via search it would ruin the purpose and integrity of the leaderboard. Because of this, users can only vote for videos they find in battle. Searching pulls up videos for viewing purposes only.

![Solo Video Player](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/video-battle%2Fsolo_video_player_vb.png?alt=media&token=76f1ac91-112f-4396-b317-fd5e3c350e51)

Here is said video player. Notice that it doesn't have anywhere you can vote for it.

## Contact

Like the project? Have a question? For information, reach out to me at mykenzierogers@gmail.com
