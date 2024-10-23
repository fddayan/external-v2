// Add universal link redirects to this file and run the tests to verify the redirects work as expected.
export const universalLinksHome = [
  { link: "https://www.classdojo.com/ul/p/messages", redirect: "https://home.classdojo.com/#/messages/" },
  { link: "www.classdojo.com/ul/p/story", redirect: "https://home.classdojo.com/#/story" },
  {
    link: "www.classdojo.com/ul/p/story?classID=#{remoteID}&postID=#{remoteID}",
    redirect: "https://home.classdojo.com/#/story/#{remoteID}/class/#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/p/story?schoolID=#{remoteID}&postID=#{remoteID}",
    redirect: "https://home.classdojo.com/#/story/#{remoteID}/school/#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/p/memories", // Not an app redirect
    redirect: "https://www.classdojo.com/memories/",
  },
  {
    link: "www.classdojo.com/ul/p/report", // Not an app redirect
    redirect: "https://home.classdojo.com/#/story",
  },
  {
    link: "www.classdojo.com/ul/p/report?studentID=#{remoteID}", // Doesn't do anything on web
    redirect: "https://home.classdojo.com/#/reports/#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/p/addKid?target=school",
    redirect: "https://home.classdojo.com/#/teacher-search",
  },
  {
    link: "www.classdojo.com/ul/p/addKid?target=code&code=#{parentCode}",
    redirect: "https://home.classdojo.com/#/signup?invite=#{parentCode}",
  },
  {
    link: "www.classdojo.com/ul/p/addKid?target=code&code=PGBDSF8QF&utm_campaign=blueshiftCampaign",
    redirect:
      "https://home.classdojo.com/#/signup?invite=PGBDSF8QF&attribution=unknown&target=code&utm_campaign=blueshiftCampaign",
  },
  {
    link: "www.classdojo.com/ul/p/addKid?target=code&code=PGBDSF8QF&randomBadParam=hackhack",
    redirect: "https://home.classdojo.com/#/signup?invite=PGBDSF8QF",
  },
  {
    link: "www.classdojo.com/ul/p/addKid?target=class&class=#{classCode}",
    redirect: "https://home.classdojo.com/#/classInvite/?c=#{classID}",
  },
  {
    link: "www.classdojo.com/ul/p/addKid?target=school&schoolID=#{remoteID}",
    redirect: "https://home.classdojo.com/#/classInvite/?s=#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/p/messages?conversationID=#{remoteID}",
    redirect: "https://home.classdojo.com/#/messages/#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/p/plus?toolID=#{toolID}", // Not an app redirect
    redirect: "https://www.classdojo.com/toolkit/",
  },
  {
    link: "www.classdojo.com/ul/p/salesPage?entrypoint=premiumMessagingPresale",
    redirect: "https://home.classdojo.com/#/messages?openModal=premiumMessagingPresale",
  },
  {
    link: "www.classdojo.com/ul/p/salesPage?entrypoint=biannual",
    redirect: "https://home.classdojo.com/#/subscription/biannual-promo",
  },
  {
    link: "www.classdojo.com/ul/p/salesPage", // Not an app redirect
    redirect: "https://www.classdojo.com/plus/",
  },
  {
    link: "www.classdojo.com/ul/p/points", // Not an app redirect
    redirect: "https://www.classdojo.com/homePoints/",
  },
  {
    link: "www.classdojo.com/ul/p/points?studentID=#{remoteID}", // Not an app redirect
    redirect: "https://www.classdojo.com/homePoints/",
  },
  {
    link: "www.classdojo.com/ul/p/points?target=rewards", // Not an app redirect
    redirect: "https://www.classdojo.com/homePoints/",
  },
  {
    link: "www.classdojo.com/ul/p/points?target=rewards&studentID=#{remoteID}", // Not an app redirect
    redirect: "https://www.classdojo.com/homePoints/",
  },
  {
    link: "www.classdojo.com/ul/p/kids",
    redirect: "https://home.classdojo.com/#/student-selector",
  },
  {
    link: "www.classdojo.com/ul/p/kids?target=loginKid&studentID=#{remoteID}",
    redirect: "https://home.classdojo.com/#/student-selector?loginKid=true&studentID=#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/p/reachability",
    redirect: "https://home.classdojo.com/#/story/?accountSettings=true",
  },
  {
    link: "www.classdojo.com/ul/p/reachability?utm_campaign=blueshiftCampaign",
    redirect: "https://home.classdojo.com/#/story/?accountSettings=true&utm_campaign=blueshiftCampaign",
  },
  {
    link: "www.classdojo.com/ul/p/tutor", // Not an app redirect
    redirect: "https://tutor.classdojo.com/#/",
  },
  // {
  //   link: "www.classdojo.com/ul/p/notifications", // mobile only
  //   redirect: "??",
  // },
  // {
  //   link: "www.classdojo.com/ul/p/story?postID=#{remoteID}", // mobile only
  //   redirect: "??",
  // },
  // {
  //   link:  "www.classdojo.com/ul/p/academicYearRecap?studentID=#{remoteID}", // mobile only
  //   redirect: "??",
  // },
  {
    link: "www.classdojo.com/ul/p/#{parentCode}",
    redirect: "https://home.classdojo.com/#/signup?invite=#{parentCode}",
  },
  {
    link: "www.classdojo.com/ul/home",
    redirect: "https://www.classdojo.com/",
  },
  {
    link: "www.classdojo.com/ul/alert?title=titleString&body=bodyString", // only goes to external
    redirect: "https://www.classdojo.com/",
  },
  {
    link: "www.classdojo.com/ul/p/photobook?classID=#{classID}&photobookID=#{photobookID}&target=order",
    redirect: "https://home.classdojo.com/#/photobook/#{classID}/finish/#{photobookID}",
  },
  {
    link: "www.classdojo.com/ul/p/photobook?classID=#{classID}",
    redirect: "https://home.classdojo.com/#/photobook/#{classID}/start",
  },
  {
    link: "www.classdojo.com/ul/p/homeConsent?parentID=#{parentID}",
    redirect: "https://home.classdojo.com/#/home-consent?parentID=#{parentID}",
  },
  {
    link: "www.classdojo.com/ul/p/homeConsent?parentID=#{parentID}&source=#{source_name}",
    redirect: "https://home.classdojo.com/#/home-consent?parentID=#{parentID}&source=#{source_name}",
  },
  {
    link: "www.classdojo.com/ul/p/class-photobook?classID=#{classID}",
    redirect: "https://home.classdojo.com/#/class-photobook/#{classID}",
  },
  {
    link: "www.classdojo.com/ul/p/class-photobook",
    redirect: "https://home.classdojo.com/#/story",
  },
  {
    link: "www.classdojo.com/ul/p/photobook?expect-free=#{expect-free}",
    redirect: "https://home.classdojo.com/#/photobook-default?expect-free=#{expect-free}",
  },
];
