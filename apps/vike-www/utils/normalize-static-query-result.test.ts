import { expect, test } from "vitest";

import {
  deepTraverseAndModify,
  normalizeStaticQueryResult,
} from "./normalize-static-query-result";

test("deepTraverseAndModify", () => {
  const data = {
    publicURL: "david",
    data1: "data1",
    a: {
      data2: "data2",
      b: {
        data3: "data3",
        c: {
          data4: "data4",
          publicURL: "mari",
        },
      },
    },
  };
  const predicate = (_value: any, key: string) => key === "publicURL";
  const modifier = (value: any) => {
    return value + "-modified";
  };

  deepTraverseAndModify(data, predicate, modifier);

  expect(data.publicURL).toEqual("david-modified");
  expect(data.a.b.c.publicURL).toEqual("mari-modified");
  expect(data.data1).toEqual("data1");
  expect(data.a.data2).toEqual("data2");
  expect(data.a.b.data3).toEqual("data3");
  expect(data.a.b.c.data4).toEqual("data4");
});

test("normalizeStaticQueryResult", () => {
  const data = {
    file: {
      internal: { content: "twitterData" },
      filename_disk: "file.png",
    },
    allFile: {
      brandedImages: [{ publicURL: "publicURL1" }, { publicURL: "publicURL2" }],
    },
    directus: {
      page_wall_of_love: {
        hero_image: {
          filename_disk: "hero_image.png",
        },
        footer_image: {
          filename_disk: "footer_image.png",
        },
        app_reviews: "app_reviews",
      },
      branded_media: {
        type: "type",
        image: {
          filename_disk: "branded_media.png",
        },
        lottie_animation: "lottie_animation",
      },
    },
  };

  const baseURL = "https://www.example.com";

  const result = normalizeStaticQueryResult(baseURL, data);

  expect(result.file.internal.content).toEqual("twitterData");
  expect(result.file?.file?.publicURL).toBeUndefined();
  expect(result.allFile.brandedImages[0].publicURL).toEqual("publicURL1");
  expect(result.allFile.brandedImages[1].publicURL).toEqual("publicURL2");
  expect(result.directus.page_wall_of_love.hero_image.file.publicURL).toEqual(
    "https://www.example.com/hero_image.png"
  );
  expect(result.directus.page_wall_of_love.footer_image.file.publicURL).toEqual(
    "https://www.example.com/footer_image.png"
  );
  expect(result.directus.page_wall_of_love.app_reviews).toEqual("app_reviews");
  expect(result.directus.branded_media.type).toEqual("type");
  expect(result.directus.branded_media.image.file.publicURL).toEqual(
    "https://www.example.com/branded_media.png"
  );
  expect(result.directus.branded_media.lottie_animation).toEqual(
    "lottie_animation"
  );
});

export default {};
