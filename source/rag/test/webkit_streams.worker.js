// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
// Tests only (not shipped): the parse worker as it runs in WebKit. The streams lose their async iterator first, then the real
// parse worker starts (it puts the standard one back). Static imports run in this order, so no message is missed.
import './strip_streams.js';
import '../parse.worker.js';
