import "./WhaleLoader.scss";

interface WhaleLoaderProps {
  isLoading: boolean;
  message?: string;
}

const WhaleLoader = ({ isLoading, message }: WhaleLoaderProps) => {
  return (
    <div className="WhaleLoader">
      <div className="WhaleLoader__image__container">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 862.8 862.8">
          <g className="WhaleLoader__image__group">
            <g className="WhaleLoader__image__background">
              <g>
                <path
                  d="M431.4,859.3A428,428,0,0,1,264.8,37.1,428,428,0,0,1,598,825.7,425.2,425.2,0,0,1,431.4,859.3Z"
                  fill="#e5f2f4"
                />
                <path
                  d="M431.4,7C665.8,7,855.8,197,855.8,431.4s-190,424.4-424.4,424.4S7,665.8,7,431.4,197,7,431.4,7m0-7A431.5,431.5,0,0,0,263.5,828.9a431.5,431.5,0,0,0,335.9-795A428.7,428.7,0,0,0,431.4,0h0Z"
                  fill="#1b1184"
                />
              </g>
              <path
                d="M855.2,456.3C843.2,680,658,857.6,431.4,857.6S19.7,680,7.6,456.3H855.2Z"
                fill="#5260aa"
              />
              <path
                d="M7,459.1c30.3,0,30.3-30,60.6-30s30.3,30,60.6,30,30.3-30,60.6-30,30.3,30,60.6,30,30.3-30,60.6-30,30.3,30,60.6,30,30.3-30,60.6-30,30.3,30,60.6,30,30.3-30,60.6-30,30.3,30,60.6,30,30.3-30,60.6-30,30.3,30,60.6,30,30.3-30,60.6-30,30.3,30,60.6,30"
                fill="#5260aa"
                stroke="#1b1184"
                strokeMiterlimit="10"
                strokeWidth="7"
                className={`"WhaleLoader__image__wavy-line" ${
                  isLoading
                    ? "WhaleLoader__animation__shake WhaleLoader__animation__animate-sea"
                    : ""
                }`}
              />
            </g>
            <g
              className={`WhaleLoader__image__whale ${
                isLoading ? "WhaleLoader__animation__shake" : ""
              }`}
            >
              <path
                className="WhaleLoader__image__whale_body"
                d="M708.3,306c0,1.8-.1,3.6-0.1,5.4A45.8,45.8,0,0,1,654,352.5q1.3,5.2,2.3,10.6a183.4,183.4,0,0,1-58.9,171.7,299.3,299.3,0,0,1-29.6,21.3c-33.6,21.2-71.4,39.2-112.7,42.5-17.7,1.4-71.1,0-71.1,0h-5.7c-101.2,0-183.2-82-183.2-183.2s82-183.2,183.2-183.2q8.5,0,16.9.8a183.2,183.2,0,0,1,146.1,98.8l1.4,2.7c7.2,14.6,15.9,48.2,15.9,48.2h0a22.9,22.9,0,0,0,21.2,17.9h1.8a45.8,45.8,0,0,0,45.1-43c0.1-.9,0-5.1,0-6.3a45,45,0,0,1-12.9,1.9,45.8,45.8,0,0,1-45.6-41.2V311c-0.1-1.2-.1-2.3-0.1-3.5,0-8.7.7-18.3,6.7-23.8s13-4.8,20.3-4.8a45.6,45.6,0,0,1,26.5,8.4l1.8,1.3,1.3,1h0a22.9,22.9,0,0,0,27,.3l2.2-1.7,1.2-.9a45.6,45.6,0,0,1,26.4-8.4c7.3,0,15.3.1,20.3,4.8s6.4,14.1,6.7,22.2h0Z"
                fill="#9bb0d4"
                stroke="#1b1184"
                strokeMiterlimit="10"
                strokeWidth="7"
              />
              <path
                d="M653.7,307.1a24.3,24.3,0,0,1-13.3,4.3c-5.1,0-10.5-2.8-13.7-4.5-6.9-3.7-17.3-10.5-29.5-10.8-7-.1-24.3,4.8-25.5,4.4,1.2-5.6,1.5-10.5,5-13.7s8.8-4.3,20.2-4.3,20.4,7.1,28,11.7a25,25,0,0,0,11.6,3.8c4.2,0.2,12.6-1.1,17.2-5.2l2.2-1.7,1.2-.9a42.2,42.2,0,0,1,26.4-7.6C676.1,285.3,661.8,300.7,653.7,307.1Z"
                fill="#c1d6e8"
              />
              <path
                d="M704.9,307.4c1,16.8-17.1,50.1-55.8,40.7q1.3,5.2,2.3,10.6c2.1,11.1,4.1,22.5,4.3,34.2,0.6,60.6-25.7,108.5-60.8,140.1-9.4,7.7-25.9,18.3-36.2,24.8l-25.8-2.6S573,528.6,582,520.5c37.6-33.8,62.1-82.7,62.1-137.4a183.7,183.7,0,0,0-3.2-34.3q-1-5.4-2.3-10.6a45.5,45.5,0,0,0,8.5.8c29.3,0,45.7-11.4,47.6-34.9,0.1-1.8.1-3.6,0.1-5.4h0a47.4,47.4,0,0,0-3.3-15.5c3.5,0.6,5.6,1.3,7.4,3.1C704.9,292.2,704.6,302.5,704.9,307.4Z"
                fill="#7888bf"
              />
              <path
                d="M584.1,415.8c-7.6.2-20,0-26.4-13.2-4.3-8.8-11.8-31.5-17.3-46.1-15.4-41.1-79.3-96.7-143.1-102.5q-8.3-.8-16.9-0.8c-142.9-.1-180.6,142.5-180.2,139.2,9.5-80.7,78.9-156.5,180.1-156.5,5.7,0,11.5.3,17.1,0.8,57.1,5.3,113.8,42.2,142,99.2l1.4,2.7c7.2,14.6,15.5,48.1,15.5,48.1,4.3,12.2,15.3,17.6,25.6,17.5h1.8c16.9-.8,34.9-11.7,41.9-28.1C625.5,388.1,602.9,415.3,584.1,415.8Z"
                fill="#c1d6e8"
              />
              <g className="WhaleLoader__image__Belly">
                <g id="Left_fin">
                  <path
                    id="left_fin-2"
                    data-name="left_fin"
                    d="M299.1,536.5a68.7,68.7,0,0,1,53.2,67.8c-0.1,10.7.1,27.3-7.1,29.7-20.4,6.8-53.6-34.9-53.2-67.8A68.5,68.5,0,0,1,299.1,536.5Z"
                    fill="#9bb0d4"
                    stroke="#1b1184"
                    strokeMiterlimit="10"
                    strokeWidth="7"
                  />
                  <path
                    d="M342.6,631.1c-11.5,1.5-30.2-12.7-41.4-39,6.7,10,28.1,32.5,46.7,30.2C347.7,623.5,347.1,630.9,342.6,631.1Z"
                    fill="#7888bf"
                  />
                </g>
                <path
                  d="M558.1,561c-31.1,18.5-65.6,33.5-102.9,36.4-17.7,1.4-71.1,0-71.1,0h-5.7A183,183,0,0,1,195.2,414.4c0-5.4.2-10.8,0.7-16.1a114.6,114.6,0,0,1,135.3,38.5l1,1.4A298.3,298.3,0,0,0,558.1,561Z"
                  fill="#e5f2f4"
                  stroke="#1b1184"
                  strokeMiterlimit="10"
                  strokeWidth="7"
                />
                <path
                  d="M546.3,563.8l-10.7,5.7c-90-7-158.2-51.1-208-119.9l-1-1.4a114.3,114.3,0,0,0-92.4-46.8c-13.9,0-23.1,1.1-35.4,5.6l0.4-6.3c13.3-5.4,24.4-6.7,39.3-7.3,37.9-.1,69.2,16.9,92,47.9l1,1.4C382.8,512.9,460.7,555.1,546.3,563.8Z"
                  fill="#c1d6e8"
                />
                <path
                  d="M535.5,569.6c-21.6,10.6-44.2,20.7-81.5,23.6-17.7,1.4-74.5,1-76.4,1-21.2,0-42-4.5-61-11.1-71.4-25-115.9-90.3-117.7-166.5-0.1-5.4,0-9.5,0-9.5-0.7,78,52.1,132.3,123.3,157.2a182.8,182.8,0,0,0,60.6,10.3h5.7s53.7,4.1,71.4,2.7c25.4-2,27.1-1.5,51.3-10.5A235.4,235.4,0,0,0,535.5,569.6Z"
                  fill="#c1d6e8"
                />
              </g>
              <g className="WhaleLoader__image__right_fin">
                <path
                  id="right_fin-2"
                  data-name="right_fin"
                  d="M468,529c23.1,32.4,13.7,92.9-10,103.4-14.5,6.4-41.3-12.9-54.7-31.8-23.1-32.4-18.3-76.9,10-103.4"
                  fill="#9bb0d4"
                  stroke="#1b1184"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="7"
                />
                <path
                  d="M452.9,630.1c-14.7,1-32.4-11.4-45.9-30.2-16.7-23.4-20.2-49.4-7.9-77.1a77.9,77.9,0,0,0,17.4,66.8c15.1,17.5,31.9,25.6,53,25.6C469.5,615.2,462.5,629.4,452.9,630.1Z"
                  fill="#7888bf"
                />
              </g>
              <g className="WhaleLoader__image__Face">
                <circle cx="376.6" cy="407.8" r="28.5" fill="#e094b8" />
                <path
                  id="eye_closed"
                  d="M315.5,363.7a27.7,27.7,0,0,1,50.7,22.6"
                  fill="none"
                  stroke="#1f107f"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="7"
                />
                <g
                  id="eye_open"
                  className={
                    isLoading
                      ? "WhaleLoader__animation__close-eye"
                      : "WhaleLoader__animation__open-eye"
                  }
                >
                  <circle
                    id="eye_open-2"
                    data-name="eye_open"
                    cx="349.7"
                    cy="377.7"
                    r="22.3"
                    fill="#1b1184"
                  />
                  <circle cx="354.2" cy="387.7" r="10.1" fill="#c1d6e8" />
                </g>
              </g>
              <g>
                <ellipse
                  cx="474.7"
                  cy="328.6"
                  rx="17.3"
                  ry="26.9"
                  transform="translate(-37 596) rotate(-62.3)"
                  fill="#c1d6e8"
                />
                <ellipse
                  cx="519.7"
                  cy="332.3"
                  rx="9.7"
                  ry="12.6"
                  transform="translate(63.4 747.5) rotate(-74.9)"
                  fill="#c1d6e8"
                />
                <ellipse
                  cx="498.6"
                  cy="306.5"
                  rx="7.6"
                  ry="9.6"
                  transform="translate(72.8 707.9) rotate(-74.9)"
                  fill="#c1d6e8"
                />
              </g>
              <g>
                <path
                  d="M395.6,267.2c-1.4,6.1-7.7,10.7-15.1,10.7s-13.1-4.2-14.9-9.8"
                  fill="#9bb0d4"
                />
                <path
                  d="M393.1,264.2c-1.2,3.6-6.4,6.2-12.6,6.2s-10.9-2.4-12.4-5.7"
                  fill="none"
                  stroke="#1b1184"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="7"
                />
              </g>
            </g>
            <g className="WhaleLoader__image__Waves">
              <path
                d="M533.3,720.5c-20.5,0-20.5-20-41.1-20s-20.5,20-41,20-20.5-20-41.1-20-20.5,20-41,20"
                fill="none"
                stroke="#1b1184"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="7"
                className={`WhaleLoader__image__wave ${
                  isLoading ? "WhaleLoader__animation__wave-forwards" : ""
                }`}
              />
              <path
                d="M669.1,635.6c-17,0-17-20-33.9-20s-17,20-33.9,20"
                fill="none"
                stroke="#1b1184"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="7"
                className={`WhaleLoader__image__wave ${
                  isLoading ? "WhaleLoader__animation__wave-forwards" : ""
                }`}
              />
              <path
                d="M212,570.8c-17,0-17-20-33.9-20s-17,20-33.9,20"
                fill="none"
                stroke="#1b1184"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="7"
                className={`WhaleLoader__image__wave ${
                  isLoading ? "WhaleLoader__animation__wave-forwards" : ""
                }`}
              />
            </g>
          </g>
        </svg>
      </div>
      <div className="WhaleLoader__message">
        <h3>{message}</h3>
      </div>
    </div>
  );
};
export default WhaleLoader;
