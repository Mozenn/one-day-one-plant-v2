import { test, expect } from "@playwright/test";
import path from "path";

test.use({
  storageState: path.resolve(__dirname, "..", "tests/.auth/state.json"),
});

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/One Day One Plant/);
});

test("collect", async ({ page }) => {
  await page.goto("/collect");

  await expect(page.getByText("Collect your daily plant")).toBeVisible();
});

test("login", async ({ page }) => {
  await page.goto("/auth/login");

  page.on("load", async (data) => {
    console.log("Loaded");
    // (await page.context().storageState()).origins;
    // const storage = await page.context().storageState();
    // storage.origins[0].localStorage.push({
    //   name: "authId",
    //   value: "1",
    // });

    //await page.context().storageState({ path: "./tests/.auth/state.json" });
    const storage = await page.context().storageState();
    console.log("Loaded storage");
    storage.origins[0].localStorage.forEach((e) =>
      console.log("loaded", e.name, e.value),
    );
  });

  await expect(page.getByText("Log In to One Day One Plant")).toBeVisible();

  await page.getByTestId("emailOrUsername").fill("user1");

  await page.getByTestId("password").fill("Password1*");

  await page.getByRole("button", { name: "Log In" }).click();

  const storage = await page.context().storageState();
  console.log("commun storage");
  storage.origins[0].localStorage.forEach((e) =>
    console.log("commun", e.name, e.value),
  );

  await page.waitForTimeout(2000);

  //await page.getByRole("button", { name: "Test Auth" }).click();

  await expect(page.getByText("Welcome Back!")).toBeVisible();
});
