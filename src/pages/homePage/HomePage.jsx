import VideoGalleryGrid from "../../components/VideoGalleryGrid";
import { useAxios } from "../../hooks/useAxios";

const HomePage = () => {
  const {
    response: videos,
    error,
    isLoading,
  } = useAxios({
    url: `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&key=${
      import.meta.env.VITE_GOOGLE_API_KEY
    }`,
  });

  // const isLoading = false;
  // const error = "";
  // const videos = {
  //   kind: "youtube#videoListResponse",
  //   etag: "iF-u3a8o_REOP3xmNvpQIBxmej0",
  //   items: [
  //     {
  //       kind: "youtube#video",
  //       etag: "VwZF3UInHlxErszFGoy69ald2ck",
  //       id: "v3mTRLpA2Rk",
  //       snippet: {
  //         publishedAt: "2024-04-06T20:24:02Z",
  //         channelId: "UCwVg9btOceLQuNCdoQk9CXg",
  //         title: "I Built a SECRET McDonald's in My Room!",
  //         description:
  //           "I built 3 SECRET restaurants  in my house! The ending was crazy...\n\nSubscribe below! \nSTAY WILD @StayWild- \nCAM HUFF @CamHuff \n\n☆ FOLLOW ME!\nINSTAGRAM: @BenAzelart https://www.instagram.com/benazelart/\nYOUTUBE: Ben Azelart https://www.youtube.com/benazelart/\nSNAPCHAT: @BenAzelart",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/v3mTRLpA2Rk/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/v3mTRLpA2Rk/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/v3mTRLpA2Rk/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/v3mTRLpA2Rk/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/v3mTRLpA2Rk/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "Ben Azelart",
  //         tags: [
  //           "ben azelart",
  //           "brent rivera",
  //           "Lexi rivera",
  //           "stokes twins",
  //           "ben Azelart girlfriend",
  //           "Lexi rivera boyfriend",
  //           "mylifeaseva",
  //           "lexi hensler",
  //           "Andrew davila",
  //           "pierson",
  //           "Pierson wodzynski",
  //           "Jeremy hutchins",
  //           "dom brack",
  //           "Brent and pierson",
  //           "Airrack",
  //           "mrbeast",
  //           "preston",
  //           "unspeakable",
  //           "Mathew beem",
  //           "Ryan trahan",
  //           "i built a secret room",
  //           "i built",
  //           "secret",
  //           "mcdonald's",
  //           "4 secret rooms",
  //           "5 secret rooms",
  //         ],
  //         categoryId: "24",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "I Built a SECRET McDonald's in My Room!",
  //           description:
  //             "I built 3 SECRET restaurants  in my house! The ending was crazy...\n\nSubscribe below! \nSTAY WILD @StayWild- \nCAM HUFF @CamHuff \n\n☆ FOLLOW ME!\nINSTAGRAM: @BenAzelart https://www.instagram.com/benazelart/\nYOUTUBE: Ben Azelart https://www.youtube.com/benazelart/\nSNAPCHAT: @BenAzelart",
  //         },
  //         defaultAudioLanguage: "en",
  //       },
  //       statistics: {
  //         viewCount: "4782014",
  //         likeCount: "72951",
  //         favoriteCount: "0",
  //         commentCount: "6757",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "sLM6AaIaSNLad3kmBDRHdnGn8CI",
  //       id: "tnb8XcGbYCM",
  //       snippet: {
  //         publishedAt: "2024-04-06T14:00:01Z",
  //         channelId: "UCRijo3ddMTht_IHyNSNXpNQ",
  //         title: "Dude Perfect vs. MLB Pitcher",
  //         description:
  //           'Can Ty get a hit off a WORLD SERIES winning pitcher? Welcome to a BRAND NEW Dude Perfect series, QUEST! So what do you think? Can Ty hit MLB champ José LeClerc?! \n\n► Thanks for subscribing! - http://bit.ly/SubDudePerfect\n► Special thank you to the Texas Rangers and MLB for letting us experience Spring Training! Major League Baseball footage and trademarks used with permission of Major League Baseball. All rights reserved. \n► Special thanks to TCU and Carson Cormier for helping us a train! Follow along to keep up with Carson’s journey! @TCUbaseball \nAnd thanks to José and Chase for helping us out!\n\nMusic by Sam Tinnesz and OTTO BLUE:\n► Click HERE to download the FLAMETHROWER EP by Sam Tinnesz and OTTO BLUE - https://music.apple.com/us/album/flamethrower-ep/\n► Click HERE to visit Sam Tinnesz\'s Facebook page - https://www.facebook.com/SamTinnesz/\n► Click HERE to listen on Spotify - https://open.spotify.com/album/0rlELjeqtPrliaoF3fzzDM?si=eznrkbSVROOygfRqBoJ3WQ\n► Click HERE to listen on YouTube - https://www.youtube.com/channel/UCbb2JJRVnkkuDs6tzlq2GLw\n► Click HERE to visit Sam Tinnesz\'s Instagram Page: https://www.instagram.com/samtinnesz\n► Click HERE to visit OTTO BLUE\'s Instagram Page: https://www.instagram.com/ottoblueofficial/\n► Click HERE to use the "This Is Our World Now" on TikTok: https://www.tiktok.com/t/ZTLBqNp5n/\n► Click HERE to use the "All Systems Go " on TikTok: https://www.tiktok.com/t/ZTLBqjkoH/\n\nNEXT LEVEL STUFF \n-------------------------------------------\n🎒 NEW Merch - http://bit.ly/DPStore\n📱 Text us - (469) 205-7005\n🔔 Hit the bell next to Subscribe so you don\'t miss a video!\n👨🏻‍💻 Watch our newest vids! - http://bit.ly/NewDPVids\n📕 Read our Book - "101 Tips, Tricks and Cool Stuff" - https://bit.ly/NewDPBook\n\nFollow our Instagrams so we can be best friends \n-------------------------------------------\n🏆 http://Instagram.com/DudePerfect\n🧔🏻 http://Instagram.com/TylerNToney\n👱🏻‍♂️ http://Instagram.com/Cody_Jones_\n🙋🏻‍♂️ http://Instagram.com/CobyCotton\n👨‍🦰 http://Instagram.com/GarrettHilbert\n⛹🏻‍♂️ http://Instagram.com/CoryCotton\n-------------------------------------------\n"This Is Our World Now" and "All Systems Go"\nPerformed by Sam Tinnesz and Otto Blue\nCourtesy of Position Music and Honestly Good Music\nWritten by Sam Tinnesz and Josh Thomas Bronleewe\n(C) Case Ace Music (SESAC) / Only Giner with a Soul Publishing (SESAC) / J Bronleewe Songs (SESAC)\n-------------------------------------------\nBonus points if you\'re still reading this! \nComment: What QUEST should we take on next?!\n\nClick here to learn more about Dude Perfect:\nhttp://bit.ly/AboutDudePerfect\n\nAs always...Go Big and God Bless!\n- Your friends at Dude Perfect\n\nBusiness or Media, please contact us at: \nDude@DudePerfect.com\n\n------------\n\n5 Best Friends and a Panda.\nIf you like Sports + Comedy, come join the Dude Perfect team!\n\nBest known for trick shots, stereotypes, battles, bottle flips, ping pong shots and all-around competitive fun, Dude Perfect prides ourselves in making the absolute best family-friendly entertainment possible! Welcome to the crew! \n\nPound it 👊🏻 Noggin 🙇🏻‍♂️ \n- Dude Perfect',
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/tnb8XcGbYCM/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/tnb8XcGbYCM/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/tnb8XcGbYCM/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/tnb8XcGbYCM/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/tnb8XcGbYCM/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "Dude Perfect",
  //         tags: [
  //           "dude perfect",
  //           "dude perfect stereotypes",
  //           "dude perfect water bottle flip",
  //           "bottle flip",
  //           "water bottle flip",
  //           "dude perfect bottle flip",
  //           "dude perfect basketball",
  //           "dp",
  //           "dude perfect world record",
  //           "edition",
  //           "nerf",
  //           "trick shots",
  //           "trick shot",
  //           "family",
  //           "ping pong",
  //           "bowling",
  //           "clean",
  //           "family friendly",
  //           "bubble wrap",
  //           "soccer",
  //           "football",
  //           "spinner",
  //           "spinners",
  //           "fidget spinners",
  //           "dude",
  //         ],
  //         categoryId: "17",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "Dude Perfect vs. MLB Pitcher",
  //           description:
  //             'Can Ty get a hit off a WORLD SERIES winning pitcher? Welcome to a BRAND NEW Dude Perfect series, QUEST! So what do you think? Can Ty hit MLB champ José LeClerc?! \n\n► Thanks for subscribing! - http://bit.ly/SubDudePerfect\n► Special thank you to the Texas Rangers and MLB for letting us experience Spring Training! Major League Baseball footage and trademarks used with permission of Major League Baseball. All rights reserved. \n► Special thanks to TCU and Carson Cormier for helping us a train! Follow along to keep up with Carson’s journey! @TCUbaseball \nAnd thanks to José and Chase for helping us out!\n\nMusic by Sam Tinnesz and OTTO BLUE:\n► Click HERE to download the FLAMETHROWER EP by Sam Tinnesz and OTTO BLUE - https://music.apple.com/us/album/flamethrower-ep/\n► Click HERE to visit Sam Tinnesz\'s Facebook page - https://www.facebook.com/SamTinnesz/\n► Click HERE to listen on Spotify - https://open.spotify.com/album/0rlELjeqtPrliaoF3fzzDM?si=eznrkbSVROOygfRqBoJ3WQ\n► Click HERE to listen on YouTube - https://www.youtube.com/channel/UCbb2JJRVnkkuDs6tzlq2GLw\n► Click HERE to visit Sam Tinnesz\'s Instagram Page: https://www.instagram.com/samtinnesz\n► Click HERE to visit OTTO BLUE\'s Instagram Page: https://www.instagram.com/ottoblueofficial/\n► Click HERE to use the "This Is Our World Now" on TikTok: https://www.tiktok.com/t/ZTLBqNp5n/\n► Click HERE to use the "All Systems Go " on TikTok: https://www.tiktok.com/t/ZTLBqjkoH/\n\nNEXT LEVEL STUFF \n-------------------------------------------\n🎒 NEW Merch - http://bit.ly/DPStore\n📱 Text us - (469) 205-7005\n🔔 Hit the bell next to Subscribe so you don\'t miss a video!\n👨🏻‍💻 Watch our newest vids! - http://bit.ly/NewDPVids\n📕 Read our Book - "101 Tips, Tricks and Cool Stuff" - https://bit.ly/NewDPBook\n\nFollow our Instagrams so we can be best friends \n-------------------------------------------\n🏆 http://Instagram.com/DudePerfect\n🧔🏻 http://Instagram.com/TylerNToney\n👱🏻‍♂️ http://Instagram.com/Cody_Jones_\n🙋🏻‍♂️ http://Instagram.com/CobyCotton\n👨‍🦰 http://Instagram.com/GarrettHilbert\n⛹🏻‍♂️ http://Instagram.com/CoryCotton\n-------------------------------------------\n"This Is Our World Now" and "All Systems Go"\nPerformed by Sam Tinnesz and Otto Blue\nCourtesy of Position Music and Honestly Good Music\nWritten by Sam Tinnesz and Josh Thomas Bronleewe\n(C) Case Ace Music (SESAC) / Only Giner with a Soul Publishing (SESAC) / J Bronleewe Songs (SESAC)\n-------------------------------------------\nBonus points if you\'re still reading this! \nComment: What QUEST should we take on next?!\n\nClick here to learn more about Dude Perfect:\nhttp://bit.ly/AboutDudePerfect\n\nAs always...Go Big and God Bless!\n- Your friends at Dude Perfect\n\nBusiness or Media, please contact us at: \nDude@DudePerfect.com\n\n------------\n\n5 Best Friends and a Panda.\nIf you like Sports + Comedy, come join the Dude Perfect team!\n\nBest known for trick shots, stereotypes, battles, bottle flips, ping pong shots and all-around competitive fun, Dude Perfect prides ourselves in making the absolute best family-friendly entertainment possible! Welcome to the crew! \n\nPound it 👊🏻 Noggin 🙇🏻‍♂️ \n- Dude Perfect',
  //         },
  //         defaultAudioLanguage: "en",
  //       },
  //       statistics: {
  //         viewCount: "2552272",
  //         likeCount: "101196",
  //         favoriteCount: "0",
  //         commentCount: "5650",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "b73UDi96qqmX1tM4vxc0f9IWYrY",
  //       id: "VZIm_2MgdeA",
  //       snippet: {
  //         publishedAt: "2024-04-05T04:00:06Z",
  //         channelId: "UCK4Gv-nQkIl-n17sfSmshGA",
  //         title: "JoJo Siwa - Karma (Official Video)",
  //         description:
  //           "Official Video for “Karma” by JoJo Siwa\n \nListen to & Download “Karma” out now: https://jojosiwa.lnk.to/Karma\n\nAmazon Music: https://jojosiwa.lnk.to/Karma/AmazonMusic\nApple Music: https://jojosiwa.lnk.to/Karma/AppleMusic\niTunes: https://jojosiwa.lnk.to/Karma/iTunes\nPandora: https://jojosiwa.lnk.to/Karma/Pandora\nSoundcloud: https://jojosiwa.lnk.to/Karma/Soundcloud\nSpotify: https://jojosiwa.lnk.to/Karma/Spotify\nYouTube Music: https://jojosiwa.lnk.to/Karma/YouTubeMusic\nYouTube: https://jojosiwa.lnk.to/Karma/YouTube\n\nFollow JoJo SIwa: \nhttps://www.instagram.com/itsjojosiwa\nhttps://www.tiktok.com/@itsjojosiwa\nhttps://www.facebook.com/itsjojosiwa\nhttps://twitter.com/itsjojosiwa\nhttps://www.jojosiwa.com\n\nCredits:\nDirectors: Marc Klasfeld and Joelle Siwa\nEP: Joelle Siwa\nEP/Producer: Missy Galanida\nEP: Andrea Saavedra\nProducer: Jamee Ranta\nProduction Supervisor: Christine Miller\nProduction Coordinator: Nikki Penta\n1st AD: Michael Estrella\n2nd AD: Jimmy Ramirez\n \nDP: Corey Jennings\nSteadicam OP: Chris Pinto\n1st AC (underwater): Spencer Wood\n2nd AC: Cole Brewer\nDIT: Fabricio Santo\nVTR/Playback: Ignacio Martinez\n \nGaffer: Mike Cruz\nBB Electric: Matt Boswell\nElectric: Tony Ortiz\nElectric: Joel Gill\nElectric: Kieran Waugh\nElectric: Matthew Hall\n \nKey Grip: Adam Shambour\nBB Grip: James Howell\nBB Grip; Jose Gonzalez\nGrip: Robert Alvarez\nGrip: Chris Velez\nGrip: Hermexial Dresilus\n \nProduction Designer: Elizabet Puksto\nLead Man: Randall Papavero\nConstruction: Max Gonzalez\n \nKey Vanities: Nikki Parisi\nHAIR/MU Asst: Joelle Siwa\nHair/MU Asst: Stacy Gonzalez\nHair/MU Asst: Onontungalag Oyunjargal\nHair/MU Asst: Stephanie Yniguez\nHair/MU Asst: Stephanie Kilmer\n \nArtist Makeup: Katelyn Thorpe\nArtist Makeup Asst: Annabeth Barre\nArtist Hair: Cory Rotenberg\nCostume Designer: Keri Burkett\nTailor: David Ramirez\nWardrobe Asst: Frankie Klasfeld\nWardrobe Asst : Bridget Wanniger \n \nSiwa Management/Creative Director: Jessalyn Siwa\n \nChoreographer: Richy Jackson\n \nCast:\nRed: Alexis Warr\nGirlfriend: Malia Murray\nDancer: Justin Porter\nDancer:  Max Larsen\nDancer: Davyd Williams-Gissendanner\nDancer: Jake Gonzales\nDancer: Joseph Szekula\nDancer: Amari Smith\n \nPhotos: Kat Temkin\nPhoto Producer: Morgan Russell\nArtist BTS: Cameron McLeod\nArtist BTS: KC Siwa\n \nPA (office): Amara Miller\nPA (truck): Oscar Hernandez\nPA (Sprinter): Marvin Hernandez\nPA (AD): Tristan Conner\nPA (AD): Sydney Baichtal\nPA (set): Gabby Garcia\nPA (Pool): Justin Corrigan\n \nMedic: Shane Hermanson\nCraft Service: Patrick Hotaling\n \nStage Manager: Brian Gordon\nSite Rep: Mike Lancaster\n \nEditor: Steve Reiss / Sunset Edit\nVFX: Sergei Mashevskyi / Cameo FX\nColorist: Beau Leon, Loren White \n \nVideo Commissioner: Jill Kaplan\nMarketing; Hannah Friedland\nDigital Marketing: Drew Schieffelin\nDigital Content: Kailee Heller\nCreative Administration: Luis Cárdenas\nPublicity: Ashley Buenrostro\nA&R: Rani Hancock\n\nLyrics:\nI was a bad girl\nI did some bad things\nI swear I did it all for fun and it meant nothing\nIt never happened \nIt was a secret \nLike when a tree falls in the forest no one hears it \nAnother late night\nAnother crazy mood\nAnd I didn’t think twice what it would do to you\nI was a wild child\nYou always knew it\nIt was a matter of time before I blew it\n \nThou shall not lie \nThou shall not cheat \nThou shall not get caught or you’ll end up just like me \n \nOh karma’s a bitch \nI should have known better \nIf I had a wish I would have never effed around \nWhen I saw the pics of you and her I felt the knife twist \nKarma’s a bitch and she’s with you right now\nKarma’s a bitch\nKarma’s a bitch\nBetter be good cause what goes around comes around\nKarma’s a bitch \nAnd she’s with you right now\n \nShe is a good girl\nI think she’s boring\nBelieve me 20 mins later you’ll be snoring \nBut it still kills me\nThat you hooked up with her\nAnd now the universe is giving me what i deserve\n \nThou shall not lie\nThou shall not cheat \nI’ll write it down a thousand times and hope it sets me free\n \nOh karma’s a bitch \nI should have known better \nIf I had a wish I would have never effed around \nWhen I saw the pics of you and her I felt the knife twist \nKarma’s a bitch and she’s with you right now\nKarma’s a bitch\nKarma’s a bitch\nBetter be good cause what goes around comes around\nKarma’s a bitch \nAnd she’s with you right now\n \nAnd when I lay me down to sleep it’s not your body next to me \nThis lonely room feels so empty just me and my regrets\nAnd cold blue eyes look back at me the mirror has no sympathy \nMy guilt’s become a symphony that won’t let me forget\n \nOh karma’s a bitch \nI should have known better \nIf I had a wish I would have never effed around \nWhen I saw the pics of you and her I felt the knife twist \nKarma’s a bitch and she’s with you right now \n\n#JoJoSiwa #Karma",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/VZIm_2MgdeA/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/VZIm_2MgdeA/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/VZIm_2MgdeA/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/VZIm_2MgdeA/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/VZIm_2MgdeA/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "JoJoSiwaVEVO",
  //         tags: [
  //           "JoJo Siwa New Song",
  //           "JoJo Siwa Karma",
  //           "JoJo Siwa Official Music",
  //           "JoJo Siwa TikTok",
  //           "JoJo Siwa Boomerang",
  //           "JoJo Siwa Kid in candy store",
  //           "I'm come back like boomerang",
  //           "Karma's bitch",
  //           "was bad girl",
  //           "did some bad things",
  //           "and she's with you right now",
  //           "JoJo Siwa Nickelodeon",
  //           "JoJo Siwa Adult Music",
  //           "JoJo Siwa Bows",
  //           "JoJo Siwa Official Music Video",
  //           "JoJo Siwa Music Video",
  //           "Karmas bitch should have known better",
  //           "was",
  //           "bad",
  //           "girl",
  //           "did",
  //           "some",
  //         ],
  //         categoryId: "10",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "JoJo Siwa - Karma (Official Video)",
  //           description:
  //             "Official Video for “Karma” by JoJo Siwa\n \nListen to & Download “Karma” out now: https://jojosiwa.lnk.to/Karma\n\nAmazon Music: https://jojosiwa.lnk.to/Karma/AmazonMusic\nApple Music: https://jojosiwa.lnk.to/Karma/AppleMusic\niTunes: https://jojosiwa.lnk.to/Karma/iTunes\nPandora: https://jojosiwa.lnk.to/Karma/Pandora\nSoundcloud: https://jojosiwa.lnk.to/Karma/Soundcloud\nSpotify: https://jojosiwa.lnk.to/Karma/Spotify\nYouTube Music: https://jojosiwa.lnk.to/Karma/YouTubeMusic\nYouTube: https://jojosiwa.lnk.to/Karma/YouTube\n\nFollow JoJo SIwa: \nhttps://www.instagram.com/itsjojosiwa\nhttps://www.tiktok.com/@itsjojosiwa\nhttps://www.facebook.com/itsjojosiwa\nhttps://twitter.com/itsjojosiwa\nhttps://www.jojosiwa.com\n\nCredits:\nDirectors: Marc Klasfeld and Joelle Siwa\nEP: Joelle Siwa\nEP/Producer: Missy Galanida\nEP: Andrea Saavedra\nProducer: Jamee Ranta\nProduction Supervisor: Christine Miller\nProduction Coordinator: Nikki Penta\n1st AD: Michael Estrella\n2nd AD: Jimmy Ramirez\n \nDP: Corey Jennings\nSteadicam OP: Chris Pinto\n1st AC (underwater): Spencer Wood\n2nd AC: Cole Brewer\nDIT: Fabricio Santo\nVTR/Playback: Ignacio Martinez\n \nGaffer: Mike Cruz\nBB Electric: Matt Boswell\nElectric: Tony Ortiz\nElectric: Joel Gill\nElectric: Kieran Waugh\nElectric: Matthew Hall\n \nKey Grip: Adam Shambour\nBB Grip: James Howell\nBB Grip; Jose Gonzalez\nGrip: Robert Alvarez\nGrip: Chris Velez\nGrip: Hermexial Dresilus\n \nProduction Designer: Elizabet Puksto\nLead Man: Randall Papavero\nConstruction: Max Gonzalez\n \nKey Vanities: Nikki Parisi\nHAIR/MU Asst: Joelle Siwa\nHair/MU Asst: Stacy Gonzalez\nHair/MU Asst: Onontungalag Oyunjargal\nHair/MU Asst: Stephanie Yniguez\nHair/MU Asst: Stephanie Kilmer\n \nArtist Makeup: Katelyn Thorpe\nArtist Makeup Asst: Annabeth Barre\nArtist Hair: Cory Rotenberg\nCostume Designer: Keri Burkett\nTailor: David Ramirez\nWardrobe Asst: Frankie Klasfeld\nWardrobe Asst : Bridget Wanniger \n \nSiwa Management/Creative Director: Jessalyn Siwa\n \nChoreographer: Richy Jackson\n \nCast:\nRed: Alexis Warr\nGirlfriend: Malia Murray\nDancer: Justin Porter\nDancer:  Max Larsen\nDancer: Davyd Williams-Gissendanner\nDancer: Jake Gonzales\nDancer: Joseph Szekula\nDancer: Amari Smith\n \nPhotos: Kat Temkin\nPhoto Producer: Morgan Russell\nArtist BTS: Cameron McLeod\nArtist BTS: KC Siwa\n \nPA (office): Amara Miller\nPA (truck): Oscar Hernandez\nPA (Sprinter): Marvin Hernandez\nPA (AD): Tristan Conner\nPA (AD): Sydney Baichtal\nPA (set): Gabby Garcia\nPA (Pool): Justin Corrigan\n \nMedic: Shane Hermanson\nCraft Service: Patrick Hotaling\n \nStage Manager: Brian Gordon\nSite Rep: Mike Lancaster\n \nEditor: Steve Reiss / Sunset Edit\nVFX: Sergei Mashevskyi / Cameo FX\nColorist: Beau Leon, Loren White \n \nVideo Commissioner: Jill Kaplan\nMarketing; Hannah Friedland\nDigital Marketing: Drew Schieffelin\nDigital Content: Kailee Heller\nCreative Administration: Luis Cárdenas\nPublicity: Ashley Buenrostro\nA&R: Rani Hancock\n\nLyrics:\nI was a bad girl\nI did some bad things\nI swear I did it all for fun and it meant nothing\nIt never happened \nIt was a secret \nLike when a tree falls in the forest no one hears it \nAnother late night\nAnother crazy mood\nAnd I didn’t think twice what it would do to you\nI was a wild child\nYou always knew it\nIt was a matter of time before I blew it\n \nThou shall not lie \nThou shall not cheat \nThou shall not get caught or you’ll end up just like me \n \nOh karma’s a bitch \nI should have known better \nIf I had a wish I would have never effed around \nWhen I saw the pics of you and her I felt the knife twist \nKarma’s a bitch and she’s with you right now\nKarma’s a bitch\nKarma’s a bitch\nBetter be good cause what goes around comes around\nKarma’s a bitch \nAnd she’s with you right now\n \nShe is a good girl\nI think she’s boring\nBelieve me 20 mins later you’ll be snoring \nBut it still kills me\nThat you hooked up with her\nAnd now the universe is giving me what i deserve\n \nThou shall not lie\nThou shall not cheat \nI’ll write it down a thousand times and hope it sets me free\n \nOh karma’s a bitch \nI should have known better \nIf I had a wish I would have never effed around \nWhen I saw the pics of you and her I felt the knife twist \nKarma’s a bitch and she’s with you right now\nKarma’s a bitch\nKarma’s a bitch\nBetter be good cause what goes around comes around\nKarma’s a bitch \nAnd she’s with you right now\n \nAnd when I lay me down to sleep it’s not your body next to me \nThis lonely room feels so empty just me and my regrets\nAnd cold blue eyes look back at me the mirror has no sympathy \nMy guilt’s become a symphony that won’t let me forget\n \nOh karma’s a bitch \nI should have known better \nIf I had a wish I would have never effed around \nWhen I saw the pics of you and her I felt the knife twist \nKarma’s a bitch and she’s with you right now \n\n#JoJoSiwa #Karma",
  //         },
  //       },
  //       statistics: {
  //         viewCount: "12088528",
  //         likeCount: "123667",
  //         favoriteCount: "0",
  //         commentCount: "97943",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "HlhcgAEPvw1DwDQLgMkzGPufcHo",
  //       id: "asqxzaNGRWo",
  //       snippet: {
  //         publishedAt: "2024-04-06T03:45:43Z",
  //         channelId: "UCiWLfSweyRNmLpgEHekhoAg",
  //         title:
  //           "2024 Final Four: UConn Huskies vs. Iowa Hawkeyes | Full Game Highlights",
  //         description:
  //           "Check out these highlights from the Final Four matchup between No. 3 UConn and No. 1 Iowa. The Hawkeyes win, 71-69. They will play the undefeated South Carolina Gamecocks in the NCAA National Championship on Sunday.\n\n\n\n✔️Subscribe to ESPN+ http://espnplus.com/youtube\n✔️ Get the ESPN App: http://www.espn.com/espn/apps/espn\n✔️Subscribe to ESPN on YouTube: http://es.pn/SUBSCRIBEtoYOUTUBE\n✔️ Subscribe to NBA on ESPN on YouTube: http://bit.ly/SUBSCRIBEtoNBAonESPN\n✔️ Watch ESPN on YouTube TV: http://es.pn/YouTubeTV",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/asqxzaNGRWo/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/asqxzaNGRWo/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/asqxzaNGRWo/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/asqxzaNGRWo/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/asqxzaNGRWo/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "ESPN",
  //         categoryId: "17",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title:
  //             "2024 Final Four: UConn Huskies vs. Iowa Hawkeyes | Full Game Highlights",
  //           description:
  //             "Check out these highlights from the Final Four matchup between No. 3 UConn and No. 1 Iowa. The Hawkeyes win, 71-69. They will play the undefeated South Carolina Gamecocks in the NCAA National Championship on Sunday.\n\n\n\n✔️Subscribe to ESPN+ http://espnplus.com/youtube\n✔️ Get the ESPN App: http://www.espn.com/espn/apps/espn\n✔️Subscribe to ESPN on YouTube: http://es.pn/SUBSCRIBEtoYOUTUBE\n✔️ Subscribe to NBA on ESPN on YouTube: http://bit.ly/SUBSCRIBEtoNBAonESPN\n✔️ Watch ESPN on YouTube TV: http://es.pn/YouTubeTV",
  //         },
  //       },
  //       statistics: {
  //         viewCount: "2123826",
  //         likeCount: "18986",
  //         favoriteCount: "0",
  //         commentCount: "5231",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "aVwR7XI7hsx2wUJMf0T9yBHPSJ8",
  //       id: "ttXi7hokD4w",
  //       snippet: {
  //         publishedAt: "2024-04-06T18:01:19Z",
  //         channelId: "UCJbYdyufHR-cxOuY96KIoqA",
  //         title: "AMP MASTERCHEF JUNIOR",
  //         description:
  //           "AMP GAME NIGHT LIVE ON TWITCH THIS MON, APRIL 8th @ 8PM ET ⚡️\n\nWe've partnered with Uber Eats & Shake Shack to provide some much deserved Fanum Tax Relief in the form of $100,000 in promo codes for discounts on Shake Shack ordered on Uber Eats! Tune in Monday for your chance to redeem.\n\nAMP AMP AMP AMP\n📸 Follow us on Instagram: https://www.instagram.com/ampexclusive\n🦅 Follow us on Twitter: https://twitter.com/ampexclusive\n\n⚡️⚡️AMP⚡️⚡️\n\n⚡️Fanum aka JustFanum\n🎥 https://www.youtube.com/c/FanumReacts/videos\n📸 https://www.instagram.com/elfanum/\n🦅 https://twitter.com/FanumTV\n\n⚡️Duke aka Duke Dennis\n🎥 https://www.youtube.com/c/DeeBlockDukeDennis\n📸 https://www.instagram.com/duke_dennis/\n🦅 https://twitter.com/ImDukeDennis\n\n⚡️Agent aka Agent 00\n🎥 https://www.youtube.com/user/CallMeAgent00\n📸 https://www.instagram.com/callmeagentzero/\n🦅 https://twitter.com/CallMeAgent00\n\n⚡️Davis aka ImDavisss\n🎥  https://www.youtube.com/c/ItsDavisss\n📸 https://www.instagram.com/imdavisssyt/\n🦅 https://twitter.com/imdavisss\n\n⚡️ Kai aka Kai Cenat\n🎥 https://www.youtube.com/c/KaiCenat\n📸 https://www.instagram.com/kai_cenattv/\n🦅 https://twitter.com/KaiCenat\n\n⚡️Chris aka chrisnxtdoor\n🎥 https://www.youtube.com/watch?v=yEREEVk06ZM\n📸 https://www.instagram.com/chrisnxtdoor_/\n🦅 https://twitter.com/chrisnxtdoor_",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/ttXi7hokD4w/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/ttXi7hokD4w/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/ttXi7hokD4w/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/ttXi7hokD4w/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/ttXi7hokD4w/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "AMP",
  //         tags: [
  //           "AMP MASTER CHEF",
  //           "AMP MASTERCHEF JR",
  //           "AMP MASTER CHEF JUNIOR",
  //           "AMP MASTER CHEF JR",
  //           "AMP HELL'S KITCHEN",
  //           "AMP COOKING",
  //           "AMP HELL'S KITCHEN JUNIOR",
  //           "KAI CENAT",
  //           "FANUM",
  //           "DUKE DENNIS",
  //           "AGENT 00",
  //           "IMDAVISSS",
  //           "CHRISNXTDOOR",
  //         ],
  //         categoryId: "24",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "AMP MASTERCHEF JUNIOR",
  //           description:
  //             "AMP GAME NIGHT LIVE ON TWITCH THIS MON, APRIL 8th @ 8PM ET ⚡️\n\nWe've partnered with Uber Eats & Shake Shack to provide some much deserved Fanum Tax Relief in the form of $100,000 in promo codes for discounts on Shake Shack ordered on Uber Eats! Tune in Monday for your chance to redeem.\n\nAMP AMP AMP AMP\n📸 Follow us on Instagram: https://www.instagram.com/ampexclusive\n🦅 Follow us on Twitter: https://twitter.com/ampexclusive\n\n⚡️⚡️AMP⚡️⚡️\n\n⚡️Fanum aka JustFanum\n🎥 https://www.youtube.com/c/FanumReacts/videos\n📸 https://www.instagram.com/elfanum/\n🦅 https://twitter.com/FanumTV\n\n⚡️Duke aka Duke Dennis\n🎥 https://www.youtube.com/c/DeeBlockDukeDennis\n📸 https://www.instagram.com/duke_dennis/\n🦅 https://twitter.com/ImDukeDennis\n\n⚡️Agent aka Agent 00\n🎥 https://www.youtube.com/user/CallMeAgent00\n📸 https://www.instagram.com/callmeagentzero/\n🦅 https://twitter.com/CallMeAgent00\n\n⚡️Davis aka ImDavisss\n🎥  https://www.youtube.com/c/ItsDavisss\n📸 https://www.instagram.com/imdavisssyt/\n🦅 https://twitter.com/imdavisss\n\n⚡️ Kai aka Kai Cenat\n🎥 https://www.youtube.com/c/KaiCenat\n📸 https://www.instagram.com/kai_cenattv/\n🦅 https://twitter.com/KaiCenat\n\n⚡️Chris aka chrisnxtdoor\n🎥 https://www.youtube.com/watch?v=yEREEVk06ZM\n📸 https://www.instagram.com/chrisnxtdoor_/\n🦅 https://twitter.com/chrisnxtdoor_",
  //         },
  //         defaultAudioLanguage: "en",
  //       },
  //       statistics: {
  //         viewCount: "996028",
  //         likeCount: "42912",
  //         favoriteCount: "0",
  //         commentCount: "1915",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "NI80CGGoQBtErEp19lh3kDlU0gA",
  //       id: "BT_83vSP1es",
  //       snippet: {
  //         publishedAt: "2024-04-05T17:00:06Z",
  //         channelId: "UC9bZ9eWvF0eXVqrxK9ve7Nw",
  //         title:
  //           "GloRilla – Wanna Be feat. Megan Thee Stallion (Official Music Video)",
  //         description:
  //           "Stream 'Ehhthang Ehhthang' out everywhere: https://glorilla.lnk.to/EhhthangEhhthang\n\nFollow #GloRilla:\nInstagram: https://www.instagram.com/glorillapimp/\nTwitter: https://twitter.com/GloTheofficial\nTikTok: https://www.tiktok.com/@glorilla03\nFacebook: https://www.facebook.com/gloyaltygirl\nMerch: https://shop.glorillaofficial.com/\nKeep up with GloRilla on #GloRidaz:\nInstagram: https://www.instagram.com/gloridazofficial/\nTwitter: https://twitter.com/RealGloridaz\nTikTok: https://www.tiktok.com/@gloridazofficial\n\n#Glorilla #EhhthangEhhthang #CMGTheLabel #MeganTheeStallion #WannaBe",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/BT_83vSP1es/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/BT_83vSP1es/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/BT_83vSP1es/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/BT_83vSP1es/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/BT_83vSP1es/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "theofficialGloRilla",
  //         tags: ["#PTE", "#GloRilla"],
  //         categoryId: "10",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title:
  //             "GloRilla – Wanna Be feat. Megan Thee Stallion (Official Music Video)",
  //           description:
  //             "Stream 'Ehhthang Ehhthang' out everywhere: https://glorilla.lnk.to/EhhthangEhhthang\n\nFollow #GloRilla:\nInstagram: https://www.instagram.com/glorillapimp/\nTwitter: https://twitter.com/GloTheofficial\nTikTok: https://www.tiktok.com/@glorilla03\nFacebook: https://www.facebook.com/gloyaltygirl\nMerch: https://shop.glorillaofficial.com/\nKeep up with GloRilla on #GloRidaz:\nInstagram: https://www.instagram.com/gloridazofficial/\nTwitter: https://twitter.com/RealGloridaz\nTikTok: https://www.tiktok.com/@gloridazofficial\n\n#Glorilla #EhhthangEhhthang #CMGTheLabel #MeganTheeStallion #WannaBe",
  //         },
  //       },
  //       statistics: {
  //         viewCount: "2332576",
  //         likeCount: "154920",
  //         favoriteCount: "0",
  //         commentCount: "7953",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "x5vBl8qh1NRjh7jnMrNi7vB8jlE",
  //       id: "gO160cr8LyU",
  //       snippet: {
  //         publishedAt: "2024-04-06T14:23:25Z",
  //         channelId: "UC5Hi0UkephOloKgZKLM9e-w",
  //         title: "I Bought 100 Mini Products that ACTUALLY Work!",
  //         description:
  //           "I Bought 100 Mini Products that ACTUALLY Work! | Anazala Family\n\nToday my Daughter Mila opens 100 mini products from amazon that actually work! From the World's smallest iPhone to mini luxury bags! And the last box is the most expensive!\n\nVideo Inspired By:\n- Jordan Matter: My Daughter Tries 100 Weird Amazon Products ft/ Brent Rivera\nhttps://www.youtube.com/watch?v=3VGhDJiQRkA\n\n- Hope Scope: I Bought MINI PRODUCTS that Actually Work\nhttps://www.youtube.com/watch?v=5ySYGZztn4w&t=99s\n_____\nCheck out our Recent Videos!!\n\n- KIDS TURN 21 YEARS OLD FOR 100 HOURS! (bad idea)\nhttps://www.youtube.com/watch?v=0_s2_-o27zU&t=141s\n\n- I Built a CANDY STORE in my Room and Hid it from my MOM!\nhttps://www.youtube.com/watch?v=bCnLX51_5vU\n\n-I Threw a Sleepover and Hid It From My MOM!\nhttps://www.youtube.com/watch?v=AJOJ4OvOrpk&t=4s\n_____\nPast YouTuber Collabs:\n\nJordan Matter: Dads VS Daughters! Who is Stronger? Mila & Salish Team up! ft/ Jordan Matter \nhttps://www.youtube.com/watch?v=JHTPmt7qJo4&t=10s\n\nRoyalty Family: We ADOPTED a GIRL!!! (So Exciting)\nhttps://www.youtube.com/watch?v=5Ap0P5_kLsE&t=0s\n\nOur Ben Azelart Collab: We Built a SECRET ROOM To Hide From My Dad\nhttps://www.youtube.com/watch?v=bCnLX51_5vU\n \nRebecca Zamolo: I Built a Secret Room to Hide From My Mom!\nhttps://www.youtube.com/watch?v=vD3ce_VQLsk&t=1050s\n______\nFollow Us on Instagram!! \nAsala's IG : https://www.instagram.com/asala/\nMila's IG : https://www.instagram.com/milamarwah/\nNoah's IG: https://www.instagram.com/noahmarwah/  \nAnas's IG: https://www.instagram.com/anas/\n\nThanks to the Team: Moktar Larbi, Liam Dipple, Hisham Shahwan, John Abbot, Ronan Walters, David Gudani، Patrick Chaplin, Yehia Elkarim, Eric Rey, Joel Osborn, and Amjad Khattab for all your love and hardwork!\n\nJOIN OUR JOURNEY... and subscribe: https://www.youtube.com/channel/UC5Hi... \n \n*BUSINESS INQUIRIES : info@anazalafamily.com\n\nMB017A6F10VF0KJ",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/gO160cr8LyU/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/gO160cr8LyU/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/gO160cr8LyU/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/gO160cr8LyU/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/gO160cr8LyU/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "Anazala Family ",
  //         tags: [
  //           "Anazala Family",
  //           "Anazala",
  //           "I bought Mini items that actually work",
  //           "Amazon",
  //           "banned amazon products",
  //           "banned items on amazon",
  //           "weirdest amazon products",
  //           "I bought 100 banned amazon products",
  //           "amazon",
  //           "Jordan Matter",
  //           "Salish Matter",
  //           "salish",
  //           "jordan",
  //           "daughter",
  //           "my daughter",
  //           "family",
  //           "Brent Rivera",
  //           "lexi rivera",
  //           "Challenge",
  //           "the anazala family",
  //           "royalty family",
  //           "Ace Family",
  //           "mila",
  //           "asala",
  //           "I Bought the WORLD'S SMALLEST Items that ACTUALLY Work!",
  //           "world's smallest products that actually work",
  //         ],
  //         categoryId: "24",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "I Bought 100 Mini Products that ACTUALLY Work!",
  //           description:
  //             "I Bought 100 Mini Products that ACTUALLY Work! | Anazala Family\n\nToday my Daughter Mila opens 100 mini products from amazon that actually work! From the World's smallest iPhone to mini luxury bags! And the last box is the most expensive!\n\nVideo Inspired By:\n- Jordan Matter: My Daughter Tries 100 Weird Amazon Products ft/ Brent Rivera\nhttps://www.youtube.com/watch?v=3VGhDJiQRkA\n\n- Hope Scope: I Bought MINI PRODUCTS that Actually Work\nhttps://www.youtube.com/watch?v=5ySYGZztn4w&t=99s\n_____\nCheck out our Recent Videos!!\n\n- KIDS TURN 21 YEARS OLD FOR 100 HOURS! (bad idea)\nhttps://www.youtube.com/watch?v=0_s2_-o27zU&t=141s\n\n- I Built a CANDY STORE in my Room and Hid it from my MOM!\nhttps://www.youtube.com/watch?v=bCnLX51_5vU\n\n-I Threw a Sleepover and Hid It From My MOM!\nhttps://www.youtube.com/watch?v=AJOJ4OvOrpk&t=4s\n_____\nPast YouTuber Collabs:\n\nJordan Matter: Dads VS Daughters! Who is Stronger? Mila & Salish Team up! ft/ Jordan Matter \nhttps://www.youtube.com/watch?v=JHTPmt7qJo4&t=10s\n\nRoyalty Family: We ADOPTED a GIRL!!! (So Exciting)\nhttps://www.youtube.com/watch?v=5Ap0P5_kLsE&t=0s\n\nOur Ben Azelart Collab: We Built a SECRET ROOM To Hide From My Dad\nhttps://www.youtube.com/watch?v=bCnLX51_5vU\n \nRebecca Zamolo: I Built a Secret Room to Hide From My Mom!\nhttps://www.youtube.com/watch?v=vD3ce_VQLsk&t=1050s\n______\nFollow Us on Instagram!! \nAsala's IG : https://www.instagram.com/asala/\nMila's IG : https://www.instagram.com/milamarwah/\nNoah's IG: https://www.instagram.com/noahmarwah/  \nAnas's IG: https://www.instagram.com/anas/\n\nThanks to the Team: Moktar Larbi, Liam Dipple, Hisham Shahwan, John Abbot, Ronan Walters, David Gudani، Patrick Chaplin, Yehia Elkarim, Eric Rey, Joel Osborn, and Amjad Khattab for all your love and hardwork!\n\nJOIN OUR JOURNEY... and subscribe: https://www.youtube.com/channel/UC5Hi... \n \n*BUSINESS INQUIRIES : info@anazalafamily.com\n\nMB017A6F10VF0KJ",
  //         },
  //         defaultAudioLanguage: "en",
  //       },
  //       statistics: {
  //         viewCount: "1816332",
  //         likeCount: "31576",
  //         favoriteCount: "0",
  //         commentCount: "8046",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "THZJ9XtPH_pDsZvgzJpF3IPbQ2Y",
  //       id: "o6a3PmY244M",
  //       snippet: {
  //         publishedAt: "2024-04-06T17:00:25Z",
  //         channelId: "UCoo-9GEm2mpyYIXSptrKIpA",
  //         title: "Rich People Keep Trying To Build Cities",
  //         description:
  //           "Thanks to Sundays for sponsoring this video! Get 50% off your first order of Sundays: https://www.sundaysfordogs.com/GREG or use code GREG at checkout.\nedited by @jakeshotfriend",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/o6a3PmY244M/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/o6a3PmY244M/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/o6a3PmY244M/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/o6a3PmY244M/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/o6a3PmY244M/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "2 Danny 2 Furious",
  //         tags: [
  //           "danny gonzalez",
  //           "dannygonzalez",
  //           "funny",
  //           "skit",
  //           "vine comedy",
  //           "vines",
  //         ],
  //         categoryId: "22",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "Rich People Keep Trying To Build Cities",
  //           description:
  //             "Thanks to Sundays for sponsoring this video! Get 50% off your first order of Sundays: https://www.sundaysfordogs.com/GREG or use code GREG at checkout.\nedited by @jakeshotfriend",
  //         },
  //         defaultAudioLanguage: "en-US",
  //       },
  //       statistics: {
  //         viewCount: "891102",
  //         likeCount: "60695",
  //         favoriteCount: "0",
  //         commentCount: "2724",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "u-Idj0XfsCwrv5B7OscIpctARtE",
  //       id: "5KRMLBh3-N4",
  //       snippet: {
  //         publishedAt: "2024-04-05T04:20:53Z",
  //         channelId: "UCnc6db-y3IU7CkT_yeVXdVg",
  //         title: "J. Cole - 7 Minute Drill (Official Audio)",
  //         description:
  //           "J. Cole - Might Delete Later is out now\nhttps://JCole.lnk.to/MightDeleteLater\n\nConnect with J. Cole:\nhttps://www.instagram.com/realcoleworld/\nhttps://twitter.com/jcolenc\nhttps://www.facebook.com/JColeMusic/\n\nConnect with Dreamville:\nhttp://dreamville.com/\nhttps://www.instagram.com/dreamville\nhttps://twitter.com/Dreamville\nhttps://www.facebook.com/dreamville\n\n#JCole #MightDeleteLater #Dreamville",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/5KRMLBh3-N4/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/5KRMLBh3-N4/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/5KRMLBh3-N4/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/5KRMLBh3-N4/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/5KRMLBh3-N4/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "J. Cole",
  //         categoryId: "10",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "J. Cole - 7 Minute Drill (Official Audio)",
  //           description:
  //             "J. Cole - Might Delete Later is out now\nhttps://JCole.lnk.to/MightDeleteLater\n\nConnect with J. Cole:\nhttps://www.instagram.com/realcoleworld/\nhttps://twitter.com/jcolenc\nhttps://www.facebook.com/JColeMusic/\n\nConnect with Dreamville:\nhttp://dreamville.com/\nhttps://www.instagram.com/dreamville\nhttps://twitter.com/Dreamville\nhttps://www.facebook.com/dreamville\n\n#JCole #MightDeleteLater #Dreamville",
  //         },
  //       },
  //       statistics: {
  //         viewCount: "4410615",
  //         likeCount: "245853",
  //         favoriteCount: "0",
  //         commentCount: "41383",
  //       },
  //     },
  //     {
  //       kind: "youtube#video",
  //       etag: "indGCiBl8Scl9-sbVro2nDiG160",
  //       id: "Fz2J8GUQlNQ",
  //       snippet: {
  //         publishedAt: "2024-04-05T16:59:46Z",
  //         channelId: "UCWzLmNWhgeh3h1j-M-Isy0g",
  //         title: "when the $10 youtube poop outsells call of duty",
  //         description:
  //           "MERCH HERE (10% off with code BADGER): https://gamersupps.gg/collections/badger?ref=badger\n\nFOLLOW ME HERE ▼\n\nemployee models + my model made by dotflare: https://twitter.com/dotflare3\n\ngm_lethal_company map made by Stub@: https://steamcommunity.com/sharedfiles/filedetails/?id=3130493972\n\nVOD Archive of streams that made this video: https://www.youtube.com/watch?v=Kk_YDWy3qRo&list=PLurOwzBxq5G7Fw_2lPreiou_bp75x6oj_\n\n➧ Twitter: https://twitter.com/DARUSSIANBADGER\n➧ Twitch: https://www.twitch.tv/therussianbadger\n➧ Discord: https://discord.gg/badger\n\n(Affiliate code)\n➧10% off gamer supps with code BADGER: https://gamersupps.gg/badger\n➧WHY GAMER SUPPS?: https://www.youtube.com/watch?v=hKIGSu1WkQw\n\nBUDDIES YOU HEARD IN THIS VIDEO ▼\n\nbing (flesh): https://www.youtube.com/bangbowbing\nbadda (burgundy): https://www.twitch.tv/baddajeff\ngrouse (yellow): https://www.twitch.tv/the_grouse\ndigi (turquoise): https://www.twitch.tv/digitalvagrant\nherboku (grey): https://www.twitch.tv/herbokuu\nmickey (purple): https://www.twitch.tv/mickeymt\ngeuce (green): https://www.twitch.tv/biggeuce/\njosif aka loaf (light orange): n/a\nbees (teal): https://www.twitch.tv/yaboipasta\nzyzx_ aka gary (red): https://www.twitch.tv/zyzx_\npasta (blue): https://www.twitch.tv/yaboipasta\nquesadilla (magenta): https://www.twitch.tv/notquesadilla\nvalhalyall (blue purple): https://www.twitch.tv/valhalyall\nstretchy (navy): https://www.twitch.tv/feelthestretch\ncalvin (lime green + dark green): https://www.twitch.tv/calvinorion\nheavenly (pink): https://www.twitch.tv/heavenlyfather\neekaj (orange): https://www.twitch.tv/eekajj\nskullker (bright purple): https://www.twitch.tv/skullker21\nbooger (brown): https://www.twitch.tv/boogerhookmcgee\nmartin (dark blue): https://www.twitch.tv/martincopping\nsigrid (sand color): https://www.twitch.tv/sigridandbird\nLUwUcy (army green): https://www.youtube.com/channel/UCYSyF7OfGSaUB8wfWid0SxA\nPaperboxhouse (army green): https://www.youtube.com/channel/UCATE5j7jv3K1YyeSRYp38ig\nIHeartJustice (army green): https://www.youtube.com/channel/UC1HYC09qjVy-F3Kibq_ZSnQ",
  //         thumbnails: {
  //           default: {
  //             url: "https://i.ytimg.com/vi/Fz2J8GUQlNQ/default.jpg",
  //             width: 120,
  //             height: 90,
  //           },
  //           medium: {
  //             url: "https://i.ytimg.com/vi/Fz2J8GUQlNQ/mqdefault.jpg",
  //             width: 320,
  //             height: 180,
  //           },
  //           high: {
  //             url: "https://i.ytimg.com/vi/Fz2J8GUQlNQ/hqdefault.jpg",
  //             width: 480,
  //             height: 360,
  //           },
  //           standard: {
  //             url: "https://i.ytimg.com/vi/Fz2J8GUQlNQ/sddefault.jpg",
  //             width: 640,
  //             height: 480,
  //           },
  //           maxres: {
  //             url: "https://i.ytimg.com/vi/Fz2J8GUQlNQ/maxresdefault.jpg",
  //             width: 1280,
  //             height: 720,
  //           },
  //         },
  //         channelTitle: "TheRussianBadger",
  //         categoryId: "20",
  //         liveBroadcastContent: "none",
  //         localized: {
  //           title: "when the $10 youtube poop outsells call of duty",
  //           description:
  //             "MERCH HERE (10% off with code BADGER): https://gamersupps.gg/collections/badger?ref=badger\n\nFOLLOW ME HERE ▼\n\nemployee models + my model made by dotflare: https://twitter.com/dotflare3\n\ngm_lethal_company map made by Stub@: https://steamcommunity.com/sharedfiles/filedetails/?id=3130493972\n\nVOD Archive of streams that made this video: https://www.youtube.com/watch?v=Kk_YDWy3qRo&list=PLurOwzBxq5G7Fw_2lPreiou_bp75x6oj_\n\n➧ Twitter: https://twitter.com/DARUSSIANBADGER\n➧ Twitch: https://www.twitch.tv/therussianbadger\n➧ Discord: https://discord.gg/badger\n\n(Affiliate code)\n➧10% off gamer supps with code BADGER: https://gamersupps.gg/badger\n➧WHY GAMER SUPPS?: https://www.youtube.com/watch?v=hKIGSu1WkQw\n\nBUDDIES YOU HEARD IN THIS VIDEO ▼\n\nbing (flesh): https://www.youtube.com/bangbowbing\nbadda (burgundy): https://www.twitch.tv/baddajeff\ngrouse (yellow): https://www.twitch.tv/the_grouse\ndigi (turquoise): https://www.twitch.tv/digitalvagrant\nherboku (grey): https://www.twitch.tv/herbokuu\nmickey (purple): https://www.twitch.tv/mickeymt\ngeuce (green): https://www.twitch.tv/biggeuce/\njosif aka loaf (light orange): n/a\nbees (teal): https://www.twitch.tv/yaboipasta\nzyzx_ aka gary (red): https://www.twitch.tv/zyzx_\npasta (blue): https://www.twitch.tv/yaboipasta\nquesadilla (magenta): https://www.twitch.tv/notquesadilla\nvalhalyall (blue purple): https://www.twitch.tv/valhalyall\nstretchy (navy): https://www.twitch.tv/feelthestretch\ncalvin (lime green + dark green): https://www.twitch.tv/calvinorion\nheavenly (pink): https://www.twitch.tv/heavenlyfather\neekaj (orange): https://www.twitch.tv/eekajj\nskullker (bright purple): https://www.twitch.tv/skullker21\nbooger (brown): https://www.twitch.tv/boogerhookmcgee\nmartin (dark blue): https://www.twitch.tv/martincopping\nsigrid (sand color): https://www.twitch.tv/sigridandbird\nLUwUcy (army green): https://www.youtube.com/channel/UCYSyF7OfGSaUB8wfWid0SxA\nPaperboxhouse (army green): https://www.youtube.com/channel/UCATE5j7jv3K1YyeSRYp38ig\nIHeartJustice (army green): https://www.youtube.com/channel/UC1HYC09qjVy-F3Kibq_ZSnQ",
  //         },
  //         defaultAudioLanguage: "en",
  //       },
  //       statistics: {
  //         viewCount: "2123324",
  //         likeCount: "181567",
  //         favoriteCount: "0",
  //         commentCount: "6809",
  //       },
  //     },
  //   ],
  //   nextPageToken: "CAoQAA",
  //   pageInfo: {
  //     totalResults: 200,
  //     resultsPerPage: 10,
  //   },
  // };

  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>Error</h1>
      ) : (
        <VideoGalleryGrid videos={videos.items} />
      )}
    </div>
  );
};

export default HomePage;
