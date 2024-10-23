// Add universal link redirects to this file and run the tests to verify the redirects work as expected.
export const universalLinksStudent = [
  {
    link: "www.classdojo.com/ul/s/home",
    redirect: "https://student.classdojo.com/#/story",
  },
  {
    link: "www.classdojo.com/ul/s/report",
    redirect: "https://student.classdojo.com",
  },
  {
    link: "www.classdojo.com/ul/s/home?s=#{studentId}&t=#{tokenId}",
    redirect: "https://student.classdojo.com/#/directLogin?token=#{tokenId}&studentId=#{studentId}",
  },
];
