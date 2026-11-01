// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
// Tests only (not shipped): takes Chromium's async iterator off ReadableStream, as WebKit's streams are (no "for await" over them).
delete ReadableStream.prototype[Symbol.asyncIterator];
delete ReadableStream.prototype.values;
