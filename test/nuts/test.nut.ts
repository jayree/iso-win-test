import { TestSession } from "@salesforce/cli-plugins-testkit";
import { expect } from "chai";
import fs from "fs";
import git from "isomorphic-git";

describe("result testing with NUTS", () => {
  let session: TestSession;

  before(async () => {
    session = await TestSession.create({
      project: {
        gitClone: "https://github.com/jayree/nuts-test-repo",
      },
      devhubAuthStrategy: "NONE",
    });
  });

  after(async () => {
    await session?.clean();
  });

  it("should return [1,1,1]", async () => {
    const [status] = await git.statusMatrix({
      fs,
      dir: session.project.dir,
      filter: (f) =>
        f ===
        "force-app/main/default/autoResponseRules/Lead.autoResponseRules-meta.xml",
    });
    expect(status.slice(1)).to.be.deep.equal([1, 1, 1]);
  });
});
