import { __TEST__, ListData } from "./index";
const { randomize, reorder } = __TEST__;
import { nanoid } from "nanoid";

const names = [
  "桜田 光",
  "望月 千佳子",
  "浅野 一哉",
  "田所 扶樹",
  "神崎 小雁",
  "石垣 なつみ",
  "板垣 光良",
  "海老原 奈月",
  "長瀬 ひろみ",
  "榎本 未來",
];

describe("", () => {
  let data: ListData[];
  beforeEach(() => {
    data = names.map((name) => ({ name, isLocked: false, id: nanoid() }));
    data[2].isLocked = true;
    data[5].isLocked = true;
  });
  describe("randomize", () => {
    it("should randomize the data", () => {
      const result1 = randomize(data);
      const result2 = randomize(data);
      const result3 = randomize(data);

      const condA = result1[0].name !== result2[0].name;
      const condB = result1[0].name !== result3[0].name;
      const condC = result2[0].name !== result3[0].name;
      expect(condA || condB || condC).toBe(true);
    });
    it("should fix the locked data", () => {
      const result = randomize(data);
      expect(result[2].name).toBe("浅野 一哉");
      expect(result[5].name).toBe("石垣 なつみ");
    });
    it("should have the same length of the data", () => {
      const result = randomize(data);
      expect(result.length).toBe(data.length);
    });
  });
  describe("reorder", () => {
    it("should work", () => {
      const result = reorder(data, 1, 7);
      expect(result.length).toBe(data.length);
      expect(result[0].name).toBe("桜田 光");
      expect(result[1].name).toBe("田所 扶樹");
      expect(result[2].name).toBe("浅野 一哉");
      expect(result[5].name).toBe("石垣 なつみ");
      expect(result[7].name).toBe("望月 千佳子");
    });
  });
});
