interface IReport {
  imgReport: string;
  contentReport: string;
  nameAuthor: string;
  avatarAuthor: string;
}

const userReport: IReport[] = [
  {
    imgReport: "/assets/images/report-1.webp",
    contentReport:
      "I'm totally blown away. Ingrown hair and the skin irritation was the bane of my life for many years. Bleame has changed the way my skin looks forever!",
    nameAuthor: "Sarah F.",
    avatarAuthor: "/assets/images/author_1.webp",
  },
  {
    imgReport: "/assets/images/report-2.webp",
    contentReport:
      "I have struggled with strawberry leg for years and waxing just wasn't cutting it, Bleame has really made a huge difference in my life and has given me so much confidence!",
    nameAuthor: "Mariah B.",
    avatarAuthor: "/assets/images/author_2.webp",
  },
  {
    imgReport: "/assets/images/report-3.webp",
    contentReport:
      "It works great. I've used on my husband's body hair and surprisingly it cleans them up lol. Thank you for inventing this. Super exciting.",
    nameAuthor: "Susan T.",
    avatarAuthor: "/assets/images/author_3.webp",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const listReport: HTMLDivElement | null =
    document.querySelector(".list_user_report");

  if (!listReport) return;

  userReport.forEach((itReport) => {
    const divItemReport: HTMLDivElement = document.createElement("div");
    divItemReport.classList.add("user_report_item");
    divItemReport.innerHTML = `<div class="img_product_report">
                  <img
                    loading="lazy"
                    src="${itReport.imgReport}"
                    alt=""
                  />
                </div>
                <div class="text_report">
                  <p>
                    ${itReport.contentReport}
                  </p>
                </div>
                <div class="author_report">
                  <img loading="lazy" src="${itReport.avatarAuthor}" alt="" />
                  <h1>${itReport.nameAuthor}</h1>
                  <div class="verified-user">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.80167 11.5784L12.1317 6.24844L11.5417 5.65844L6.80167 10.3984L4.42667 8.02344L3.83667 8.61344L6.80167 11.5784ZM8.0025 15.8218C6.96583 15.8218 5.99083 15.6251 5.0775 15.2318C4.16472 14.8379 3.37056 14.3034 2.695 13.6284C2.01944 12.954 1.48472 12.1607 1.09083 11.2484C0.696945 10.3362 0.5 9.3615 0.5 8.32428C0.5 7.28761 0.696667 6.31261 1.09 5.39928C1.48389 4.4865 2.01833 3.69233 2.69333 3.01678C3.36778 2.34122 4.16111 1.8065 5.07333 1.41261C5.98556 1.01872 6.96028 0.821777 7.9975 0.821777C9.03417 0.821777 10.0092 1.01844 10.9225 1.41178C11.8353 1.80567 12.6294 2.34011 13.305 3.01511C13.9806 3.68955 14.5153 4.48289 14.9092 5.39511C15.3031 6.30733 15.5 7.28205 15.5 8.31928C15.5 9.35594 15.3033 10.3309 14.91 11.2443C14.5161 12.1571 13.9817 12.9512 13.3067 13.6268C12.6322 14.3023 11.8389 14.8371 10.9267 15.2309C10.0144 15.6248 9.03972 15.8218 8.0025 15.8218Z"
                        fill="#7069BC"
                      ></path>
                    </svg>
                    <span>Verified Buyer</span>
                  </div>
                </div>`;

    listReport.appendChild(divItemReport);
  });
});
