export function scrapeJobPosting(url: string) {
  // https://jobs.lever.co/StubHub/8e3fe08f-0aad-42dc-a2a2-df53b02cf007
  const iframe = document.createElement("iframe");
  iframe.onload = () => {
    console.log("loaded");
  };
  //   document.appendChild(iframe);
}
