import { render } from "@testing-library/react";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { beforeAll, describe, test } from "vitest";
import { registerGlobals } from "../register-globals";
import { registerMatchers } from "../register-matchers";

beforeAll(() => {
  registerGlobals();
  registerMatchers();
});

describe("grid view", () => {
  test("should grid", async () => {
    const TextFixture = observer(() => {
      const data = observable({});
      console.log(data);
      return <div />;
    });
    const screen = render(<TextFixture />);
    screen.debug();
  });
});
