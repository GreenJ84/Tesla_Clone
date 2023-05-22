/** @format */

import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { CheckIcon, ClockIcon } from "@heroicons/react/24/solid";

import CarStat from "./CarStat";
import { DownArrow } from "../HomePage/DisplayComponents";

import {
  DetailContainer,
  socialIconStyle,
} from "../../app/Utils/StyledComponents/DetailComponents";

import { addToCart } from "../../app/Store/Car/carSlice";
import { carsData } from "../../teslaCarInfo";

const Detail = () => {
  const { id } = useParams();
  const [product] = carsData.filter((car) => car.id === parseInt(id ?? ""));
  const dispatch = useDispatch();

  const shareUrl =
    "https://twitter.com/intent/tweet?text=" +
    encodeURI(
      "I just got caught clicking around on this developer's Tesla clone application. You should go check it out: https://tesla-gclone.vercel.app/"
    );

  return (
    <main>
      {/* Product image */}
      <DetailContainer
        bgImage={product.backgroundImg2}
        className={"relative flex flex-col items-center"}
        role="banner"
        aria-label="Product introduction image and features"
      >
        <div className="flex flex-col items-center absolute top-52 lg:top-64 2xl:top-72">
          <h1
            className={
              product.title !== "Model 3"
                ? "text-6xl xl:text-7xl font-semibold tracking-wider text-gray-900 mb-.5"
                : "text-6xl xl:text-7xl font-semibold tracking-wider text-white mb-.5"
            }
          >
            {product.title}
          </h1>
          <a
            arial-label="Offsite Car ride scheduling link"
            href="https://www.tesla.com/drive"
            target="_blank"
            className="text-center text-xl text-white border-b hover:border-b-2 tracking-widest"
            rel="noreferrer"
          >
            Schedule a Demo Drive
          </a>
        </div>
        <DownArrow
          role="button"
          onClick={() =>
            window.scrollTo({
              behavior: "smooth",
              top: window.innerHeight * 0.3,
            })
          }
          className="absolute cursor bottom-80 mx-auto"
          src="/images/down-arrow.svg"
          alt="Car details scroll down arrow"
          aria-label="Car details scroll down arrow"
        />
        <div
          aria-label={`${product.title} Car Features`}
          role="list"
          className="absolute bottom-[210px] flex text-5xl gap-x-28"
        >
          {product.title === "Model Y" && (
            <CarStat
              aria-posinset="1"
              aria-setsize="3"
              value={`${product.stats.capacity} cu ft`}
              description="Cargo Space"
            />
          )}
          <CarStat
            aria-posinset={product.title === "Model Y" ? "2" : "1"}
            aria-setsize="3"
            value={`${product.stats.range} mi`}
            description="Range (EPA est.)"
          />
          {product.title !== "Model Y" && (
            <CarStat
              aria-posinset="2"
              aria-setsize="3"
              value={`${product.stats.acceleration} s`}
              description="0-60 mph"
            />
          )}
          {product.title !== "Model Y" && product.title !== "Model 3" ? (
            <CarStat
              aria-posinset="3"
              aria-setsize="3"
              value={`${product.stats.topSpeed} mph`}
              description="Top Speed"
            />
          ) : (
            <CarStat
              aria-posinset="3"
              aria-setsize="3"
              value={`${product.stats.drive}`}
              description="Dual Motor"
            />
          )}
        </div>
        <a
          href={`https://www.tesla.com/${product.title
            .toLowerCase()
            .replace(" ", "")}/design#overview`}
          role="button"
          aria-label="Offsite link to car design overview"
          className="absolute bottom-28 py-1.5 px-40 text-2xl transition-colors ease-in-out duration-300 text-white border-white border-4 rounded-lg hover:bg-white hover:text-black"
        >
          Order Now
        </a>
      </DetailContainer>

      {/* Product details */}
      <section className="relative flex flex-col w-3/4 md:w-5/6 2xl:w-2/3 mx-auto pt-10">
        <h2 className="text-3xl mx-auto mb-28 tracking-widest">
          Est. delivery: Mar-Apr 2023
        </h2>

        <p
          className={
            "text-2xl md:text-3xl xl:text-4xl text-slate-600 leading-relaxed  md:leading-relaxed xl:leading-relaxed 2xl:leading-loose mb-40"
          }
        >
          {product.description}
        </p>

        <div className="flex justify-between pb-24 mb-24 border-b-2">
          <div>
            <p className="text-4xl">
              Price:{" "}
              <strong className="hover:drop-shadow-xl">
                ${new Intl.NumberFormat("en-US").format(product.price)}
              </strong>
            </p>
            <p>
              {product.inStock ? (
                <CheckIcon
                  aria-hidden="true"
                  className="inline flex-shrink-0 h-6 w-6"
                />
              ) : (
                <ClockIcon
                  aria-hidden="true"
                  className="inline flex-shrink-0 h-6 w-6"
                />
              )}
              <em className="relative top-1 left-1 text-xl">
                {product.inStock ? "In Stock!" : "Out Of Stock!"}
              </em>
            </p>
          </div>
          <button
            className="h-14 px-8 border-4 border-black text-lg hover:bg-black hover:text-white hover:shadow-2xl"
            disabled={!product.inStock}
            onClick={() => {
              dispatch(addToCart(product.id));
            }}
            type="button"
          >
            Add to cart
          </button>
        </div>
      </section>

      <section
        aira-label={`${product.title} Car Highlights`}
        className="relative flex flex-col w-3/4 md:w-5/6 2xl:w-2/3 mx-auto mt-10 pb-24 mb-16 border-b-2"
      >
        <h3 className="text-3xl xl:text-5xl font-semibold xl:mb-16">
          Highlights
        </h3>
        <ul className="relative grid grid-cols-2 gap-y-6 gap-x-12 xl:gap-x-32 left-12 mt-2">
          {product.highlights.map((highlight, idx) => (
            <li
              aria-posinset={idx}
              aria-setsize={product.highlights.length}
              key={highlight}
              className="text-xl xl:text-3xl tracking-wider xl:tracking-widest mt-6 xl:mt-10 list-disc "
            >
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section className="relative flex flex-col w-3/4 md:w-5/6 2xl:w-2/3 mx-auto pt-10">
        <h3 className="text-2xl xl:text-4xl tracking-widest">
          Share the {product.title}
        </h3>
        <ul
          aria-label="Car Detailas socail sharing links"
          className="flex gap-20 xl:gap-24 mt-8 xl:mt-16 mb-24"
        >
          <li>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
            >
              <img
                className={socialIconStyle}
                src="/images/facebookIcon.svg"
                alt="Facebook Icon"
              />
            </a>
          </li>
          <li>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Instagram"
            >
              <img
                className={socialIconStyle}
                src="/images/instagramIcon.svg"
                alt="Instagram Icon"
              />
            </a>
          </li>
          <li>
            <a
              href={shareUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Twitter"
            >
              <img
                className={socialIconStyle}
                src="/images/twitterIcon.svg"
                alt="Twitter Icon"
              />
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
};

export default Detail;
