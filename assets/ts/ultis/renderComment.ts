interface IComment {
  nameAuthor: string;
  age: string;
  titleComment: string;
  descriptionComment: string;
  imgComment: string;
}

const comments: IComment[] = [
  {
    nameAuthor: "Joanne G.",
    titleComment: "Razor Free!",
    descriptionComment:
      "This little device is incredible! I thought I'd give it a go and that it was probably a gimmick. It's not! It's awesome! So good, that my 18 and 20 yo daughters have 'borrowed' it, and I have to find it whenever I need it! It actually works and I have sent the link to my sisters and girlfriends! Love it. No mess and it exfoliates as well. Love it! 10 stars! Great Christmas presses too 🥰",
    imgComment:
      "https://cdn.stamped.io/tr:h-180:/uploads/photos/242718_7105770193071_b94aecbc_5cdd_47e0_98c4_5f4f6e0199fb.jpg?",
    age: "45-54",
  },
  {
    nameAuthor: "Danielle S.",
    titleComment: "My experience",
    descriptionComment:
      "I really liked the fact that I didn’t have to use a razor for sure. My skin is too sensitive for a razor so this was a nice change. But.. I think I’m in the trial and error stage haha I can say that my legs were incredibly soft and hairless after use BUT in some spots I most definitely over used it. Kinda burny like rug burn haha so NOTED I think my next time using it, I won’t have that issue. My leg hair is very light and when I had my second son, almost 5 yrs ago,.. that’s the last time I shaved my legs. I decided it was too much work, too time consuming and it really left my legs hurting. I just had my third child, my daughter and she will be 10 months in a week, so this is the first time in a LONG LONG TIME that I have done anything about my legs (they were always super soft, I exfoliated etc, I’m not a monster lol) and so it had 5 years of hair growth to get through and it STILL took way less time than a razor. Miracles ppl… it’s the tiny miracles that make the world go around. Im very impressed. And can’t wait to continue using your product. ",
    imgComment:
      "https://cdn.stamped.io/tr:h-180:/uploads/photos/242718_7105770193071_8c21f014_40c2_46fc_9d44_16abb5cf3468.jpg?",
    age: "35-44",
  },
  {
    nameAuthor: "Estela",
    titleComment: "Skeptic turned believer!!",
    descriptionComment:
      "I was a bit skeptical and thought the ads I was seeing for this was just people paid to hype it up. I am not one of those people. When I tell you this is worth the hype, it’s worth the hype!! To really put this to the rest I let my leg hair grow out until it got delivered. Just received it today and I was so excited, i used straight out of the package! Only regret is not buying this sooner!!! if you’re skeptical just DO IT you won’t be disappointed!! You can clearly see in the photo which half I used it on and if that doesn’t convince you, idk what will!",
    imgComment:
      "https://cdn.stamped.io/tr:h-180:/uploads/photos/242718_7105770193071_1e3ba418_5604_4365_b855_3873fc0ee38e.jpeg?",
    age: "34-40",
  },
  {
    nameAuthor: "Anonymous",
    titleComment: "Good purchase",
    descriptionComment:
      "Very good. I was skeptical at first but it really works great. Be careful not to rub too hard for you might end up with friction burns like I did on my first use. Nothing too serious. The second time around, I did only gentle circular motion for about 10 minutes and it was done.",
    imgComment:
      "https://cdn.stamped.io/tr:h-180:/uploads/photos/242718_7105770193071_aaf15feb_b04b_4ac3_942a_65ff35411db4.jpg?",
    age: "25-34",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const listComment: HTMLDivElement | null =
    document.querySelector(".comment_list");

  const template = `
                `;

  comments.forEach((cm) => {
    const divComment = document.createElement("div");
    divComment.classList.add("comment");
    divComment.innerHTML = `<div class="top_comment">
                  <div class="author-comment">
                    <h1>${cm.nameAuthor}</h1>
                    <span>Verified Buyer</span>
                  </div>
                  <div class="list_rate_report">
                    <div class="list-star">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                    </div>
                  </div>
                </div>
                <div
                  style="padding: 0"
                  class="stamped-review-options"
                  aria-hidden="true"
                >
                  <ul>
                    <li
                      style="width: 35%"
                      data-title="hair-removal-effectiveness"
                    >
                      <strong class="stamped-review-option-title"
                        >Hair removal effectiveness</strong
                      >
                      <span class="stamped-review-option-selected"
                        >Excellent</span
                      >
                      <span
                        class="stamped-review-option-scale"
                        data-value="4.54987212276215"
                        data-value-int="5"
                        ><i></i><i></i><i></i><i></i><i></i
                        ><span style="left: 100%"></span></span
                      ><span class="stamped-review-option-labels"
                        ><span>Poor</span><span>Fair</span><span>Good</span
                        ><span>Very Good</span><span>Excellent</span></span
                      >
                    </li>
                    <li
                      style="width: 35%"
                      data-title="how-would-you-rate-the-effectiveness"
                    >
                      <strong class="stamped-review-option-title"
                        >How would you rate the speed of results?</strong
                      >
                      <span class="stamped-review-option-selected"
                        >Very Good</span
                      >
                      <span
                        class="stamped-review-option-scale"
                        data-value="4.44575471698113"
                        data-value-int="4"
                        ><i></i><i></i><i></i><i></i><i></i
                        ><span style="left: 100%"></span></span
                      ><span class="stamped-review-option-labels"
                        ><span>Poor</span><span>Fair</span><span>Good</span
                        ><span>Very Good</span><span>Excellent</span></span
                      >
                    </li>
                  </ul>
                </div>
                <div class="age-comment">
                  <h1>Age</h1>
                  <span>${cm.age}</span>
                </div>
                <div class="content_comment">
                  <h1 class="title-comment">${cm.titleComment}</h1>
                  <p>
                   ${cm.descriptionComment}
                  </p>
                  <div>
                    <img
                      loading="lazy"
                      src="${cm.imgComment}"
                      alt=""
                    />
                  </div>
              </div>`;

    listComment?.appendChild(divComment);
  });
});
