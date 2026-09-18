import { profile } from "@/content/profile";
import { asset } from "@/content/site";

/**
 * The hero medallion.
 *
 * With both an avatar and a portrait set, the illustration sits at rest
 * and flips on hover to reveal the photograph. With only one image it
 * renders as a plain circle, and with neither it falls back to initials.
 *
 * The structure is load-bearing, not incidental:
 *
 *   .scene   holds `perspective`
 *   .card    holds `transform-style: preserve-3d` and must stay free of
 *            every "grouping property" (overflow, clip-path, opacity<1,
 *            filter, mask, isolation, contain: paint). Any one of those,
 *            on this element or any ancestor below the perspective,
 *            forces `preserve-3d` to compute to `flat` and the flip
 *            silently becomes a 2D slide.
 *   .face    carries the circle. Faces are leaves of the 3D context, so
 *            clipping them costs nothing.
 *
 * That is why the circle moved off the container and onto the faces.
 */
export function Medallion() {
  const { avatar, portrait, initials, name } = profile;
  const canFlip = Boolean(avatar && portrait);

  if (!avatar && !portrait) {
    return (
      <div className="medallion">
        <span className="medallion__initials" aria-hidden="true">
          {initials.toUpperCase()}
        </span>
      </div>
    );
  }

  if (!canFlip) {
    const only = (avatar ?? portrait) as string;
    return (
      <div className="medallion">
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
        <img
          className="medallion__img"
          src={asset(only)}
          alt={`Portrait of ${name}`}
          width={760}
          height={760}
          fetchPriority="high"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div className="medallion medallion--flip">
      <div className="medallion__card">
        <div className="medallion__face medallion__face--front">
          {/*
            Both faces are decorative: the same person, twice, beside a
            heading that already names him. Empty alt keeps a screen
            reader from announcing the portrait twice, which is what
            happens otherwise — backface-visibility is purely visual and
            does not remove the back face from the accessibility tree.
          */}
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
          <img
            className="medallion__img"
            src={asset(avatar as string)}
            alt=""
            width={760}
            height={760}
            fetchPriority="high"
            decoding="async"
          />
        </div>

        <div className="medallion__face medallion__face--back">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, no optimizer */}
          <img
            className="medallion__img"
            src={asset(portrait as string)}
            alt=""
            width={760}
            height={760}
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
