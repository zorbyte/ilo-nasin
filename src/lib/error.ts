// this is my ghetto solution to not having stuff like sentry. - jan Oka
// YES! It's untested! Awesome feature, I know! That's how I expect all my
// code to be given to me too! Anyway I wrote this while sick with COVID.
// Have fun with the jaki. - also jan Oka

import { constants, WriteStream } from "node:fs";
import { FileHandle, open } from "node:fs/promises";
import { join } from "node:path";
import { format } from "node:util";

let handle: FileHandle;
let stream: WriteStream;
export async function initErrorLog() {
  handle = await open(
    join(process.cwd(), "logs", `ilo_nasin_${new Date().toISOString()}.log`),
    "r+",
    constants.O_CREAT | constants.O_APPEND
  );

  stream = handle.createWriteStream();

  createRotator();
}

function createRotator() {
  const midnightTonight = new Date();
  midnightTonight.setHours(24, 0, 0, 0);

  const rotationTimestamp = midnightTonight.valueOf() - Date.now();

  setTimeout(() => {
    stream.end();
    handle
      .close()
      .then(() => initErrorLog())
      .catch(err => {
        console.error(
          "failed to recreate the error stream, killing process",
          err
        );
        process.exit(1);
      });
  }, rotationTimestamp);
}

// lots of stuff in js throws "anys" for errors, so we should avoid
// type errors by permitting that here.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function logError(reason: string, error?: any) {
  console.error(reason, error);

  let backOffTime = 0;
  if (stream.destroyed) backOffTime = 300;
  setTimeout(() => {
    if (stream.destroyed) {
      console.error("fatal error writing to error log, killing process");
      process.exit(1);
    }

    stream.write(format(new Date(), reason, error));
  }, backOffTime);
}
