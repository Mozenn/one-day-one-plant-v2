import { test as setup, expect } from "@playwright/test";
import path from "path";

const authFile = path.resolve(__dirname, "..", "tests/.auth/state.json");

setup("authenticate", async ({ page, browser }) => {
  await page.goto("/auth/login");
  await expect(page.getByText("Log In to One Day One Plant")).toBeVisible();
  await page.getByTestId("emailOrUsername").fill("user1");
  await page.getByTestId("password").fill("Password1*");
  await page.getByRole("button", { name: "Log In" }).click();

  await expect(page.getByTestId("logo")).toBeVisible();

  const cookies = await page.context().cookies();
  console.log("cookies", cookies);
  cookies.forEach((c) => console.log("cookie", c.name, c.value));

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
