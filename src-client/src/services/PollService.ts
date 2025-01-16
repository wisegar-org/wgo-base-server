import { IPoll } from "../models/Poll";

export class PollService {
  public getPollConfig(): Promise<IPoll> {
    return new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && !!fetch) {
        void fetch(`${location.origin}/data/poll.json`)
          .then((response) => response.json())
          .then((data: unknown) => {
            if (!data) reject();
            resolve(data as IPoll);
          });
      } else {
        const pathPoll = "./www/data/poll.json";
        const fs = require("fs-extra");
        const store = fs.readJsonSync(pathPoll, { throws: false }) || {};
        resolve(store as IPoll);
      }
    });
  }
}
