// Add universal link redirects to this file and run the tests to verify the redirects work as expected.
export const universalLinksTeach = [
  {
    link: "www.classdojo.com/ul/t/school?target=story&postID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/schools/story/#{remoteID}?attribution=unknown&target=story",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=story&schoolID=#{schoolID}",
    redirect: "https://teach.classdojo.com/#/schools/#{schoolID}/story?attribution=unknown&target=story",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=story",
    redirect: "https://teach.classdojo.com/#/schools/story?attribution=unknown&target=story",
  },
  {
    link: "www.classdojo.com/ul/t/school",
    redirect: "https://teach.classdojo.com/#/?attribution=unknown",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=directory",
    redirect: "https://teach.classdojo.com/#/schools/directory?attribution=unknown&target=directory",
    //Optionally: &schoolId=#{schoolID}&teacherId=#{teacherId} for School directory approval
  },
  {
    link: "www.classdojo.com/ul/t/school?target=directoryStudents",
    redirect: "https://teach.classdojo.com/#/schools/studentDirectory?attribution=unknown&target=directoryStudents",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=inviteTeacher",
    redirect:
      "https://teach.classdojo.com/#/schools/directory?modal=inviteTeachers&attribution=unknown&target=inviteTeacher",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=messages&conversationID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/schools/messaging/#{remoteID}?attribution=unknown&target=messages",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=invite&inviteId=#{inviteId}", // Optionally: &suggestionId=#{suggestionId}&role=#{role}",
    redirect: "https://teach.classdojo.com/#/?attribution=unknown&target=invite",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=join&schoolId=#{schoolId}", //Optionally: &suggestionId=#{suggestionId}&role=#{role}"",
    redirect: "https://teach.classdojo.com/#/?attribution=unknown&target=join",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=redeem&inviteCode=#{inviteCode}", // Optionally: &suggestionId=#{suggestionId}&role=#{role}"",
    redirect: "https://teach.classdojo.com/#/singleLinkSignup/undefined?attribution=unknown&target=redeem",
  },
  {
    link: "www.classdojo.com/ul/t/school?target=settings",
    redirect: "https://teach.classdojo.com/#/schools/story?schoolSettings=true&attribution=unknown&target=settings",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=story&postID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/story/#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=story",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/story",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=portfolio&portfolioID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/portfolio",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=pendingParents",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points?connectParents=true",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=connections",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points?connectParents=true",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=pendingStory",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=toolkit",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=messages&conversationID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/messaging/#{remoteID}",
  },
  {
    link: "www.classdojo.com/ul/t/class?target=notifications",
    redirect: "https://teach.classdojo.com/#/",
  },
  {
    link: "www.classdojo.com/ul/t/class?target=settings",
    redirect: "https://teach.classdojo.com/#/",
  },
  {
    link: "www.classdojo.com/ul/t/class?target=parentConnectionRequests&classId=#{remoteID}&pcrId=#{pcrId}",
    redirect: "https://teach.classdojo.com/#/",
  },
  {
    link: "www.classdojo.com/ul/t/class?target=addStudentsToDirectory&classID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points?modal=addStudentsToDirectory",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=dojoIslandsTab",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/dojoIslands",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=studentLogins",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points?openModal=EditClassStudentLoginsModal",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=classSettings",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points?settings=true",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=classTeachers",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points?connectTeachers=true",
  },
  {
    link: "www.classdojo.com/ul/t/class?classID=#{remoteID}&target=classStudents",
    redirect: "https://teach.classdojo.com/#/classes/#{remoteID}/points?connectStudents=true",
  },
  {
    link: "www.classdojo.com/ul/t/home?target=verifyEmail&userID=#{remoteID}&email=#{email}&hash=#{hash}",
    redirect:
      "https://lite.classdojo.com/emailVerification/?userId=#{remoteID}&email=#{email}&hash=#{hash}&target=teach",
  },
  {
    link: "www.classdojo.com/ul/t/home?target=addClass",
    redirect: "https://teach.classdojo.com/#/launchpad?createClass=true",
  },
  {
    link: "www.classdojo.com/ul/t/home",
    redirect: "https://teach.classdojo.com/#/?",
  },
  {
    link: "www.classdojo.com/ul/t/settings",
    redirect: "https://teach.classdojo.com/#/launchpad?settingsTab=profile",
  },
  {
    link: "www.classdojo.com/ul/t/settings?target=security",
    redirect: "https://teach.classdojo.com/#/launchpad?settingsTab=security",
  },
  {
    link: "www.classdojo.com/ul/t/settings?target=notifications",
    redirect: "https://teach.classdojo.com/#/launchpad?settingsTab=messaging",
  },
  {
    link: "www.classdojo.com/ul/t/home/?target=parentConnectionRequests&pcrId=#{pcrId}",
    redirect: "https://teach.classdojo.com/#/?",
  },
  {
    link: "www.classdojo.com/ul/t/class?target=messages&conversationID=group-chat-launch",
    redirect: "https://teach.classdojo.com/#/messaging/group-chat-launch",
  },
  {
    link: "www.classdojo.com/ul/t/schoolwide",
    redirect: "https://teach.classdojo.com/#/classdojoSchoolSignup",
  },
  {
    link: "www.classdojo.com/ul/t/home?target=dojoIslands&classID=#{remoteID}",
    redirect: "https://teach.classdojo.com/#/launchpad?dojoIslandsTab=true&classID=#{remoteID}",
  },
];
