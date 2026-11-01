// INGENIUM  |  Copyright (c) 2026 Yannie D. Forest. All rights reserved.
// NO LICENCE IS GRANTED. See LICENCE.txt.
// Tests only (not shipped): the streams lose their async iterator after the parse worker has started, which is what WebKit did to
// the parse worker before it learned to put the iterator back (every PDF failed).
import '../parse.worker.js';
import './strip_streams.js';
